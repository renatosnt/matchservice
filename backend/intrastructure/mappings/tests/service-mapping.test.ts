import { describe, expect, test } from "@jest/globals";
import { Service as PrismaService } from "@prisma/client";
import { randomUUID } from "crypto";
import { PrismaServiceMapper } from "../service-mapping";
import { Service } from "../../../domain/entities/service.entity";

describe("tests the service mapping from the domain type to prisma type", () => {
  test("tests if the prisma type is mapped correctly to the domain", () => {
    const curr_date = new Date();

    const data: PrismaService = {
      id: randomUUID(),
      title: "new service!",
      description: "good service i recommend it",
      viewCount: 32,
      category: "Technology",
      locationState: "Minas Gerais",
      locationCity: "Belo Horizonte",
      creatorProfileId: randomUUID(),
      schedule: [randomUUID(), randomUUID()],
      createdAt: curr_date,
      basePrice: "0",
      pictureLinks: [],
    };

    const serviceDomain = PrismaServiceMapper.toDomain(data);

    expect(serviceDomain.id).toBe(data.id);
    expect(serviceDomain.title).toBe(data.title);
    expect(serviceDomain.description).toBe(data.description);
    expect(serviceDomain.viewCount).toBe(data.viewCount);
    expect(serviceDomain.category).toBe(data.category);
    expect(serviceDomain.locationState).toBe(data.locationState);
    expect(serviceDomain.locationCity).toBe(data.locationCity);
    expect(serviceDomain.creatorProfileId).toBe(data.creatorProfileId);
    expect(serviceDomain.getSchedule()).toStrictEqual(data.schedule);
    expect(serviceDomain.createdAt).toBe(data.createdAt);
    expect(serviceDomain.basePrice).toBe(data.basePrice);
    expect(serviceDomain.pictureLinks).toStrictEqual(data.pictureLinks);
  });

  test("tests if the domain type is mapped correctly to prisma type", () => {
    const curr_date = new Date();

    const data = new Service(
      randomUUID(),
      "new service!",
      "good service i recommend it",
      32,
      "Technology",
      "Minas Gerais",
      "Belo Horizonte",
      randomUUID(),
      [randomUUID(), randomUUID()],
      curr_date,
    );

    const servicePrisma = PrismaServiceMapper.toPrisma(data);

    expect(servicePrisma.id).toBe(data.id);
    expect(servicePrisma.title).toBe(data.title);
    expect(servicePrisma.description).toBe(data.description);
    expect(servicePrisma.viewCount).toBe(data.viewCount);
    expect(servicePrisma.category).toBe(data.category);
    expect(servicePrisma.locationState).toBe(data.locationState);
    expect(servicePrisma.locationCity).toBe(data.locationCity);
    expect(servicePrisma.creatorProfileId).toBe(data.creatorProfileId);
    expect(servicePrisma.schedule).toStrictEqual(data.getSchedule());
    expect(servicePrisma.createdAt).toBe(data.createdAt);
    expect(servicePrisma.basePrice).toBe("0");
    expect(servicePrisma.pictureLinks).toStrictEqual([]);
  });

  test("tests if a error is thrown when creating a service without creation date", () => {
    const data = new Service(
      randomUUID(),
      "new service!",
      "good service i recommend it",
      32,
      "Technology",
      "Minas Gerais",
      "Belo Horizonte",
      randomUUID(),
      [randomUUID(), randomUUID()],
    ); // no date field has been passed

    function convertData() {
      PrismaServiceMapper.toPrisma(data);
    }

    expect(convertData).toThrow(
      new Error("Service creation date should be specified."),
    );
  });
});
