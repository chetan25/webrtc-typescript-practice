import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction } from "express";
import { TypedRequest, TypedResponse } from "../type";

const SECRET = process.env.SECRET!;

const CheckAuth = (
  req: TypedRequest,
  res: TypedResponse,
  next: NextFunction
): TypedResponse | void => {
  let token = req.body.token || req.query.token || req.headers["authorization"];
  // let tok = req.headers["authorization"];

  if (!token) {
    return res.status(403).send("A token is required");
  }

  try {
    token = token.replace(/^Bearer\s+/, "");
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded as JwtPayload;

    next();
  } catch (e) {
    return res.status(401).send("A token passes is invalid");
  }
};

export default CheckAuth;
