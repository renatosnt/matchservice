import { validateEmail } from "../email-validation";
import { describe, expect, test } from "@jest/globals";

describe("tests the email validation", () => {
  test("tests a correct email", () => {
    const sampleEmail = "example@example.com";
    expect(validateEmail(sampleEmail)).toBe(undefined);
  });

  test("tests a incorrect email", () => {
    const sampleEmail = "example@.com";
    function validateWrongEmail() {
      validateEmail(sampleEmail);
    }

    expect(validateWrongEmail).toThrow(
      new Error(`The e-mail ${sampleEmail} is invalid.`),
    );
  });
});
