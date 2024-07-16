import express from "express";
import { ServiceAdapter } from "../../../adapters/service-adapter";
import { ServiceDatabase } from "../../../intrastructure/service-database";
import { ContentTypeMiddleware, sessionMiddleware } from "../middlewares";
import { UserAdapter } from "../../../adapters/user-adapter";
import { UserDatabase } from "../../../intrastructure/user-database";
import { ServiceProviderProfileAdapter } from "../../../adapters/service-provider-profile-adapter";
import { ServiceProviderProfileDatabase } from "../../../intrastructure/service-provider-profile-database";
import { SchedulingAdapter } from "../../../adapters/scheduling-adapter";
import { SchedulingDatabase } from "../../../intrastructure/scheduling-database";
import { ServiceRouterHandler } from "./handlers/service-handler";

export const router = express.Router();

const serviceHandler = new ServiceRouterHandler(
  new ServiceProviderProfileAdapter(new ServiceProviderProfileDatabase()),
  new SchedulingAdapter(new SchedulingDatabase()),
  new ServiceAdapter(new ServiceDatabase()),
  new UserAdapter(new UserDatabase()),
);

/**
 * @openapi
 * /service/:
 *   get:
 *     tags:
 *       - service
 *     summary: Gets all services in the database.
 *     responses:
 *       200:
 *         description: Returns all services
 *       500:
 *         description: Internal Server Error
 *
 */
router.get("/", serviceHandler.getServicesHandler.bind(serviceHandler));

/**
 * @openapi
 * /service/search:
 *   get:
 *     tags:
 *       - service
 *     summary: Searches for services in the database.
 *     requestBody:
 *       description: The service information. Only exact matches are shown. Properties are OR'd.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               profileId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns all services that match
 *       500:
 *         description: Internal Server Error
 *
 */
router.get(
  "/search",
  serviceHandler.searchServicesHandler.bind(serviceHandler),
);

/**
 * @openapi
 * /service/categories:
 *   get:
 *     tags:
 *       - service
 *     summary: Searches for all unique categories in the database.
 *     responses:
 *       200:
 *         description: Returns all unique categories
 *       500:
 *         description: Internal Server Error
 *
 */
router.get(
  "/categories",
  serviceHandler.getServiceCategoriesHandler.bind(serviceHandler),
);

/**
 * @openapi
 * /service/{serviceId}:
 *   get:
 *     tags:
 *       - service
 *     summary: Gets the service by it's ID. Adds a view count.
 *     parameters:
 *       - in: path
 *         name: serviceId
 *         required: true
 *         schema:
 *           type: UUID
 *         description: The service ID.
 *     responses:
 *       200:
 *         description: Returns the service
 *       500:
 *         description: Internal Server Error
 *
 */
router.get(
  "/:serviceId",
  serviceHandler.getServiceByIdHandler.bind(serviceHandler),
);

/**
 * @openapi
 * /service/{serviceId}/schedule:
 *   get:
 *     tags:
 *       - service
 *     summary: Gets the entire schedule of a service by it's ID.
 *     parameters:
 *       - in: path
 *         name: serviceId
 *         required: true
 *         schema:
 *           type: UUID
 *         description: The service ID.
 *     responses:
 *       200:
 *         description: Returns the entire schedule
 *       500:
 *         description: Internal Server Error
 *
 */
router.get(
  "/:serviceId/schedule",
  serviceHandler.getServiceScheduleByIdHandler.bind(serviceHandler),
);

/**
 * @openapi
 * /service/{serviceId}:
 *   delete:
 *     tags:
 *       - service
 *     summary: Deletes a service by it's ID.
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: serviceId
 *         required: true
 *         schema:
 *           type: UUID
 *         description: The service ID.
 *     responses:
 *       200:
 *         description: Returns the deleted service
 *       500:
 *         description: Internal Server Error
 *
 */
router.delete(
  "/:serviceId",
  sessionMiddleware,
  serviceHandler.deleteServiceByIdHandler.bind(serviceHandler),
);

/**
 * @openapi
 * /service/create:
 *   post:
 *     tags:
 *       - service
 *     summary: Creates a new service.
 *     security:
 *       - JWT: []
 *     requestBody:
 *       description: The service information.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               locationState:
 *                 type: string
 *               locationCity:
 *                 type: string
 *             required:
 *               - title
 *               - description
 *               - category
 *               - locationState
 *               - locationCity
 *       201:
 *         description: Returns the newly created service
 *       500:
 *         description: Internal Server Error
 *
 */
router.post(
  "/create",
  [ContentTypeMiddleware, sessionMiddleware],
  serviceHandler.createServiceHandler.bind(serviceHandler),
);

/**
 * @openapi
 * /service/{serviceId}:
 *   patch:
 *     tags:
 *       - service
 *     summary: Updates the content of a service.
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
 *       description: The service information. Only the provided fields are going to be updated.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               locationState:
 *                 type: string
 *               locationCity:
 *                 type: string
 *       201:
 *         description: Returns the updated service
 *       500:
 *         description: Internal Server Error
 *
 */
router.patch(
  "/:serviceId",
  [ContentTypeMiddleware, sessionMiddleware],
  serviceHandler.patchServiceHandler.bind(serviceHandler),
);
