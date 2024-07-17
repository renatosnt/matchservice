import { randomUUID } from "crypto";
import { SchedulingDatabase } from "../scheduling-database";
import { prismaMock } from "./prisma-mock";
import { PrismaSchedulingMapper } from "../mappings/scheduling-mapping";
import { Scheduling } from "../../domain/entities/scheduling.entity";

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

describe("UserAdapter", () => {
  let schedulingDatabase: SchedulingDatabase;

  beforeEach(() => {
    schedulingDatabase = new SchedulingDatabase(prismaMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should get scheduling by id", async () => {
    const schedulingId = randomUUID();
    prismaMock.scheduling.findFirst.mockReturnValue(sampleScheduling as any);

    const result = await schedulingDatabase.getById(schedulingId);

    expect(prismaMock.scheduling.findFirst).toHaveBeenCalledWith({
      where: { id: schedulingId },
    });
    expect(result).toEqual(sampleScheduling);
  });

  test("should delete scheduling by id", async () => {
    const schedulingId = randomUUID();
    prismaMock.scheduling.delete.mockReturnValue(sampleScheduling as any);

    const result = await schedulingDatabase.deleteById(schedulingId);

    expect(prismaMock.scheduling.delete).toHaveBeenCalledWith({
      where: { id: schedulingId },
    });
    expect(result).toEqual(sampleScheduling);
  });

  test("should get scheduling by service provider id", async () => {
    const serviceProviderId = randomUUID();
    prismaMock.scheduling.findMany.mockReturnValue([sampleScheduling] as any);

    const result =
      await schedulingDatabase.getByServiceProviderProfileId(serviceProviderId);

    expect(prismaMock.scheduling.findMany).toHaveBeenCalledWith({
      where: { serviceProviderProfileId: serviceProviderId },
    });
    expect(result).toEqual([sampleScheduling]);
  });

  test("should get scheduling by customer id", async () => {
    const customerId = randomUUID();
    prismaMock.scheduling.findMany.mockReturnValue([sampleScheduling] as any);

    const result = await schedulingDatabase.getByCustomerId(customerId);

    expect(prismaMock.scheduling.findMany).toHaveBeenCalledWith({
      where: { customerId },
    });
    expect(result).toEqual([sampleScheduling]);
  });

  test("should get scheduling by service id", async () => {
    const serviceId = randomUUID();
    prismaMock.scheduling.findMany.mockReturnValue([sampleScheduling] as any);

    const result = await schedulingDatabase.getByServiceId(serviceId);

    expect(prismaMock.scheduling.findMany).toHaveBeenCalledWith({
      where: { serviceId },
    });
    expect(result).toEqual([sampleScheduling]);
  });

  test("should save the scheduling", async () => {
    prismaMock.scheduling.upsert.mockReturnValue(sampleScheduling as any);

    const result = await schedulingDatabase.save(
      PrismaSchedulingMapper.toDomain(sampleScheduling),
    );

    expect(prismaMock.scheduling.upsert).toHaveBeenCalledWith({
      where: { id: SCHEDULING_ID },
      update: sampleScheduling,
      create: sampleScheduling,
    });
    expect(result).toEqual(sampleScheduling);
  });
});
