import express, { Request, Response } from "express";
import { randomUUID, UUID } from "crypto";
import bcrypt from "bcrypt";
import { UserDatabase } from "../../intrastructure/user-database";
import { UserAdapter } from "../../adapters/user-adapter";
import { User } from "../../domain/entities/user.entity";
import { ContentTypeMiddleware, sessionMiddleware } from "./middlewares";

export const router = express.Router();
const userAdapter = new UserAdapter(new UserDatabase());

router.get("/:userId", async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId as UUID;
    const user = await userAdapter.getById(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: `User with ID ${userId} not found` });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.post(
  "/register",
  ContentTypeMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { username, realName, email, password, type } = req.body;

      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const newUser = new User(
        randomUUID(),
        username,
        realName,
        email,
        passwordHash,
        type,
        [],
        null,
      );
      const savedUser = await userAdapter.save(newUser);
      res.status(201).json(savedUser);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
);

router.post("/schedule_service/:serviceId", (req: Request, res: Response) => {
  res.send("should assign a schedule for the user and add");
});

router.patch(
  "/:userId",
  [ContentTypeMiddleware, sessionMiddleware],
  async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId as UUID;
      const user = await userAdapter.getById(userId);
      if (user) {
        const { username, realName, email, passwordHash, type } = req.body;
        if (username) user.username = username;
        if (realName) user.realName = realName;
        if (email) user.email = email;
        if (passwordHash) user.passwordHash = passwordHash;
        if (type) user.type = type;
        const updatedUser = await userAdapter.save(user);
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
);
