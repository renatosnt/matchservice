import { Request, Response } from "express";
import { UserAdapter } from "../../../../adapters/user-adapter";
import { CustomRequest } from "../../middlewares";
import { randomUUID, UUID } from "crypto";
import { SchedulingAdapter } from "../../../../adapters/scheduling-adapter";
import { ServiceAdapter } from "../../../../adapters/service-adapter";
import { ServiceProviderProfileAdapter } from "../../../../adapters/service-provider-profile-adapter";
import { Service } from "../../../../domain/entities/service.entity";

export class ServiceRouterHandler {
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

  public async getServicesHandler(req: Request, res: Response) {
    try {
      const services = await this.serviceAdapter.getAll();

      res.status(200).json(services);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  public async searchServicesHandler(req: Request, res: Response) {
    const { title, description, category, profileId } = req.body;

    try {
      const services = await this.serviceAdapter.search(
        title,
        description,
        category,
        profileId,
      );
      res.json(services);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async getServiceCategoriesHandler(req: Request, res: Response) {
    try {
      const categories = await this.serviceAdapter.getUniqueCategories();
      res.json(categories);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async getServiceByIdHandler(req: Request, res: Response) {
    const serviceId = req.params.serviceId as UUID;

    try {
      const service: Service = await this.serviceAdapter.getById(serviceId);

      service.viewCount++;

      await this.serviceAdapter.save(service);

      res.status(200).json(service);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  public async getServiceScheduleByIdHandler(req: Request, res: Response) {
    const serviceId = req.params.serviceId as UUID;

    try {
      const scheduling = await this.schedulingAdapter.getByServiceId(serviceId);
      res.json(scheduling);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  public async deleteServiceByIdHandler(req: Request, res: Response) {
    const serviceId = req.params.serviceId as UUID;
    const userData = (req as CustomRequest).userData;

    try {
      const authenticatedUser = await this.userAdapter.getById(userData.id);
      if (
        authenticatedUser.serviceProviderProfileId === undefined ||
        authenticatedUser.serviceProviderProfileId === null
      )
        throw new Error("Authenticated user is not a Service Provider.");

      const authenticatedProfile =
        await this.serviceProviderProfileAdapter.getById(
          authenticatedUser.serviceProviderProfileId,
        );
      if (!authenticatedProfile.getServices().includes(serviceId))
        throw new Error("Authenticated user does not own this Service.");

      const allServices = authenticatedProfile.getServices();
      const idx = allServices.indexOf(serviceId);
      if (idx > -1) {
        allServices.splice(idx, 1);
        authenticatedProfile.setServices(allServices);
        await this.serviceProviderProfileAdapter.save(authenticatedProfile);
      }

      const deletedService = await this.serviceAdapter.deleteById(serviceId);

      res.json(deletedService);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async createServiceHandler(req: Request, res: Response) {
    const userData = (req as CustomRequest).userData;

    try {
      const authenticatedUser = await this.userAdapter.getById(userData.id);
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

      const profile = await this.serviceProviderProfileAdapter.getById(
        authenticatedUser.serviceProviderProfileId,
      );
      profile.addService(newService.id);
      await this.serviceProviderProfileAdapter.save(profile);

      const savedService: Service = await this.serviceAdapter.save(newService);
      res.status(201).json(savedService);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async patchServiceHandler(req: Request, res: Response) {
    const serviceId = req.params.serviceId as UUID;
    const userData = (req as CustomRequest).userData;

    try {
      const { title, description, category, locationState, locationCity } =
        req.body;
      const authenticatedUser = await this.userAdapter.getById(userData.id);
      const existingService: Service =
        await this.serviceAdapter.getById(serviceId);

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
        await this.serviceAdapter.save(existingService);
      res.json(updatedService);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
