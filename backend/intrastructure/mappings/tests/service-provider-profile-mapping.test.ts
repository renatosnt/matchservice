import { describe, expect, test } from "@jest/globals";
import { ServiceProviderProfile as PrismaServiceProviderProfile } from "@prisma/client";
import { randomUUID } from "crypto";
import { PrismaServiceProviderProfileMapper } from "../service-provider-profile-mapping";
import { ServiceProviderProfile } from "../../../domain/entities/service-provider-profile.entity";

describe("tests the service provider profile mapping from the domain type to prisma type", () => {
  test("tests if the prisma type is mapped correctly to the domain", () => {
    const data: PrismaServiceProviderProfile = {
      id: randomUUID(),
      userId: randomUUID(),
      telephoneNumber: "11940028922",
      specialty: "Technology",
      averageRating: 4.11,
      services: [randomUUID(), randomUUID()],
      schedule: [randomUUID(), randomUUID()],
    };

    const serviceproviderprofileDomain =
      PrismaServiceProviderProfileMapper.toDomain(data);

    expect(serviceproviderprofileDomain.id).toBe(data.id);
    expect(serviceproviderprofileDomain.userId).toBe(data.userId);
    expect(serviceproviderprofileDomain.telephoneNumber).toBe(
      data.telephoneNumber,
    );
    expect(serviceproviderprofileDomain.specialty).toBe(data.specialty);
    expect(serviceproviderprofileDomain.averageRating).toBe(data.averageRating);
    expect(serviceproviderprofileDomain.getServices()).toStrictEqual(
      data.services,
    );
    expect(serviceproviderprofileDomain.getSchedule()).toStrictEqual(
      data.schedule,
    );
  });

  test("tests if the domain type is mapped correctly to prisma type", () => {
    const data = new ServiceProviderProfile(
      randomUUID(),
      randomUUID(),
      "11940028922",
      "Technology",
      4.11,
      [randomUUID(), randomUUID()],
      [randomUUID(), randomUUID()],
    );

    const serviceproviderprofileDomain =
      PrismaServiceProviderProfileMapper.toPrisma(data);

    expect(serviceproviderprofileDomain.id).toBe(data.id);
    expect(serviceproviderprofileDomain.userId).toBe(data.userId);
    expect(serviceproviderprofileDomain.telephoneNumber).toBe(
      data.telephoneNumber,
    );
    expect(serviceproviderprofileDomain.specialty).toBe(data.specialty);
    expect(serviceproviderprofileDomain.averageRating).toBe(data.averageRating);
    expect(serviceproviderprofileDomain.services).toStrictEqual(
      data.getServices(),
    );
    expect(serviceproviderprofileDomain.schedule).toStrictEqual(
      data.getSchedule(),
    );
  });
});
