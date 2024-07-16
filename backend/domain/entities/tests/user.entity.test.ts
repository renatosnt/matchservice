import { describe, expect, test, beforeEach } from "@jest/globals";
import { randomUUID } from "crypto";
import { User } from "../user.entity";

let user: User;

describe("tests the user domain type", () => {
  beforeEach(() => {
    user = new User(
      randomUUID(),
      "george42",
      "George Tables",
      "georgetables42@email.com",
      "supersecurepassword",
      "Customer",
      ["30e337eb-95af-4136-9de8-4a5b0e65d6ed"],
      randomUUID(),
      new Date(),
    );
  });

  test("tests if we can get the scheduled services", () => {
    expect(user.getScheduledServices()).toStrictEqual([
      "30e337eb-95af-4136-9de8-4a5b0e65d6ed",
    ]);
  });

  test("tests if we can add a new schedule", () => {
    const newSchedule = randomUUID();
    user.addSchedule(newSchedule);
    expect(user.getScheduledServices()).toStrictEqual([
      "30e337eb-95af-4136-9de8-4a5b0e65d6ed",
      newSchedule,
    ]);
  });
});
