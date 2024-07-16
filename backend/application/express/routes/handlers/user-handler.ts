import { Request, Response } from "express";
import { UserAdapter } from "../../../../adapters/user-adapter";
import { CustomRequest } from "../../middlewares";
import { randomUUID, UUID } from "crypto";
import { SchedulingAdapter } from "../../../../adapters/scheduling-adapter";
import { User } from "../../../../domain/entities/user.entity";

export class UserRouterHandler {
  private readonly schedulingAdapter: SchedulingAdapter;
  private readonly userAdapter: UserAdapter;

  constructor(schedulingAdapter: SchedulingAdapter, userAdapter: UserAdapter) {
    this.schedulingAdapter = schedulingAdapter;
    this.userAdapter = userAdapter;
  }

  public async getSelfUserHandler(req: Request, res: Response) {
    try {
      const userData = (req as CustomRequest).userData;
      await this.userAdapter.getById(userData.id);

      res.status(200).json(userData);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async getUserByIdHandler(req: Request, res: Response) {
    const userId: UUID = req.params.userId as UUID;

    try {
      const user: User = await this.userAdapter.getById(userId);

      const responseWithoutPassword = { ...user };
      delete (responseWithoutPassword as any).password;
      res.status(200).json(responseWithoutPassword);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async getUserScheduleByIdHandler(req: Request, res: Response) {
    const userId: UUID = req.params.userId as UUID;
    const userData = (req as CustomRequest).userData;

    try {
      if (userData.id !== userId)
        throw new Error("Authenticated user cannot see this schedule.");

      const schedule = await this.schedulingAdapter.getByCustomerId(userId);
      res.status(200).json(schedule);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async registerUserHandler(req: Request, res: Response) {
    try {
      const { username, realName, email, password, type } = req.body;

      if (type !== "Customer" && type !== "ServiceProvider") {
        res
          .status(422)
          .json({ message: "Type should be one of Customer, ServiceProvider" });
        return;
      }

      const newUser = new User(
        randomUUID(),
        username,
        realName,
        email,
        password,
        type,
        [],
        null,
        new Date(),
      );
      const savedUser = await this.userAdapter.save(newUser);
      res.status(201).json(savedUser);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async patchUserByIdHandler(req: Request, res: Response) {
    const userId = req.params.userId as UUID;
    const userData = (req as CustomRequest).userData;

    try {
      if (userData.id !== userId)
        throw new Error(`Authenticated user is not ${userId}.`);

      const user = await this.userAdapter.getById(userId);
      const { username, realName, email, password } = req.body;

      if (username) user.username = username;
      if (realName) user.realName = realName;
      if (email) user.email = email;
      if (password) user.password = password;

      const updatedUser = await this.userAdapter.save(user);
      res.status(200).json(updatedUser);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
