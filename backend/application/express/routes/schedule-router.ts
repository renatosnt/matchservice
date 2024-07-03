import express, { Request, Response } from "express";
import { UUID, randomUUID } from "crypto";
import { Scheduling } from "../../../domain/entities/scheduling.entity";
import { SchedulingAdapter } from "../../../adapters/scheduling-adapter"; 
import { SchedulingDatabase } from "../../../intrastructure/scheduling-database"; 

export const router = express.Router();
const schedulingAdapter = new SchedulingAdapter(new SchedulingDatabase())

router.get("/:scheduleId", async (req: Request, res: Response) => {
  try {
    const scheduleId: UUID = req.params.scheduleId as UUID;
    const schedule: Scheduling = await schedulingAdapter.getById(scheduleId);
    res.status(200).json(schedule);
  } catch (error: any) {
    res.status(404).json({ error: "Schedule not found" });
  }
});

router.patch("/:scheduleId", async (req: Request, res: Response) => {
  const scheduleId: UUID = req.params.scheduleId as UUID;
  const { scheduledDate, isCompleted, isCanceled, rating } = req.body;

  try {
    const existingSchedule: Scheduling = await schedulingAdapter.getById(scheduleId);

    if (scheduledDate) existingSchedule.scheduledDate = new Date(scheduledDate);
    if (isCompleted) existingSchedule.isCompleted = isCompleted;
    if (isCanceled) existingSchedule.isCanceled = isCanceled;
    if (rating) {
      if (rating < 0 || rating > 5) {
        res.status(422).json({
          error: "Rating should be in the range [0, 5]",
        });
        return;
      }
      existingSchedule.setRating(rating);
    }

    const updatedSchedule: Scheduling = await schedulingAdapter.save(existingSchedule);
    res.json(updatedSchedule);
  } catch (error: any) {
    if (error instanceof Error && error.message === "Schedule not found") {
      res.status(404).json({ error: "Schedule not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

router.patch("/mark_as_complete/:serviceId", async (req: Request, res: Response) => {
  const scheduleId: UUID = req.params.scheduleId as UUID;

  try {
    const existingSchedule: Scheduling = await schedulingAdapter.getById(scheduleId);
    existingSchedule.isCompleted = true;
    const updatedSchedule: Scheduling = await schedulingAdapter.save(existingSchedule);
    res.json(updatedSchedule);
  } catch (error: any) {
    if (error instanceof Error && error.message === "Schedule not found") {
      res.status(404).json({ error: "Schedule not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

router.post("/create/:serviceId", async (req: Request, res: Response) => {
  const serviceId: UUID = req.params.serviceId as UUID;
  const { scheduledDate, isCompleted, isCanceled, rating, serviceProviderProfileId, customerId } = req.body;
  
  try {
    const rating_parsed = parseInt(rating, 10)
    if (rating_parsed < 0 || rating_parsed > 5) {
      res.status(422).json({
        error: "Rating should be in the range [0, 5]",
      });
      return;
    }

    const newSchedule: Scheduling = new Scheduling(
      randomUUID(),
      serviceId,
      new Date(scheduledDate),
      Boolean(isCompleted),
      Boolean(isCanceled),
      rating_parsed,
      serviceProviderProfileId,
      customerId,
    );

    const createdSchedule: Scheduling = await schedulingAdapter.save(newSchedule);
    res.status(201).json(createdSchedule);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});
