const User = require("../models/user");
const Invitation = require("../models/invitation");
const serverStore = require("../store");
const Conversation = require("../models/conversation");

const updatePendingInvitations = async (userId) => {
  // find if user is online
  try {
    const pendingInvitations = await Invitation.find({
      receiverId: userId,
    }).populate("senderId", "_id username email");

    const id = pendingInvitations[0]?.senderId || "test";

    console.log({ id });
    // find active connections
    const receiverList = serverStore.getOnlineUsers(userId);
    console.log({ receiverList });
    // io instance
    const io = serverStore.getSocketServerInstance();

    // emit updates
    receiverList.forEach((socketId) => {
      io.to(socketId).emit("invitations", {
        pendingInvitations: pendingInvitations ?? [],
      });
    });
  } catch (e) {
    console.error(e);
  }
};

const updateFriends = async (userId) => {
  try {
    const user = await User.findById(userId, { _id: 1, friends: 1 }).populate(
      "friends",
      "_id username email"
    );

    // find all active connection for user
    // find active connections
    const receiverList = serverStore.getOnlineUsers(userId);

    if (user && receiverList.length > 0) {
      const friends = user.friends.map((friend) => {
        return {
          email: friend.email,
          id: friend._id,
          username: friend.username,
        };
      });

      console.log({ friends });
      // io instance
      const io = serverStore.getSocketServerInstance();

      // emit updates
      receiverList.forEach((socketId) => {
        io.to(socketId).emit("friends-list", {
          friends: friends ?? [],
        });
      });
    }
  } catch (e) {
    console.log(e, "Error updating friends");
  }
};

const updateChatHistory = async (
  conversationId,
  toSpecifiedSocketId = null
) => {
  const conversation = await Conversation.findById(conversationId).populate({
    path: "messages",
    model: "Message",
    populate: {
      path: "author",
      model: "user",
      select: "username _id",
    },
  });

  console.log({ conversation });
  if (conversation) {
    const io = serverStore.getSocketServerInstance();

    if (toSpecifiedSocketId) {
      // initial update of chat history
      return io.to(toSpecifiedSocketId).emit("direct-chat-history", {
        messages: conversation.messages,
        participants: conversation.participants,
      });
    }

    // check if users of this conversation are online
    // if yes emit to them update of messages

    conversation.participants.forEach((userId) => {
      const activeConnections = serverStore.getOnlineUsers(userId.toString());

      activeConnections.forEach((socketId) => {
        io.to(socketId).emit("direct-chat-history", {
          messages: conversation.messages,
          participants: conversation.participants,
        });
      });
    });
  }
};

const updateRooms = (toSpecificTargerId = null) => {
  // io instance
  const io = serverStore.getSocketServerInstance();
  const activeRooms = serverStore.getActiveRooms();

  if (toSpecificTargerId) {
    io.to(toSpecificTargerId).emit("active-rooms", { activeRooms });
  } else {
    io.emit("active-rooms", { activeRooms });
  }
};

module.exports = {
  updatePendingInvitations,
  updateFriends,
  updateChatHistory,
  updateRooms,
};
