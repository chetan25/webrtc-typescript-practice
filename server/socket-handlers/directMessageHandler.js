const Message = require("../models/message");
const Conversation = require("../models/conversation");
const { updateChatHistory } = require("./updates");
const serverStore = require("../store");

const directMessageHandler = async (socket, data) => {
  try {
    console.log("direct message event is being handled");

    const { userId } = socket.user;
    const { receiverUserId, content } = data;

    // create new message
    const message = await Message.create({
      content: content,
      author: userId,
      date: new Date(),
      type: "DIRECT",
    });

    // find if conversation exist with this two users - if not create new
    const conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverUserId] },
    });

    if (conversation) {
      conversation.messages.push(message._id);
      await conversation.save();

      // perform and update to sender and receiver if is online
      updateChatHistory(conversation._id.toString());
    } else {
      // create new conversation if not exists
      const newConversation = await Conversation.create({
        messages: [message._id],
        participants: [userId, receiverUserId],
      });

      // perform and update to sender and receiver if is online
      updateChatHistory(newConversation._id.toString());
    }
  } catch (err) {
    console.log(err);
  }
};

const chatHistoryHandler = async (socket, data) => {
  console.log("message history event is being handled");

  const { userId } = socket.user;
  const { connUserId } = data;

  console.log("userId", userId);
  console.log("connUserId", connUserId);

  const conversation = await Conversation.find({
    participants: { $all: [userId, connUserId] },
  }).populate({
    path: "messages",
    model: "Message",
    populate: {
      path: "author",
      model: "user",
      select: "username _id",
    },
  });

  let messages = [];
  if (conversation) {
    console.log({ conversation });
    messages = conversation[0].messages;
    console.log("messgaes are", messages);
  }

  const io = serverStore.getSocketServerInstance();

  if (socket.id) {
    // initial update of chat history
    return io.to(socket.id).emit("direct-chat-history", {
      messages: messages,
      participants: conversation[0].participants,
    });
  }
};

module.exports = { directMessageHandler, chatHistoryHandler };
