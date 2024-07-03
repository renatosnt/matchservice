import express, { Request, Response } from "express";
import { UserAdapter } from "../../../adapters/user-adapter";
import { UserDatabase } from "../../../intrastructure/user-database";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  CustomRequest,
  ContentTypeMiddleware,
  sessionMiddleware,
} from "../middlewares";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
if (SECRET_KEY === undefined)
  throw new Error("SECRET_KEY environment variable is not set.");

interface UserLoginData {
  email: string;
  password: string;
}

export const router = express.Router();
const userAdapter = new UserAdapter(new UserDatabase());

/**
 * @openapi
 * /login:
 *   post:
 *     tags:
 *       - session
 *     summary: Logs in the user.
 *     requestBody:
 *       description: The user credentials.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: A new session has been created.
 *         headers:
 *           x-access-token:
 *             description: The user session token
 *             schema:
 *               type: string
 */
router.post("/", ContentTypeMiddleware, async (req: Request, res: Response) => {
  const body: UserLoginData = req.body;

  try {
    const databaseUser = await userAdapter.getByEmail(body.email);

    if (body.password !== databaseUser.password) {
      res.status(401).json({ message: `Wrong username or password.` });
      return;
    }

    const userData = {
      id: databaseUser.id,
      type: databaseUser.type,
      username: databaseUser.username,
      realName: databaseUser.realName,
    };

    const token = jwt.sign(userData, SECRET_KEY, {
      expiresIn: "7d",
    });
    res.set("x-access-token", token);
    res.status(201).json({ message: "Logged in successfully." });
    res.end();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/test", sessionMiddleware, async (req: Request, res: Response) => {
  const userData = (req as CustomRequest).userData;
  res.status(200).json(userData);
});
