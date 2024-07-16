import express from "express";
import { ServiceProviderProfileAdapter } from "../../../adapters/service-provider-profile-adapter";
import { ServiceProviderProfileDatabase } from "../../../intrastructure/service-provider-profile-database";
import { SchedulingAdapter } from "../../../adapters/scheduling-adapter";
import { SchedulingDatabase } from "../../../intrastructure/scheduling-database";
import { sessionMiddleware, ContentTypeMiddleware } from "../middlewares";
import { UserAdapter } from "../../../adapters/user-adapter";
import { UserDatabase } from "../../../intrastructure/user-database";
import { ProfileRouterHandler } from "./handlers/profile-handler";

export const router = express.Router();

const profileHandler = new ProfileRouterHandler(
  new ServiceProviderProfileAdapter(new ServiceProviderProfileDatabase()),
  new SchedulingAdapter(new SchedulingDatabase()),
  new UserAdapter(new UserDatabase()),
);

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
router.get(
  "/:profileId",
  profileHandler.getProfileByIdHandler.bind(profileHandler),
);

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
router.get(
  "/:profileId/rating",
  profileHandler.getProfileRatingByIdHandler.bind(profileHandler),
);

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
router.get(
  "/:profileId/schedule",
  profileHandler.getProfileScheduleByIdHandler.bind(profileHandler),
);

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
  profileHandler.getProfileByIdHandler.bind(profileHandler),
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
  profileHandler.createProfileHandler.bind(profileHandler),
);
