import { describe, expect, test, beforeEach } from "@jest/globals";
import { randomUUID } from "crypto";
import { Scheduling } from "../scheduling.entity";

let scheduling: Scheduling;

describe("tests the scheduling domain type", () => {
  beforeEach(() => {
    scheduling = new Scheduling(
      randomUUID(),
      randomUUID(),
      new Date(),
      false,
      true,
      2,
      randomUUID(),
      randomUUID(),
    );
  });

  test("tests if the rating can be set to a number inside range", () => {
    scheduling.setRating(4.2);
    expect(scheduling.rating).toBe(4.2);
  });

  test("tests if the rating can be set to 5", () => {
    scheduling.setRating(5);
    expect(scheduling.rating).toBe(5);
  });

  test("tests if an error is thrown when trying to set the rating to a number outside the range", () => {
    function setBadValue() {
      scheduling.setRating(5.1);
    }
    expect(setBadValue).toThrowError(
      new Error("Rating should be in the range (0, 5]"),
    );
  });

  test("tests if an error is thrown when trying to set the rating to zero", () => {
    function setBadValue() {
      scheduling.setRating(0);
    }
    expect(setBadValue).toThrowError(
      new Error("Rating should be in the range (0, 5]"),
    );
  });
});
