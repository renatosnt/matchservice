import { describe, expect, test, beforeEach } from "@jest/globals";
import { randomUUID } from "crypto";
import { Service } from "../service.entity";

let service: Service;

describe("tests the service domain type", () => {
  beforeEach(() => {
    service = new Service(
      randomUUID(),
      "new service!!!",
      "very godd and with warranty",
      0,
      "Technology",
      "Minas Gerais",
      "Belo Horizonte",
      randomUUID(),
      ["30e337eb-95af-4136-9de8-4a5b0e65d6ed"],
      new Date(),
    );
  });

  test("tests if we can get the schedule", () => {
    expect(service.getSchedule()).toStrictEqual([
      "30e337eb-95af-4136-9de8-4a5b0e65d6ed",
    ]);
  });

  test("tests if we can add a new schedule", () => {
    const newSchedule = randomUUID();
    expect(service.addSchedule(newSchedule)).toBe(service);
    expect(service.getSchedule()).toStrictEqual([
      "30e337eb-95af-4136-9de8-4a5b0e65d6ed",
      newSchedule,
    ]);
  });
});
