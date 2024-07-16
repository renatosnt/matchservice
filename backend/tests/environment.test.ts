import { getSecretKey, getBackendPort } from "../environment";

describe("tests the environment variables", () => {
  test("tests if can get the secret if it's set", () => {
    process.env.SECRET_KEY = "supersecretkey";
    expect(getSecretKey()).toBe(process.env.SECRET_KEY);
  });

  test("tests if throws an error if the secret key is not set", () => {
    delete process.env.SECRET_KEY;
    expect(getSecretKey).toThrowError(
      new Error("SECRET_KEY environment variable is not set."),
    );
  });

  test("tests if can get the backend port if it's set", () => {
    process.env.BACKEND_PORT = "2811";
    expect(getBackendPort()).toBe(process.env.BACKEND_PORT);
  });

  test("tests if throws an error if the backend port is not set", () => {
    delete process.env.BACKEND_PORT;
    expect(getBackendPort).toThrowError(
      new Error("BACKEND_PORT environment variable is not set."),
    );
  });
});
