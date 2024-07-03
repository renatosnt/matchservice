import express, { Request, Response } from "express";
import { UUID, randomUUID } from "crypto";
import { Service } from "../../../domain/entities/service.entity";
import { ServiceAdapter } from "../../../adapters/service-adapter";
import { ServiceDatabase } from "../../../intrastructure/service-database";
import {
  ContentTypeMiddleware,
  CustomRequest,
  sessionMiddleware,
} from "../middlewares";
import { UserAdapter } from "../../../adapters/user-adapter";
import { UserDatabase } from "../../../intrastructure/user-database";
import { ServiceProviderProfileAdapter } from "../../../adapters/service-provider-profile-adapter";
import { ServiceProviderProfileDatabase } from "../../../intrastructure/service-provider-profile-database";
import { SchedulingAdapter } from "../../../adapters/scheduling-adapter";
import { SchedulingDatabase } from "../../../intrastructure/scheduling-database";

export const router = express.Router();
const serviceAdapter = new ServiceAdapter(new ServiceDatabase());
const userAdapter = new UserAdapter(new UserDatabase());
const serviceProviderProfileAdapter = new ServiceProviderProfileAdapter(
  new ServiceProviderProfileDatabase(),
);
const scheduleAdapter = new SchedulingAdapter(new SchedulingDatabase());

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
router.get("/", async (req: Request, res: Response) => {

  try {
    const services = await serviceAdapter.getAll();

    res.status(200).json(services);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
});


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
router.get("/search", async (req: Request, res: Response) => {
  const { title, description, category, ProfileId } = req.body;

  try {
    const services = await serviceAdapter.search(
      title,
      description,
      category,
      ProfileId,
    );
    res.json(services);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

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
router.get("/categories", async (req: Request, res: Response) => {
  try {
    const categories = await serviceAdapter.getUniqueCategories();
    res.json(categories);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

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
router.get("/:serviceId", async (req: Request, res: Response) => {
  const serviceId = req.params.serviceId as UUID;

  try {
    const service: Service = await serviceAdapter.getById(serviceId);

    service.viewCount++;

    await serviceAdapter.save(service);

    res.status(200).json(service);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
});

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
router.get("/:serviceId/schedule", async (req: Request, res: Response) => {
  const serviceId = req.params.serviceId as UUID;

  try {
    const scheduling = await scheduleAdapter.getByServiceId(serviceId);
    res.json(scheduling);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
});

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
  async (req: Request, res: Response) => {
    const serviceId = req.params.serviceId as UUID;
    const userData = (req as CustomRequest).userData;

    try {
      const authenticatedUser = await userAdapter.getById(userData.id);
      if (
        authenticatedUser.serviceProviderProfileId === undefined ||
        authenticatedUser.serviceProviderProfileId === null
      )
        throw new Error("Authenticated user is not a Service Provider.");

      const authenticatedProfile = await serviceProviderProfileAdapter.getById(
        authenticatedUser.serviceProviderProfileId,
      );
      if (!authenticatedProfile.getServices().includes(serviceId))
        throw new Error("Authenticated user does not own this Service.");

      const allServices = authenticatedProfile.getServices();
      const idx = allServices.indexOf(serviceId);
      if (idx > -1) {
        allServices.splice(idx, 1);
        authenticatedProfile.setServices(allServices);
        await serviceProviderProfileAdapter.save(authenticatedProfile);
      }

      const deletedService = await serviceAdapter.deleteById(serviceId);

      res.json(deletedService);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
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
  async (req: Request, res: Response) => {
    const userData = (req as CustomRequest).userData;

    try {
      const authenticatedUser = await userAdapter.getById(userData.id);
      if (
        authenticatedUser.serviceProviderProfileId === undefined ||
        authenticatedUser.serviceProviderProfileId === null
      )
        throw new Error("Authenticated user is not a Service Provider.");

      const { title, description, category, locationState, locationCity } =
        req.body;

      const newService = new Service(
        randomUUID(),
        title,
        description,
        0,
        category,
        locationState,
        locationCity,
        authenticatedUser.serviceProviderProfileId,
        [],
        new Date(),
      );

      const profile = await serviceProviderProfileAdapter.getById(
        authenticatedUser.serviceProviderProfileId,
      );
      profile.addService(newService.id);
      await serviceProviderProfileAdapter.save(profile);

      const savedService: Service = await serviceAdapter.save(newService);
      res.status(201).json(savedService);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
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
  async (req: Request, res: Response) => {
    const serviceId = req.params.serviceId as UUID;
    const userData = (req as CustomRequest).userData;

    try {
      const { title, description, category, locationState, locationCity } =
        req.body;
      const authenticatedUser = await userAdapter.getById(userData.id);
      const existingService: Service = await serviceAdapter.getById(serviceId);

      if (
        existingService.creatorProfileId !==
        authenticatedUser.serviceProviderProfileId
      )
        throw new Error("Authenticated user does not own this service.");

      if (title) existingService.title = title;
      if (description) existingService.description = description;
      if (category) existingService.category = category;
      if (locationState) existingService.locationState = locationState;
      if (locationCity) existingService.locationCity = locationCity;

      const updatedService: Service =
        await serviceAdapter.save(existingService);
      res.json(updatedService);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
);
