import { Request, Response } from "express";
import { UserAdapter } from "../../../../adapters/user-adapter";
import { CustomRequest } from "../../middlewares";
import { randomUUID, UUID } from "crypto";
import { SchedulingAdapter } from "../../../../adapters/scheduling-adapter";
import { ServiceProviderProfileAdapter } from "../../../../adapters/service-provider-profile-adapter";
import { ServiceProviderProfile } from "../../../../domain/entities/service-provider-profile.entity";

export class ProfileRouterHandler {
  private readonly serviceProviderProfileAdapter: ServiceProviderProfileAdapter;
  private readonly schedulingAdapter: SchedulingAdapter;
  private readonly userAdapter: UserAdapter;

  constructor(
    serviceProviderProfileAdapter: ServiceProviderProfileAdapter,
    schedulingAdapter: SchedulingAdapter,
    userAdapter: UserAdapter,
  ) {
    this.serviceProviderProfileAdapter = serviceProviderProfileAdapter;
    this.schedulingAdapter = schedulingAdapter;
    this.userAdapter = userAdapter;
  }

  public async getProfileByIdHandler(req: Request, res: Response) {
    const profileId = req.params.profileId as UUID;

    try {
      const profile =
        await this.serviceProviderProfileAdapter.getById(profileId);
      res.status(200).json(profile);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async getProfileRatingByIdHandler(req: Request, res: Response) {
    const profileId = req.params.profileId as UUID;

    try {
      const profile =
        await this.serviceProviderProfileAdapter.getById(profileId);
      const schedule =
        await this.schedulingAdapter.getByServiceProviderProfileId(profileId);
      const result = profile.calculateAndSetAverageRating(schedule);
      await this.serviceProviderProfileAdapter.save(profile);

      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async getProfileScheduleByIdHandler(req: Request, res: Response) {
    const profileId = req.params.profileId as UUID;

    try {
      const schedule =
        await this.schedulingAdapter.getByServiceProviderProfileId(profileId);

      res.status(200).json(schedule);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async patchProfileByIdHandler(req: Request, res: Response) {
    const userData = (req as CustomRequest).userData;
    const profileId = req.params.profileId as UUID;

    try {
      const authenticatedUser = await this.userAdapter.getById(userData.id);
      if (authenticatedUser.type !== "ServiceProvider") {
        res
          .status(403)
          .json({ message: "Authenticated user is not a Service Provider." });
        return;
      }

      if (authenticatedUser.serviceProviderProfileId !== profileId) {
        res
          .status(403)
          .json({ message: "Authenticated user does not own this Profile." });
        return;
      }

      const { telephoneNumber, specialty } = req.body;
      const profile =
        await this.serviceProviderProfileAdapter.getById(profileId);

      if (telephoneNumber) profile.telephoneNumber = telephoneNumber;
      if (specialty) profile.specialty = specialty;

      const savedUser = await this.serviceProviderProfileAdapter.save(profile);
      res.status(201).json(savedUser);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async createProfileHandler(req: Request, res: Response) {
    const userData = (req as CustomRequest).userData;

    try {
      const authenticatedUser = await this.userAdapter.getById(userData.id);
      if (authenticatedUser.type !== "ServiceProvider") {
        res
          .status(403)
          .json({ message: "Authenticated user is not a Service Provider." });
        return;
      }

      const { telephoneNumber, specialty } = req.body;

      const newProfile = new ServiceProviderProfile(
        randomUUID(),
        userData.id,
        telephoneNumber,
        specialty,
        0,
        [],
        [],
      );
      const savedUser =
        await this.serviceProviderProfileAdapter.save(newProfile);
      authenticatedUser.serviceProviderProfileId = newProfile.id;
      await this.userAdapter.save(authenticatedUser);
      res.status(201).json(savedUser);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
