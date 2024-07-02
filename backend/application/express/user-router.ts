import express from "express";
import { UserAdapter } from "../../adapters/user-adapter";
import { UserDatabase } from "../../intrastructure/user-database";
import { randomUUID, UUID } from "crypto";
import { User } from "../../domain/entities/user.entity";

export const router = express.Router();

const userAdapter = new UserAdapter(new UserDatabase());

router.get("/:userId", async (req, res) => {
  const result = await userAdapter.getById(req.params.userId as UUID);
  res.send(result);
});

router.post("/register", async (req, res) => {
  const newUser = new User(randomUUID(), "nekoraw3", "Michel", "a@a.com", "aaa", 'Customer', [])
  const result = await userAdapter.save(newUser);
  res.send(result);
});

router.post("/schedule_service/:serviceId", (req, res) => {
  res.send("should assign a schedule for the user and add");
});

router.patch("/:userId", (req, res) => {
  res.send("should update the details of a user");
});
