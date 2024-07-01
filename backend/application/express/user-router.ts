import express from "express";

export const router = express.Router();

router.get("/:userId", (req, res) => {
  res.send("should return a user");
});

router.post("/register", (req, res) => {
  res.send("should register a new user");
});

router.post("/schedule_service/:serviceId", (req, res) => {
  res.send("should assign a schedule for the user and add");
});

router.patch("/:userId", (req, res) => {
  res.send("should update the details of a user");
});
