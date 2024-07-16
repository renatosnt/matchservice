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

/**
 * @openapi
 * /profile/{profileId}:
 *   get:
 *     tags:
 *       - profile
 *     summary: Gets the profile by it's ID.
 *     parameters:
 *       - in: path
 *         name: profileId
 *         required: true
 *         schema:
 *           type: UUID
 *         description: The profile ID.
 *     responses:
 *       200:
 *         description: Returns the profile
 *       500:
 *         description: Internal Server Error
 *
 */
router.get("/:profileId", async (req: Request, res: Response) => {
  const profileId = req.params.profileId as UUID;

  try {
    const profile = await serviceProviderProfileAdapter.getById(profileId);
    res.status(200).json(profile);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @openapi
 * /profile/{profileId}/rating:
 *   get:
 *     tags:
 *       - profile
 *     summary: Gets the average rating of a profile by it's ID.
 *     parameters:
 *       - in: path
 *         name: profileId
 *         required: true
 *         schema:
 *           type: UUID
 *         description: The profile ID.
 *     responses:
 *       200:
 *         description: Returns the average rating
 *       500:
 *         description: Internal Server Error
 *
 */
router.get("/:profileId/rating", async (req: Request, res: Response) => {
  const profileId = req.params.profileId as UUID;

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
});

/**
 * @openapi
 * /profile/{profileId}/schedule:
 *   get:
 *     tags:
 *       - profile
 *     summary: Gets the entire schedule of a profile by it's ID.
 *     parameters:
 *       - in: path
 *         name: profileId
 *         required: true
 *         schema:
 *           type: UUID
 *         description: The profile ID.
 *     responses:
 *       200:
 *         description: Returns the entire schedule
 *       500:
 *         description: Internal Server Error
 *
 */
router.get("/:profileId/schedule", async (req: Request, res: Response) => {
  const profileId = req.params.profileId as UUID;

  try {
    const schedule =
      await schedulingAdapter.getByServiceProviderProfileId(profileId);

    res.status(200).json(schedule);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @openapi
 * /profile/{profileId}:
 *   patch:
 *     tags:
 *       - profile
 *     summary: Updates the content of a profile.
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: profileId
 *         required: true
 *         schema:
 *           type: UUID
 *         description: The profile ID.
 *     requestBody:
 *       description: The profile information. Only the provided fields are going to be updated.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               telephoneNumber:
 *                 type: string
 *               specialty:
 *                 type: string
 *     responses:
 *       201:
 *         description: Returns the updated profile
 *       500:
 *         description: Internal Server Error
 *
 */
router.patch(
  "/:profileId",
  [ContentTypeMiddleware, sessionMiddleware],
  async (req: Request, res: Response) => {
    const userData = (req as CustomRequest).userData;
    const profileId = req.params.profileId as UUID;

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

/**
 * @openapi
 * /profile/create:
 *   patch:
 *     tags:
 *       - profile
 *     summary: Creates a new profile.
 *     security:
 *       - JWT: []
 *     requestBody:
 *       description: The profile information.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               telephoneNumber:
 *                 type: string
 *               specialty:
 *                 type: string
 *             required:
 *               - telephoneNumber
 *               - specialty
 *     responses:
 *       201:
 *         description: Returns the new profile
 *       500:
 *         description: Internal Server Error
 *
 */
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
