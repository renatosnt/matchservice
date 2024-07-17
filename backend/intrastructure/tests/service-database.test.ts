import { randomUUID } from "crypto";
import { ServiceDatabase } from "../service-database";
import { prismaMock } from "./prisma-mock";
import { PrismaServiceMapper } from "../mappings/service-mapping";
import { Service } from "../../domain/entities/service.entity";
import { PrismaSchedulingMapper } from "../mappings/scheduling-mapping";
import { Scheduling } from "../../domain/entities/scheduling.entity";

const SERVICE_ID = randomUUID();
const SCHEDULING_ID = randomUUID();
const sampleScheduling = PrismaSchedulingMapper.toPrisma(
  new Scheduling(
    SCHEDULING_ID,
    randomUUID(),
    new Date(),
    true,
    false,
    2,
    randomUUID(),
    randomUUID(),
  ),
);
const sampleService = PrismaServiceMapper.toPrisma(
  new Service(
    SERVICE_ID,
    "good service wow",
    "ill do anything you want!",
    12,
    "Art",
    "Minas Gerais",
    "Belo Horizonte",
    randomUUID(),
    [],
    new Date(),
  ),
);

describe("UserAdapter", () => {
  let serviceDatabase: ServiceDatabase;

  beforeEach(() => {
    serviceDatabase = new ServiceDatabase(prismaMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should get all available services", async () => {
    prismaMock.service.findMany.mockReturnValue([
      sampleService,
      sampleService,
    ] as any);

    const result = await serviceDatabase.getAll();

    expect(prismaMock.service.findMany).toHaveBeenCalledTimes(1);
    expect(result).toEqual([sampleService, sampleService]);
  });

  test("should get service by id", async () => {
    const serviceId = randomUUID();
    prismaMock.service.findFirst.mockReturnValue(sampleService as any);

    const result = await serviceDatabase.getById(serviceId);

    expect(prismaMock.service.findFirst).toHaveBeenCalledWith({
      where: { id: serviceId },
    });
    expect(result).toEqual(sampleService);
  });

  test("should delete service by id", async () => {
    const serviceId = randomUUID();
    prismaMock.service.delete.mockReturnValue(sampleService as any);

    const result = await serviceDatabase.deleteById(serviceId);

    expect(prismaMock.service.delete).toHaveBeenCalledWith({
      where: { id: serviceId },
    });
    expect(result).toEqual(sampleService);
  });

  test("should get service by service provider id", async () => {
    const serviceProviderId = randomUUID();
    prismaMock.service.findMany.mockReturnValue([sampleService] as any);

    const result =
      await serviceDatabase.getByServiceProviderId(serviceProviderId);

    expect(prismaMock.service.findMany).toHaveBeenCalledWith({
      where: { creatorProfileId: serviceProviderId },
    });
    expect(result).toEqual([sampleService]);
  });

  test("should get scheduling by service id", async () => {
    const serviceId = randomUUID();
    prismaMock.scheduling.findMany.mockReturnValue([sampleScheduling] as any);

    const result = await serviceDatabase.getServiceSchedulingById(serviceId);

    expect(prismaMock.scheduling.findMany).toHaveBeenCalledWith({
      where: { serviceId: serviceId },
    });
    expect(result).toEqual([sampleScheduling]);
  });

  test("should get the unique service categories", async () => {
    prismaMock.service.findMany.mockReturnValue([
      { category: "Art" },
      { category: "Technology" },
      { category: "Art" },
    ] as any);

    const result = await serviceDatabase.getUniqueCategories();

    expect(prismaMock.service.findMany).toHaveBeenCalledWith({
      select: { category: true },
    });
    expect(result).toEqual(["Art", "Technology"]);
  });

  test("should search for services", async () => {
    prismaMock.service.findMany.mockReturnValue([
      sampleService,
      sampleService,
    ] as any);

    const result = await serviceDatabase.search(
      "painting",
      "i have good painting!",
    );

    expect(prismaMock.service.findMany).toHaveBeenCalledWith({
      where: {
        OR: [
          { title: "painting" },
          { description: "i have good painting!" },
          { category: undefined },
          { creatorProfileId: undefined },
        ],
      },
    });
    expect(result).toEqual([sampleService, sampleService]);
  });

  test("should save the service", async () => {
    prismaMock.service.upsert.mockReturnValue(sampleService as any);

    const result = await serviceDatabase.save(
      PrismaServiceMapper.toDomain(sampleService),
    );

    expect(prismaMock.service.upsert).toHaveBeenCalledWith({
      where: { id: SERVICE_ID },
      update: sampleService,
      create: sampleService,
    });
    expect(result).toEqual(sampleService);
  });
});
