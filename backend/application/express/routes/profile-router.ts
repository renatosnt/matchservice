import express, { Request, Response } from "express";
import { ServiceProviderProfileAdapter } from "../../../adapters/service-provider-profile-adapter";
import { ServiceProviderProfileDatabase } from "../../../intrastructure/service-provider-profile-database";
import { randomUUID, UUID } from "crypto";
import { SchedulingAdapter } from "../../../adapters/scheduling-adapter";
import { SchedulingDatabase } from "../../../intrastructure/scheduling-database";
import {
  sessionMiddleware,
  CustomRequest,
  ContentTypeMiddleware,
} from "../middlewares";
import { ServiceProviderProfile } from "../../../domain/entities/service-provider-profile.entity";
import { UserAdapter } from "../../../adapters/user-adapter";
import { UserDatabase } from "../../../intrastructure/user-database";

export const router = express.Router();

const serviceProviderProfileAdapter = new ServiceProviderProfileAdapter(
  new ServiceProviderProfileDatabase(),
);
const schedulingAdapter = new SchedulingAdapter(new SchedulingDatabase());
const userAdapter = new UserAdapter(new UserDatabase());

router.get("/:serviceProviderId", async (req: Request, res: Response) => {
  const profileId = req.params.serviceProviderId as UUID;

  try {
    const profile = await serviceProviderProfileAdapter.getById(profileId);
    res.status(200).json(profile);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get(
  "/:serviceProviderId/rating",
  async (req: Request, res: Response) => {
    const profileId = req.params.serviceProviderId as UUID;

    try {
      const profile = await serviceProviderProfileAdapter.getById(profileId);
      const schedule =
        await schedulingAdapter.getByServiceProviderProfileId(profileId);
      const result = profile.calculateAndSetAverageRating(schedule);
      await serviceProviderProfileAdapter.save(profile);

      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
);

router.get(
  "/:serviceProviderId/schedule",
  async (req: Request, res: Response) => {
    const profileId = req.params.serviceProviderId as UUID;

    try {
      const schedule =
        await schedulingAdapter.getByServiceProviderProfileId(profileId);

      res.status(200).json(schedule);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
);

router.patch(
  "/:serviceProviderId",
  [ContentTypeMiddleware, sessionMiddleware],
  async (req: Request, res: Response) => {
    const userData = (req as CustomRequest).userData;
    const profileId = req.params.serviceProviderId as UUID;

    try {
      const authenticatedUser = await userAdapter.getById(userData.id);
      if (authenticatedUser.type !== "ServiceProvider")
        throw new Error("Authenticated user is not a Service Provider.");

      if (authenticatedUser.serviceProviderProfileId !== profileId)
        throw new Error("Authenticated user does not own this Profile.");

      const { telephoneNumber, specialty } = req.body;

      const profile = await serviceProviderProfileAdapter.getById(profileId);

      if (telephoneNumber) profile.telephoneNumber = telephoneNumber;
      if (specialty) profile.specialty = specialty;

      const savedUser = await serviceProviderProfileAdapter.save(profile);
      res.status(201).json(savedUser);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
);

router.post(
  "/create",
  [ContentTypeMiddleware, sessionMiddleware],
  async (req: Request, res: Response) => {
    const userData = (req as CustomRequest).userData;

    try {
      const authenticatedUser = await userAdapter.getById(userData.id);
      if (authenticatedUser.type !== "ServiceProvider")
        throw new Error("Authenticated user is not a Service Provider.");

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
      const savedUser = await serviceProviderProfileAdapter.save(newProfile);
      authenticatedUser.serviceProviderProfileId = newProfile.id;
      await userAdapter.save(authenticatedUser);
      res.status(201).json(savedUser);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
);
