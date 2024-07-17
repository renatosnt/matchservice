import { ServiceRouterHandler } from "../service-handler";
import { describe, expect, test } from "@jest/globals";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { randomUUID } from "crypto";
import {
  mockSchedulingAdapter,
  mockUserAdapter,
  SCHEDULING_ADAPTER_PATH,
  USER_ADAPTER_PATH,
} from "./mocks";
import { ScheduleRouterHandler } from "../schedule-handler";
import { Scheduling } from "../../../../../domain/entities/scheduling.entity";
import { User } from "../../../../../domain/entities/user.entity";
import { Service } from "../../../../../domain/entities/service.entity";
import { ServiceProviderProfile } from "../../../../../domain/entities/service-provider-profile.entity";
import { UserRouterHandler } from "../user-handler";

describe("tests service router handler", () => {
  let userRouterHandler: UserRouterHandler;

  beforeEach(() => {
    userRouterHandler = new UserRouterHandler(
      new (require(SCHEDULING_ADAPTER_PATH))(),
      new (require(USER_ADAPTER_PATH))(),
    );
  });

  test("tests if it can get self user", async () => {
    const userId = randomUUID();
    mockUserAdapter.getById.mockReturnValue({ message: "anything" });
    const req = getMockReq({
      userData: { id: userId },
    });
    const { res } = getMockRes();

    await userRouterHandler.getSelfUserHandler(req, res);

    expect(mockUserAdapter.getById).toBeCalledWith(userId);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith(expect.objectContaining({ id: userId }));
  });

  test("tests if it can get user by id", async () => {
    const userId = randomUUID();
    mockUserAdapter.getById.mockReturnValue({
      username: "nekoraw",
      password: "password",
    });
    const req = getMockReq({
      userData: { id: userId },
      params: { userId: userId },
    });
    const { res } = getMockRes();

    await userRouterHandler.getUserByIdHandler(req, res);

    expect(mockUserAdapter.getById).toBeCalledWith(userId);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ username: "nekoraw" });
  });

  test("tests if it can get user schedule by id", async () => {
    const userId = randomUUID();
    mockSchedulingAdapter.getByCustomerId.mockReturnValue([
      { username: "nekoraw" },
    ]);
    const req = getMockReq({
      userData: { id: userId },
      params: { userId: userId },
    });
    const { res } = getMockRes();

    await userRouterHandler.getUserScheduleByIdHandler(req, res);

    expect(mockSchedulingAdapter.getByCustomerId).toBeCalledWith(userId);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith([
      expect.objectContaining({ username: "nekoraw" }),
    ]);
  });

  test("tests if it can register user", async () => {
    const userData = {
      username: "Nekoraw",
      realName: "Michel",
      email: "nekoraw@email.com",
      password: "securepassword",
      type: "Customer",
    };
    mockUserAdapter.save.mockReturnValue([userData]);
    const req = getMockReq({
      body: userData,
    });
    const { res } = getMockRes();

    await userRouterHandler.registerUserHandler(req, res);

    expect(mockUserAdapter.save).toBeCalledWith(
      expect.objectContaining(userData),
    );
    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledWith([expect.objectContaining(userData)]);
  });

  test("tests if it can patch user", async () => {
    const userId = randomUUID();
    const userData = {
      username: "Nekoraw",
      email: "nekoraw@email.com",
    };
    mockUserAdapter.getById.mockReturnValue({
      username: "george",
      email: "george@email.com",
      password: "supersecurepassword",
    });
    const modifiedData = {
      username: "Nekoraw",
      email: "nekoraw@email.com",
      password: "supersecurepassword",
    };
    mockUserAdapter.save.mockReturnValue(modifiedData);
    const req = getMockReq({
      userData: { id: userId },
      params: { userId: userId },
      body: userData,
    });
    const { res } = getMockRes();

    await userRouterHandler.patchUserByIdHandler(req, res);

    expect(mockUserAdapter.save).toBeCalledWith(modifiedData);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith(expect.objectContaining(modifiedData));
  });
});
