import { describe, expect, test } from "@jest/globals";
import { Scheduling as PrismaScheduling } from "@prisma/client";
import { randomUUID } from "crypto";
import { PrismaSchedulingMapper } from "../scheduling-mapping";
import { Scheduling } from "../../../domain/entities/scheduling.entity";

describe("tests the scheduling mapping from the domain type to prisma type", () => {
  test("tests if the prisma type is mapped correctly to the domain", () => {
    const curr_date = new Date();

    const data: PrismaScheduling = {
      id: randomUUID(),
      serviceId: randomUUID(),
      scheduledDate: curr_date,
      isCompleted: true,
      isCanceled: false,
      rating: 3.88,
      serviceProviderProfileId: randomUUID(),
      customerId: randomUUID(),
    };

    const schedulingDomain = PrismaSchedulingMapper.toDomain(data);

    expect(schedulingDomain.id).toBe(data.id);
    expect(schedulingDomain.serviceId).toBe(data.serviceId);
    expect(schedulingDomain.scheduledDate).toBe(data.scheduledDate);
    expect(schedulingDomain.isCompleted).toBe(data.isCompleted);
    expect(schedulingDomain.isCanceled).toBe(data.isCanceled);
    expect(schedulingDomain.rating).toBe(data.rating);
    expect(schedulingDomain.serviceProviderProfileId).toBe(
      data.serviceProviderProfileId,
    );
    expect(schedulingDomain.customerId).toBe(data.customerId);
  });

  test("tests if the domain type is mapped correctly to prisma type", () => {
    const curr_date = new Date();

    const data = new Scheduling(
      randomUUID(),
      randomUUID(),
      curr_date,
      true,
      false,
      3.88,
      randomUUID(),
      randomUUID(),
    );

    const schedulingPrisma = PrismaSchedulingMapper.toPrisma(data);

    expect(schedulingPrisma.id).toBe(data.id);
    expect(schedulingPrisma.serviceId).toBe(data.serviceId);
    expect(schedulingPrisma.scheduledDate).toBe(data.scheduledDate);
    expect(schedulingPrisma.isCompleted).toBe(data.isCompleted);
    expect(schedulingPrisma.isCanceled).toBe(data.isCanceled);
    expect(schedulingPrisma.rating).toBe(data.rating);
    expect(schedulingPrisma.serviceProviderProfileId).toBe(
      data.serviceProviderProfileId,
    );
    expect(schedulingPrisma.customerId).toBe(data.customerId);
  });
});
