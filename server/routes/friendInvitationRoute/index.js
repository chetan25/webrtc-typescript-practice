import express, { Router } from "express";
import Joi from "joi";
import {
  // Creates a validator that generates middlewares
  createValidator,
} from "express-joi-validation";
import auth from "../../middleware/auth";
import {
  friendInvitationController,
  acceptFriendInvitation,
  rejectFriendInvitation,
} from "../../controllers/friendInvitationController";

const validator = createValidator();

const postFriendInvitationSchema = Joi.object({
  email: Joi.string().email(),
});

const invitationtSchema = Joi.object({
  id: Joi.string().required(),
});

const router = Router();

router.post(
  "/invite",
  auth,
  validator.body(postFriendInvitationSchema),
  friendInvitationController
);

router.post(
  "/accept",
  auth,
  validator.body(invitationtSchema),
  acceptFriendInvitation
);

router.post(
  "/reject",
  auth,
  validator.body(invitationtSchema),
  rejectFriendInvitation
);

export default router;
