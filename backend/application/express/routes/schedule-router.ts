import express, { Request, Response } from "express";

export const router = express.Router();

router.get("/:scheduleId", (req: Request, res: Response) => {
  res.send("should return a schedule");
});

router.patch("/:scheduleId", (req: Request, res: Response) => {
  res.send("should update a schedule");
});

router.patch("/mark_as_complete/:serviceId", (req: Request, res: Response) => {
  res.send("should mark a schedule as complete");
});

router.post("/create/:serviceId", (req: Request, res: Response) => {
  res.send("should create a schedule for a service");
});
