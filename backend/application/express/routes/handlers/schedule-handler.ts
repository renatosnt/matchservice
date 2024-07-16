import { Request, Response } from "express";
import { UserAdapter } from "../../../../adapters/user-adapter";
import { CustomRequest } from "../../middlewares";
import { randomUUID, UUID } from "crypto";
import { SchedulingAdapter } from "../../../../adapters/scheduling-adapter";
import { ServiceAdapter } from "../../../../adapters/service-adapter";
import { ServiceProviderProfileAdapter } from "../../../../adapters/service-provider-profile-adapter";
import { Scheduling } from "../../../../domain/entities/scheduling.entity";

export class ScheduleRouterHandler {
  private readonly serviceProviderProfileAdapter: ServiceProviderProfileAdapter;
  private readonly schedulingAdapter: SchedulingAdapter;
  private readonly serviceAdapter: ServiceAdapter;
  private readonly userAdapter: UserAdapter;

  constructor(
    serviceProviderProfileAdapter: ServiceProviderProfileAdapter,
    schedulingAdapter: SchedulingAdapter,
    serviceAdapter: ServiceAdapter,
    userAdapter: UserAdapter,
  ) {
    this.serviceProviderProfileAdapter = serviceProviderProfileAdapter;
    this.schedulingAdapter = schedulingAdapter;
    this.serviceAdapter = serviceAdapter;
    this.userAdapter = userAdapter;
  }

  public async markScheduleAsCompleteHandler(req: Request, res: Response) {
    const scheduleId: UUID = req.params.scheduleId as UUID;

    try {
      const existingSchedule: Scheduling =
        await this.schedulingAdapter.getById(scheduleId);
      existingSchedule.isCompleted = true;
      const updatedSchedule: Scheduling =
        await this.schedulingAdapter.save(existingSchedule);
      res.json(updatedSchedule);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async markScheduleAsCanceledHandler(req: Request, res: Response) {
    const scheduleId: UUID = req.params.scheduleId as UUID;

    try {
      const existingSchedule: Scheduling =
        await this.schedulingAdapter.getById(scheduleId);
      existingSchedule.isCanceled = true;
      const updatedSchedule: Scheduling =
        await this.schedulingAdapter.save(existingSchedule);
      res.json(updatedSchedule);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async rateSchedulebyIdHandler(req: Request, res: Response) {
    const scheduleId: UUID = req.params.scheduleId as UUID;
    const userData = (req as CustomRequest).userData;
    let { rating } = req.body;

    try {
      if (userData.type !== "Customer")
        throw new Error("Authenticated user is not a Customer.");

      const existingSchedule = await this.schedulingAdapter.getById(scheduleId);

      rating = parseInt(rating);
      existingSchedule.setRating(rating);

      const updatedSchedule =
        await this.schedulingAdapter.save(existingSchedule);
      res.json(updatedSchedule);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async getSchedulebyIdHandler(req: Request, res: Response) {
    try {
      const scheduleId = req.params.scheduleId as UUID;
      const schedule = await this.schedulingAdapter.getById(scheduleId);
      res.status(200).json(schedule);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async patchSchedulebyIdHandler(req: Request, res: Response) {
    const scheduleId = req.params.scheduleId as UUID;
    const { scheduledDate } = req.body;

    try {
      const existingSchedule = await this.schedulingAdapter.getById(scheduleId);

      if (scheduledDate)
        existingSchedule.scheduledDate = new Date(scheduledDate);

      if (!existingSchedule.scheduledDate.toJSON())
        throw new Error("Scheduled Date is invalid.");

      const updatedSchedule =
        await this.schedulingAdapter.save(existingSchedule);
      res.json(updatedSchedule);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async createScheduleWithServiceIdHandler(req: Request, res: Response) {
    const serviceId: UUID = req.params.serviceId as UUID;
    const { scheduledDate } = req.body;

    try {
      const userData = (req as CustomRequest).userData;

      const authenticatedUser = await this.userAdapter.getById(userData.id);
      if (authenticatedUser.type !== "Customer")
        throw new Error("Authenticated user is not a Customer.");

      const service = await this.serviceAdapter.getById(serviceId);
      const profile = await this.serviceProviderProfileAdapter.getById(
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

      const createdSchedule = await this.schedulingAdapter.save(newSchedule);

      authenticatedUser.addSchedule(newSchedule.id);
      await this.userAdapter.save(authenticatedUser);

      service.addSchedule(newSchedule.id);
      await this.serviceAdapter.save(service);

      profile.addSchedule(newSchedule.id);
      await this.serviceProviderProfileAdapter.save(profile);

      res.status(201).json(createdSchedule);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
