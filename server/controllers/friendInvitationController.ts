import Invitation from "../models/invitation";
import User from "../models/user";
import { updatePendingInvitations } from "../socket-handlers/updates";
import { TypedRequest, TypedResponse } from "../type";
import type { User as UserType } from "../models/types";

export const friendInvitationController = async (
  req: TypedRequest,
  res: TypedResponse
) => {
  const { email: targetEmail } = req.body;
  const { userId, email } = req.user;
  console.log({ targetEmail });

  // check if the user is not us
  if (email.toLowerCase() === targetEmail.toLowerCase()) {
    return res.status(409).send("Cannot invite yourself");
  }

  const targetUser = await User.findOne({ email: targetEmail });
  if (!targetUser) {
    return res.status(404).send("Not found user");
  }

  // check if invitation is already send
  const isOldInvitation = await Invitation.findOne({
    receiverId: targetUser.id,
    senderId: userId,
  });

  if (isOldInvitation) {
    // 409 is conflict
    return res.status(409).send("Invitation is already sent");
  }

  // check if already friends
  const alreadyFriends = targetUser.friends.find(
    (friendId) => friendId.toString() === userId
  );

  if (alreadyFriends) {
    return res.status(409).send("Already a friend, can't send invite again");
  }

  // const newInvite = await Invitation.create({
  //   receiverId: targetUser._id,
  //   senderId: userId,
  // });

  // send socket update for pending invitation
  updatePendingInvitations(targetUser._id.toString());

  return res.status(200).send("Invitation is send");
};

export const acceptFriendInvitation = async (
  req: TypedRequest,
  res: TypedResponse
) => {
  const { id: invitationId } = req.body;
  // const { userId } = req.user;

  try {
    const invitation = await Invitation.findById(invitationId);
    if (!invitation) {
      return res.status(404).send("Error occured, try later");
    }
    const { senderId, receiverId } = invitation;

    // add freinds
    const reciverUser: UserType | null = await User.findById(receiverId);
    reciverUser!.friends = [...reciverUser!.friends, senderId];
    await reciverUser!.save();

    const senderUser: UserType | null = await User.findById(senderId);
    senderUser!.friends = [...senderUser!.friends, receiverId];
    await senderUser!.save();

    // delete invitation
    await Invitation.findByIdAndDelete(invitationId);

    // update firends if online

    // update list of pending invitation for user who performed action
    updatePendingInvitations(receiverId.toString());

    return res.status(200).send("Accepted invitation");
  } catch (e) {
    return res.send(500).send("Cannot perform operation");
  }
};

export const rejectFriendInvitation = async (
  req: TypedRequest,
  res: TypedResponse
) => {
  const { id: invitationId } = req.body;
  const { userId } = req.user;

  try {
    // remove invitaion
    const invitationExist = await Invitation.exists({ _id: invitationId });
    if (invitationExist) {
      await Invitation.findByIdAndDelete(invitationId);

      // update pending invitations
      updatePendingInvitations(userId);

      return res.status(200).send("Invitation rejected");
    }
    return res.status(404).send("Invitation not present");
  } catch (e) {
    return res.send(500).send("Cannot perform operation");
  }
};
