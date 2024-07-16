import express from "express";
import { SchedulingAdapter } from "../../../adapters/scheduling-adapter";
import { SchedulingDatabase } from "../../../intrastructure/scheduling-database";
import { ContentTypeMiddleware, sessionMiddleware } from "../middlewares";
import { ServiceAdapter } from "../../../adapters/service-adapter";
import { ServiceDatabase } from "../../../intrastructure/service-database";
import { UserAdapter } from "../../../adapters/user-adapter";
import { UserDatabase } from "../../../intrastructure/user-database";
import { ServiceProviderProfileAdapter } from "../../../adapters/service-provider-profile-adapter";
import { ServiceProviderProfileDatabase } from "../../../intrastructure/service-provider-profile-database";
import { ScheduleRouterHandler } from "./handlers/schedule-handler";

export const router = express.Router();

const scheduleHandler = new ScheduleRouterHandler(
  new ServiceProviderProfileAdapter(new ServiceProviderProfileDatabase()),
  new SchedulingAdapter(new SchedulingDatabase()),
  new ServiceAdapter(new ServiceDatabase()),
  new UserAdapter(new UserDatabase()),
);

/**
 * @openapi
 * /schedule/mark_as_complete/{scheduleId}:
 *   patch:
 *     tags:
 *       - schedule
 *     summary: Marks a schedule as complete.
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: scheduleId
 *         required: true
 *         schema:
 *           type: UUID
 *         description: The schedule ID.
 *     responses:
 *       201:
 *         description: Returns the updated schedule
 *       500:
 *         description: Internal Server Error
 *
 */
router.patch(
  "/mark_as_complete/:scheduleId",
  sessionMiddleware,
  scheduleHandler.markScheduleAsCompleteHandler.bind(scheduleHandler),
);

/**
 * @openapi
 * /schedule/mark_as_canceled/{scheduleId}:
 *   patch:
 *     tags:
 *       - schedule
 *     summary: Marks a schedule as canceled.
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: scheduleId
 *         required: true
 *         schema:
 *           type: UUID
 *         description: The schedule ID.
 *     responses:
 *       201:
 *         description: Returns the updated schedule
 *       500:
 *         description: Internal Server Error
 *
 */
router.patch(
  "/mark_as_canceled/:scheduleId",
  sessionMiddleware,
  scheduleHandler.markScheduleAsCanceledHandler.bind(scheduleHandler),
);

/**
 * @openapi
 * /schedule/rate/{scheduleId}:
 *   patch:
 *     tags:
 *       - schedule
 *     summary: Evalulates a scheduled service from 1 - 5.
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: scheduleId
 *         required: true
 *         schema:
 *           type: UUID
 *         description: The schedule ID.
 *     requestBody:
 *       description: The rating from 1-5.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: string
 *     responses:
 *       201:
 *         description: Returns the updated schedule with the rating rounded down
 *       500:
 *         description: Internal Server Error
 *
 */
router.patch(
  "/rate/:scheduleId",
  [ContentTypeMiddleware, sessionMiddleware],
  scheduleHandler.rateSchedulebyIdHandler.bind(scheduleHandler),
);

/**
 * @openapi
 * /schedule/{scheduleId}:
 *   get:
 *     tags:
 *       - schedule
 *     summary: Gets a schedule by it's ID.
 *     parameters:
 *       - in: path
 *         name: scheduleId
 *         required: true
 *         schema:
 *           type: UUID
 *         description: The schedule ID.
 *     responses:
 *       200:
 *         description: Returns the schedule if found
 *       500:
 *         description: Internal Server Error
 *
 */
router.get(
  "/:scheduleId",
  scheduleHandler.getSchedulebyIdHandler.bind(scheduleHandler),
);

/**
 * @openapi
 * /schedule/{scheduleId}:
 *   patch:
 *     tags:
 *       - schedule
 *     summary: Updates the scheduled date of a scheduling.
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: scheduleId
 *         required: true
 *         schema:
 *           type: UUID
 *         description: The schedule ID.
 *     requestBody:
 *       description: The new date in format YYYY-MM-DD
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               scheduledDate:
 *                 type: string
 *                 example: "2024-10-16"
 *     responses:
 *       201:
 *         description: Returns the updated schedule
 *       500:
 *         description: Internal Server Error
 *
 */
router.patch(
  "/:scheduleId",
  [ContentTypeMiddleware, sessionMiddleware],
  scheduleHandler.patchSchedulebyIdHandler.bind(scheduleHandler),
);

/**
 * @openapi
 * /schedule/create/{serviceId}:
 *   post:
 *     tags:
 *       - schedule
 *     summary: Creates a new scheduling for a service
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: serviceId
 *         required: true
 *         schema:
 *           type: UUID
 *         description: The service ID.
 *     requestBody:
 *       description: The date in format YYYY-MM-DD
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               scheduledDate:
 *                 type: string
 *                 example: "2024-10-16"
 *     responses:
 *       201:
 *         description: Returns the new scheduling
 *       500:
 *         description: Internal Server Error
 *
 */
router.post(
  "/create/:serviceId",
  [ContentTypeMiddleware, sessionMiddleware],
  scheduleHandler.createScheduleWithServiceIdHandler.bind(scheduleHandler),
);
