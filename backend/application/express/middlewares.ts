import { RequestHandler, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
if (SECRET_KEY === undefined)
  throw new Error("SECRET_KEY environment variable is not set.");

export interface CustomRequest extends Request {
  userData: string | JwtPayload;
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

  const secretKey = SECRET_KEY;

  jwt.verify(token, secretKey, (err, userData) => {
    if (err) {
      res.status(403).end();
      return;
    }
    (req as CustomRequest).userData = userData!;
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
