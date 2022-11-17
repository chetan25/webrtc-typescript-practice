import User from "../models/user";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";

const SECRET = process.env.SECRET!;

console.log({ SECRET });
export const registerHandler = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await User.exists({
      email: email.toLowerCase(),
    });
    if (userExists) {
      return res.status(409).send("Email already exist");
    }

    // hash password
    const encrtyptedPass = await bycrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email: email.toLowerCase(),
      password: encrtyptedPass,
    });

    console.log(newUser);
    // create a new jwtToken
    const token = jwt.sign(
      {
        userId: newUser.id,
        email,
      },
      SECRET,
      {
        expiresIn: "24h",
      }
    );
    return res.status(200).json({
      message: "Successfully Created user",
      user: {
        id: newUser.id,
        email,
        username,
        token: token,
      },
    });
  } catch (e) {
    return res.status(500).send("Error registering new user");
  }
};

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (user && (await bycrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          userId: user.id,
          email,
        },
        SECRET,
        {
          expiresIn: "24h",
        }
      );
      return res.status(200).json({
        message: "logged in",
        user: {
          token,
          email,
          username: user.username,
          id: user.id,
        },
      });
    }
    return res.status(400).send("Wrong Credentials");
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error logging in");
  }
};
