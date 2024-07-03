import express, { Request, Response } from "express";
import { UUID, randomUUID } from "crypto";
import { Service } from "../../../domain/entities/service.entity";
import { ServiceAdapter } from "../../../adapters/service-adapter";
import { ServiceDatabase } from "../../../intrastructure/service-database";

export const router = express.Router();
const serviceAdapter = new ServiceAdapter(new ServiceDatabase());

router.get("/:serviceId", async (req: Request, res: Response) => {
  const serviceId: UUID = req.params.serviceId as UUID;

  try {
    const service: Service = await serviceAdapter.getById(serviceId);
    res.status(200).json(service);
  } catch (error: any) {
    res.status(404).json({ error: "Service not found" });
  }
});

router.get("/:serviceId/schedule", async (req: Request, res: Response) => {
  const serviceId: UUID = req.params.serviceId as unknown as UUID;

  try {
    const scheduling = await serviceAdapter.getServiceSchedulingById(serviceId);
    res.json(scheduling);
  } catch (error: any) {
    res.status(404).json({ error: "Service not found" });
  }
});

router.delete("/:serviceId", async (req: Request, res: Response) => {
  const serviceId: UUID = req.params.serviceId as UUID;

  try {
    const deletedService: Service = await serviceAdapter.deleteById(serviceId);
    res.json(deletedService);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/search", async (req: Request, res: Response) => {
  const { title, description, category, creatorProfileId } = req.body;

  try {
    const services: Service[] = await serviceAdapter.search(
      title as string,
      description as string,
      category as string,
      creatorProfileId as string
    );
    res.json(services);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/categories", async (req: Request, res: Response) => {
  try {
    const categories: string[] = await serviceAdapter.getUniqueCategories();
    res.json(categories);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      viewCount,
      category,
      locationState,
      locationCity,
      creatorProfileId
    } = req.body

    const newService = new Service(
      randomUUID(),
      title,
      description,
      parseInt(viewCount, 10),
      category,
      locationState,
      locationCity,
      creatorProfileId,
      [],
      new Date()
    )

    const savedService: Service = await serviceAdapter.save(newService);
    res.status(201).json(savedService);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:serviceId", async (req: Request, res: Response) => {
  const serviceId: UUID = req.params.serviceId  as UUID;
  const updates: Partial<Service> = req.body;

  if (typeof updates.viewCount === "string") {
    updates.viewCount = parseInt(updates.viewCount, 10);
  }

  try {
    const existingService: Service = await serviceAdapter.getById(serviceId);
    Object.assign(existingService, updates);

    const updatedService: Service = await serviceAdapter.save(existingService);
    res.json(updatedService);
  } catch (error: any) {
    if (error instanceof Error && error.message === "Service not found") {
      res.status(404).json({ error: "Service not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});
