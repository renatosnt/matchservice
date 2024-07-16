import { describe, expect, test } from "@jest/globals";
import { User as PrismaUser } from "@prisma/client";
import { randomUUID } from "crypto";
import { PrismaUserMapper } from "../user-mapping";
import { User } from "../../../domain/entities/user.entity";

describe("tests the user mapping from the domain type to prisma type", () => {
  test("tests if the prisma type is mapped correctly to the domain", () => {
    const curr_date = new Date();

    const data: PrismaUser = {
      id: randomUUID(),
      username: "george44",
      realName: "George Silver",
      email: "georgesilver44@emailcompany.com",
      password: "supersecurepassword123",
      type: "Customer",
      scheduledServices: [randomUUID()],
      serviceProviderProfileId: null,
      createdAt: curr_date,
    };

    const userDomain = PrismaUserMapper.toDomain(data);

    expect(userDomain.id).toBe(data.id);
    expect(userDomain.username).toBe(data.username);
    expect(userDomain.realName).toBe(data.realName);
    expect(userDomain.email).toBe(data.email);
    expect(userDomain.password).toBe(data.password);
    expect(userDomain.type).toBe(data.type);
    expect(userDomain.getScheduledServices()).toStrictEqual(
      data.scheduledServices,
    );
    expect(userDomain.serviceProviderProfileId).toBeNull();
    expect(userDomain.createdAt).toBe(data.createdAt);
  });

  test("tests if the domain type is mapped correctly to prisma type", () => {
    const curr_date = new Date();

    const data = new User(
      randomUUID(),
      "george44",
      "George Silver",
      "georgesilver44@emailcompany.com",
      "supersecurepassword123",
      "Customer",
      [randomUUID()],
      null,
      curr_date,
    );

    const userPrisma = PrismaUserMapper.toPrisma(data);

    expect(userPrisma.id).toBe(data.id);
    expect(userPrisma.username).toBe(data.username);
    expect(userPrisma.realName).toBe(data.realName);
    expect(userPrisma.email).toBe(data.email);
    expect(userPrisma.password).toBe(data.password);
    expect(userPrisma.type).toBe(data.type);
    expect(userPrisma.scheduledServices).toStrictEqual(
      data.getScheduledServices(),
    );
    expect(userPrisma.serviceProviderProfileId).toBeNull();
    expect(userPrisma.createdAt).toBe(data.createdAt);
  });

  test("tests if a error is thrown when creating a user without creation date", () => {
    const data = new User(
      randomUUID(),
      "george44",
      "George Silver",
      "georgesilver44@emailcompany.com",
      "supersecurepassword123",
      "Customer",
      [randomUUID()],
      null,
    ); // no date field has been passed

    function convertData() {
      PrismaUserMapper.toPrisma(data);
    }

    expect(convertData).toThrow(
      new Error("User creation date should be specified."),
    );
  });
});
