import { RequestHandler, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UUID } from "crypto";
import { getSecretKey } from "../../environment";

export interface UserJWT extends JwtPayload {
  id: UUID;
  type: string;
  username: string;
  realName: string;
}

export interface CustomRequest extends Request {
  userData: UserJWT;
}

export const sessionMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next,
) => {
  const token = req.headers["authorization"];

  if (token === undefined) {
    res.status(403).end();
    return;
  }

  const secretKey = getSecretKey();

  jwt.verify(token, secretKey, (err, userData) => {
    if (err) {
      res.status(403).end();
      return;
    }
    (req as CustomRequest).userData = userData! as UserJWT;
    next();
  });
};

export const ContentTypeMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next,
) => {
  if (req.headers["content-type"] !== "application/json") {
    return res
      .status(415)
      .send({ error: "expected the content type to be application/json" });
  }
  next();
};
