import { randomUUID } from "crypto";
import { validateUUID } from "../uuid-validation";
import { describe, expect, test } from "@jest/globals";

describe("tests the uuid validation", () => {
  test("tests if a parameter is a UUID", () => {
    const uuid = randomUUID();
    expect(validateUUID(uuid)).toBeUndefined();
  });

  test("tests if a parameter is not an uuid", () => {
    const notUUID = "not an uuid!";
    function testUUID() {
      validateUUID(notUUID);
    }

    expect(testUUID).toThrow(new Error(`${notUUID} should be a valid UUID.`));
  });
});
