import { validateParameterIsNotUndefined } from "../undefined-validation";
import { describe, expect, test } from "@jest/globals";

describe("tests the undefined detection", () => {
  test("tests if a parameter is not undefined", () => {
    const anything = "not undefined!";
    expect(validateParameterIsNotUndefined(anything)).toBeUndefined();
  });

  test("tests if a parameter is undefined", () => {
    const undefinedValue = undefined;
    function validateWrongEmail() {
      validateParameterIsNotUndefined(undefinedValue);
    }

    expect(validateWrongEmail).toThrow(
      new Error(
        `One of the parameters passed is undefined, but it shouldn't be.`,
      ),
    );
  });
});
