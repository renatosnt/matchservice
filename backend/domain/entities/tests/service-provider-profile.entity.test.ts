import { describe, expect, test, beforeEach } from "@jest/globals";
import { randomUUID } from "crypto";
import { ServiceProviderProfile } from "../service-provider-profile.entity";
import { Scheduling } from "../scheduling.entity";

let serviceProviderProfile: ServiceProviderProfile;

describe("tests the service provider profile domain type", () => {
  beforeEach(() => {
    serviceProviderProfile = new ServiceProviderProfile(
      randomUUID(),
      randomUUID(),
      "11940028922",
      "Photography",
      5,
      ["30e337eb-95af-4136-9de8-4a5b0e65d6ed"],
      ["30e337eb-95af-4136-9de8-4a5b0e65d6ed"],
    );
  });

  test("tests if its possible to  get services", () => {
    expect(serviceProviderProfile.getServices()).toStrictEqual([
      "30e337eb-95af-4136-9de8-4a5b0e65d6ed",
    ]);
  });

  test("tests if its possible to set services", () => {
    const services = [randomUUID(), randomUUID()];
    serviceProviderProfile.setServices(services);
    expect(serviceProviderProfile.getServices()).toStrictEqual(services);
  });

  test("tests if its possible to add a new service", () => {
    const services = [randomUUID(), randomUUID()];
    serviceProviderProfile.setServices(services);
    const newService = randomUUID();
    services.push(newService);
    serviceProviderProfile.addService(newService);
    expect(serviceProviderProfile.getServices()).toStrictEqual(services);
  });

  test("tests if it's possible to get the schedule", () => {
    expect(serviceProviderProfile.getSchedule()).toStrictEqual([
      "30e337eb-95af-4136-9de8-4a5b0e65d6ed",
    ]);
  });

  test("tests if it's possible to add a new schedule", () => {
    const newSchedule = randomUUID();
    serviceProviderProfile.addSchedule(newSchedule);
    expect(serviceProviderProfile.getSchedule()).toStrictEqual([
      "30e337eb-95af-4136-9de8-4a5b0e65d6ed",
      newSchedule,
    ]);
  });

  test("tests if it's calculates the average rating with one schedule", () => {
    const schedule = new Scheduling(
      randomUUID(),
      randomUUID(),
      new Date(),
      true,
      false,
      3.22,
      randomUUID(),
      randomUUID(),
    );
    expect(
      serviceProviderProfile.calculateAndSetAverageRating([schedule]),
    ).toBe(3.22);
  });

  test("tests if it's calculates the average rating with more than one schedule", () => {
    const schedule = new Scheduling(
      randomUUID(),
      randomUUID(),
      new Date(),
      true,
      false,
      3.22,
      randomUUID(),
      randomUUID(),
    );
    const schedule2 = new Scheduling(
      randomUUID(),
      randomUUID(),
      new Date(),
      true,
      false,
      4.77,
      randomUUID(),
      randomUUID(),
    );
    const schedule3 = new Scheduling(
      randomUUID(),
      randomUUID(),
      new Date(),
      true,
      false,
      1.82,
      randomUUID(),
      randomUUID(),
    );
    expect(
      serviceProviderProfile.calculateAndSetAverageRating([
        schedule,
        schedule2,
        schedule3,
      ]),
    ).toBe(3.27);
  });

  test("tests if it's calculates the average rating ignoring incomplete schedules", () => {
    const schedule = new Scheduling(
      randomUUID(),
      randomUUID(),
      new Date(),
      true,
      false,
      3.22,
      randomUUID(),
      randomUUID(),
    );
    const schedule2 = new Scheduling(
      randomUUID(),
      randomUUID(),
      new Date(),
      true,
      false,
      4.77,
      randomUUID(),
      randomUUID(),
    );
    const schedule3 = new Scheduling(
      randomUUID(),
      randomUUID(),
      new Date(),
      false,
      false,
      1.82,
      randomUUID(),
      randomUUID(),
    );
    expect(
      serviceProviderProfile.calculateAndSetAverageRating([
        schedule,
        schedule2,
        schedule3,
      ]),
    ).toBe(3.995);
  });

  test("tests if it's calculates the average of zero schedules correctly", () => {
    expect(serviceProviderProfile.calculateAndSetAverageRating([])).toBe(0);
  });

  test("tests if it's calculates the average rating when all schedules are incomplete", () => {
    const schedule = new Scheduling(
      randomUUID(),
      randomUUID(),
      new Date(),
      false,
      false,
      4.77,
      randomUUID(),
      randomUUID(),
    );
    const schedule2 = new Scheduling(
      randomUUID(),
      randomUUID(),
      new Date(),
      false,
      false,
      1.82,
      randomUUID(),
      randomUUID(),
    );
    expect(
      serviceProviderProfile.calculateAndSetAverageRating([
        schedule,
        schedule2,
      ]),
    ).toBe(0);
  });
});
