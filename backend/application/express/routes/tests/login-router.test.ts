import supertest from "supertest";
import { app } from "../../express";

describe("Test the login router", () => {
  test("It should response the GET method", async () => {
    const response = await supertest(app).get("/login/test");
    expect(response.statusCode).toBe(403);
  });
});
