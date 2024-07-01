import express from "express";

export const router = express.Router();

router.get("/:scheduleId", (req, res) => {
  res.send("should return a schedule");
});

router.patch("/:scheduleId", (req, res) => {
  res.send("should update a schedule");
});

router.patch("/mark_as_complete/:serviceId", (req, res) => {
  res.send("should mark a schedule as complete");
});

router.post("/create/:serviceId", (req, res) => {
  res.send("should create a schedule for a service");
});
