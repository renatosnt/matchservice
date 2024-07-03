import express, { Request, Response } from "express";
import { UUID, randomUUID } from "crypto";
import { Scheduling } from "../../../domain/entities/scheduling.entity";
import { SchedulingAdapter } from "../../../adapters/scheduling-adapter";
import { SchedulingDatabase } from "../../../intrastructure/scheduling-database";
import {
  ContentTypeMiddleware,
  CustomRequest,
  sessionMiddleware,
} from "../middlewares";
import { ServiceAdapter } from "../../../adapters/service-adapter";
import { ServiceDatabase } from "../../../intrastructure/service-database";
import { UserAdapter } from "../../../adapters/user-adapter";
import { UserDatabase } from "../../../intrastructure/user-database";
import { ServiceProviderProfileAdapter } from "../../../adapters/service-provider-profile-adapter";
import { ServiceProviderProfileDatabase } from "../../../intrastructure/service-provider-profile-database";

export const router = express.Router();
const schedulingAdapter = new SchedulingAdapter(new SchedulingDatabase());
const serviceAdapter = new ServiceAdapter(new ServiceDatabase());
const userAdapter = new UserAdapter(new UserDatabase());
const serviceProviderProfileAdapter = new ServiceProviderProfileAdapter(
  new ServiceProviderProfileDatabase(),
);

router.patch(
  "/mark_as_complete/:scheduleId",
  sessionMiddleware,
  async (req: Request, res: Response) => {
    const scheduleId: UUID = req.params.scheduleId as UUID;

    try {
      const existingSchedule: Scheduling =
        await schedulingAdapter.getById(scheduleId);
      existingSchedule.isCompleted = true;
      const updatedSchedule: Scheduling =
        await schedulingAdapter.save(existingSchedule);
      res.json(updatedSchedule);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
);

router.patch(
  "/mark_as_canceled/:scheduleId",
  sessionMiddleware,
  async (req: Request, res: Response) => {
    const scheduleId: UUID = req.params.scheduleId as UUID;

    try {
      const existingSchedule: Scheduling =
        await schedulingAdapter.getById(scheduleId);
      existingSchedule.isCanceled = true;
      const updatedSchedule: Scheduling =
        await schedulingAdapter.save(existingSchedule);
      res.json(updatedSchedule);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
);

router.patch(
  "/rate/:rating",
  [ContentTypeMiddleware, sessionMiddleware],
  async (req: Request, res: Response) => {
    const scheduleId: UUID = req.params.rating as UUID;
    const userData = (req as CustomRequest).userData;
    let { rating } = req.body;

    try {
      if (userData.type !== "Customer")
        throw new Error("Authenticated user is not a Customer.");

      const existingSchedule = await schedulingAdapter.getById(scheduleId);

      rating = parseInt(rating);

      existingSchedule.setRating(rating);

      const updatedSchedule = await schedulingAdapter.save(existingSchedule);
      res.json(updatedSchedule);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
);

router.get("/:scheduleId", async (req: Request, res: Response) => {
  try {
    const scheduleId = req.params.scheduleId as UUID;
    const schedule = await schedulingAdapter.getById(scheduleId);
    res.status(200).json(schedule);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.patch(
  "/:scheduleId",
  [ContentTypeMiddleware, sessionMiddleware],
  async (req: Request, res: Response) => {
    const scheduleId = req.params.scheduleId as UUID;
    const { scheduledDate } = req.body;

    try {
      const existingSchedule = await schedulingAdapter.getById(scheduleId);

      if (scheduledDate)
        existingSchedule.scheduledDate = new Date(scheduledDate);

      if (!existingSchedule.scheduledDate.toJSON())
        throw new Error("Scheduled Date is invalid.");

      const updatedSchedule = await schedulingAdapter.save(existingSchedule);
      res.json(updatedSchedule);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
);

router.post(
  "/create/:serviceId",
  [ContentTypeMiddleware, sessionMiddleware],
  async (req: Request, res: Response) => {
    const serviceId: UUID = req.params.serviceId as UUID;
    const { scheduledDate } = req.body;

    try {
      const userData = (req as CustomRequest).userData;

      const authenticatedUser = await userAdapter.getById(userData.id);
      if (authenticatedUser.type !== "Customer")
        throw new Error("Authenticated user is not a Customer.");

      const service = await serviceAdapter.getById(serviceId);
      const profile = await serviceProviderProfileAdapter.getById(
        service.creatorProfileId,
      );

      const newSchedule: Scheduling = new Scheduling(
        randomUUID(),
        serviceId,
        new Date(scheduledDate),
        false,
        false,
        0,
        service.creatorProfileId,
        userData.id,
      );

      if (!newSchedule.scheduledDate.toJSON())
        throw new Error("Scheduled Date is invalid.");

      const createdSchedule = await schedulingAdapter.save(newSchedule);

      authenticatedUser.addSchedule(newSchedule.id);
      await userAdapter.save(authenticatedUser);

      service.addSchedule(newSchedule.id);
      await serviceAdapter.save(service);

      profile.addSchedule(newSchedule.id);
      await serviceProviderProfileAdapter.save(profile);

      res.status(201).json(createdSchedule);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
);
