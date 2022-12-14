import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().min(3).max(11).required(),
  password: Joi.string().min(6).max(12).required(),
  email: Joi.string().email().required(),
});

export const loginSchema = Joi.object({
  password: Joi.string().min(6).max(12).required(),
  email: Joi.string().email().required(),
});
