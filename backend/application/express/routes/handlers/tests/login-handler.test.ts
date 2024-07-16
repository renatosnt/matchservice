import { LoginRouterHandler } from "../login-handler";
import { describe, expect, test } from "@jest/globals";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { randomUUID } from "crypto";
import { mockUserAdapter } from "./mocks";

describe("tests login router handler", () => {
  let loginRouterHandler: LoginRouterHandler;

  beforeEach(() => {
    loginRouterHandler = new LoginRouterHandler(
      new (require("../../../../../adapters/user-adapter"))(),
    );
  });

  test("tests a login with wrong password", async () => {
    mockUserAdapter.getByEmail.mockReturnValue({ password: "wrongpassword" });

    const request = getMockReq({
      body: { email: "whatever@example.com", password: "correct password" },
    });
    const { res } = getMockRes();
    await loginRouterHandler.LoginRootHandler(request, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: `Wrong username or password.`,
    });
  });

  test("tests a successful login", async () => {
    const uid = randomUUID();
    mockUserAdapter.getByEmail.mockReturnValue({
      id: uid,
      password: "password",
      type: "Customer",
      username: "Nekoraw",
      realName: "Michel",
    });

    const request = getMockReq({
      body: { email: "whatever@example.com", password: "password" },
    });
    const { res } = getMockRes();
    await loginRouterHandler.LoginRootHandler(request, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        id: uid,
        realName: "Michel",
        type: "Customer",
        username: "Nekoraw",
      }),
    );
  });

  test("tests a data fetch existing token", async () => {
    const request = getMockReq({ userData: { key: "value" } });
    const { res } = getMockRes();
    await loginRouterHandler.LoginTestHandler(request, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ key: "value" });
  });
});
