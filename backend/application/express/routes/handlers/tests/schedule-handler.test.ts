import { ServiceRouterHandler } from "../service-handler";
import { describe, expect, test } from "@jest/globals";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { randomUUID } from "crypto";
import {
  mockSchedulingAdapter,
  mockServiceAdapter,
  mockServiceProviderProfileAdapter,
  mockUserAdapter,
  PROFILE_ADAPTER_PATH,
  SCHEDULING_ADAPTER_PATH,
  SERVICE_ADAPTER_PATH,
  USER_ADAPTER_PATH,
} from "./mocks";
import { ScheduleRouterHandler } from "../schedule-handler";
import { Scheduling } from "../../../../../domain/entities/scheduling.entity";
import { User } from "../../../../../domain/entities/user.entity";
import { Service } from "../../../../../domain/entities/service.entity";
import { ServiceProviderProfile } from "../../../../../domain/entities/service-provider-profile.entity";

describe("tests service router handler", () => {
  let serviceRouterHandler: ScheduleRouterHandler;

  beforeEach(() => {
    serviceRouterHandler = new ScheduleRouterHandler(
      new (require(PROFILE_ADAPTER_PATH))(),
      new (require(SCHEDULING_ADAPTER_PATH))(),
      new (require(SERVICE_ADAPTER_PATH))(),
      new (require(USER_ADAPTER_PATH))(),
    );
  });

  test("tests if it can mark schedule as complete", async () => {
    mockSchedulingAdapter.getById.mockReturnValue({ isCompleted: false });
    mockSchedulingAdapter.save.mockReturnValue({ isCompleted: true });
    const req = getMockReq({ params: { scheduleId: randomUUID() } });
    const { res } = getMockRes();

    await serviceRouterHandler.markScheduleAsCompleteHandler(req, res);

    expect(mockSchedulingAdapter.save).toBeCalledWith({ isCompleted: true });
    expect(res.json).toBeCalledWith(
      expect.objectContaining({ isCompleted: true }),
    );
  });

  test("tests if it can mark schedule as canceled", async () => {
    mockSchedulingAdapter.getById.mockReturnValue({ isCanceled: false });
    mockSchedulingAdapter.save.mockReturnValue({ isCanceled: true });
    const req = getMockReq({ params: { scheduleId: randomUUID() } });
    const { res } = getMockRes();

    await serviceRouterHandler.markScheduleAsCanceledHandler(req, res);

    expect(mockSchedulingAdapter.save).toBeCalledWith({ isCanceled: true });
    expect(res.json).toBeCalledWith(
      expect.objectContaining({ isCanceled: true }),
    );
  });

  test("tests if a service provider cannot rate a schedule", async () => {
    mockSchedulingAdapter.save.mockReturnValue({ isCanceled: true });
    const req = getMockReq({
      params: { scheduleId: randomUUID() },
      userData: { type: "ServiceProvider" },
    });
    const { res } = getMockRes();

    await serviceRouterHandler.rateSchedulebyIdHandler(req, res);

    expect(res.status).toBeCalledWith(403);
    expect(res.json).toBeCalledWith(
      expect.objectContaining({
        message: "Authenticated user is not a Customer.",
      }),
    );
  });

  test("tests if a customer rate a schedule successfully", async () => {
    const scheduleId = randomUUID();
    mockSchedulingAdapter.getById.mockReturnValue(
      new Scheduling(
        scheduleId,
        randomUUID(),
        new Date(),
        true,
        false,
        0,
        randomUUID(),
        randomUUID(),
      ),
    );
    const req = getMockReq({
      params: { scheduleId },
      userData: { type: "Customer" },
      body: { rating: 3.87 },
    });
    const { res } = getMockRes();
    mockSchedulingAdapter.save.mockReturnValue({ id: scheduleId, rating: 3 });

    await serviceRouterHandler.rateSchedulebyIdHandler(req, res);

    expect(mockSchedulingAdapter.save).toBeCalledWith(
      expect.objectContaining({ id: scheduleId, rating: 3 }),
    );
    expect(res.json).toBeCalledWith(
      expect.objectContaining({ id: scheduleId, rating: 3 }),
    );
  });

  test("tests if gets a schedule by id", async () => {
    const scheduleId = randomUUID();
    mockSchedulingAdapter.getById.mockReturnValue({ message: "anything" });
    const req = getMockReq({
      params: { scheduleId },
    });
    const { res } = getMockRes();

    await serviceRouterHandler.getSchedulebyIdHandler(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith(
      expect.objectContaining({ message: "anything" }),
    );
  });

  test("tests if throws with bad date", async () => {
    const scheduleId = randomUUID();
    mockSchedulingAdapter.getById.mockReturnValue({
      scheduledDate: new Date().toDateString(),
    });
    const req = getMockReq({
      params: { scheduleId },
      body: { scheduledDate: "2025-02-312" },
    });
    const { res } = getMockRes();

    await serviceRouterHandler.patchSchedulebyIdHandler(req, res);

    expect(res.status).toBeCalledWith(422);
    expect(res.json).toBeCalledWith(
      expect.objectContaining({ message: "Scheduled Date is invalid." }),
    );
  });

  test("tests if it patches the schedule", async () => {
    const scheduleId = randomUUID();
    mockSchedulingAdapter.getById.mockReturnValue({
      scheduledDate: new Date().toDateString(),
    });
    mockSchedulingAdapter.save.mockReturnValue({
      scheduledDate: new Date("2025-02-31"),
    });
    const req = getMockReq({
      params: { scheduleId },
      body: { scheduledDate: "2025-02-31" },
    });
    const { res } = getMockRes();

    await serviceRouterHandler.patchSchedulebyIdHandler(req, res);

    expect(mockSchedulingAdapter.save).toBeCalledWith(
      expect.objectContaining({ scheduledDate: new Date("2025-02-31") }),
    );
    expect(res.json).toBeCalledWith(
      expect.objectContaining({ scheduledDate: new Date("2025-02-31") }),
    );
  });

  test("tests if a service provider cannot create a schedule", async () => {
    mockUserAdapter.getById.mockReturnValue(
      new User(
        randomUUID(),
        "nekoraw",
        "Michel",
        "example@example.com",
        "supersecurepassword",
        "ServiceProvider",
        [],
      ),
    );
    const serviceId = randomUUID();
    const req = getMockReq({
      params: { scheduleId: serviceId },
      body: { scheduledDate: "2025-02-31" },
      userData: { type: "ServiceProvider" },
    });
    const { res } = getMockRes();

    await serviceRouterHandler.createScheduleWithServiceIdHandler(req, res);

    expect(res.status).toBeCalledWith(403);
    expect(res.json).toBeCalledWith(
      expect.objectContaining({
        message: "Authenticated user is not a Customer.",
      }),
    );
  });

  test("tests if a schedule cannot be created with a bad date", async () => {
    const serviceId = randomUUID();
    const userId = randomUUID();
    const creatorProfileId = randomUUID();
    mockUserAdapter.getById.mockReturnValue(
      new User(
        userId,
        "nekoraw",
        "Michel",
        "example@example.com",
        "supersecurepassword",
        "Customer",
        [],
      ),
    );
    mockServiceAdapter.getById.mockReturnValue(
      new Service(
        serviceId,
        "service",
        "very good service",
        12,
        "Art",
        "Minas Gerais",
        "Belo Horizonte",
        creatorProfileId,
        [],
      ),
    );
    mockServiceProviderProfileAdapter.getById.mockReturnValue(
      new ServiceProviderProfile(
        creatorProfileId,
        userId,
        "",
        "",
        0,
        ["f59afd5a-7d65-4c02-bce4-4722770f7eaf"],
        [],
      ),
    );
    const req = getMockReq({
      params: { scheduleId: serviceId },
      body: { scheduledDate: "2025-02-319" },
      userData: { type: "Customer" },
    });
    const { res } = getMockRes();

    await serviceRouterHandler.createScheduleWithServiceIdHandler(req, res);

    expect(res.status).toBeCalledWith(422);
    expect(res.json).toBeCalledWith(
      expect.objectContaining({ message: "Scheduled Date is invalid." }),
    );
  });

  test("tests if a schedule can be created successfully", async () => {
    const serviceId = randomUUID();
    const userId = randomUUID();
    const creatorProfileId = randomUUID();
    mockUserAdapter.getById.mockReturnValue(
      new User(
        userId,
        "nekoraw",
        "Michel",
        "example@example.com",
        "supersecurepassword",
        "Customer",
        [],
      ),
    );
    mockServiceAdapter.getById.mockReturnValue(
      new Service(
        serviceId,
        "service",
        "very good service",
        12,
        "Art",
        "Minas Gerais",
        "Belo Horizonte",
        creatorProfileId,
        [],
      ),
    );
    mockServiceProviderProfileAdapter.getById.mockReturnValue(
      new ServiceProviderProfile(
        creatorProfileId,
        userId,
        "",
        "",
        0,
        ["f59afd5a-7d65-4c02-bce4-4722770f7eaf"],
        [],
      ),
    );
    const req = getMockReq({
      params: { serviceId },
      body: { scheduledDate: "2025-02-31" },
      userData: { type: "Customer", id: userId },
    });
    const { res } = getMockRes();
    const expectedScheduling = {
      serviceId,
      scheduledDate: new Date("2025-02-31"),
      serviceProviderProfileId: creatorProfileId,
      customerId: userId,
    };
    mockSchedulingAdapter.save.mockReturnValue(expectedScheduling);

    await serviceRouterHandler.createScheduleWithServiceIdHandler(req, res);

    expect(mockUserAdapter.getById).toBeCalledWith(userId);
    expect(mockServiceAdapter.getById).toBeCalledWith(serviceId);
    expect(mockServiceProviderProfileAdapter.getById).toBeCalledWith(
      creatorProfileId,
    );
    expect(mockSchedulingAdapter.save).toBeCalledWith(
      expect.objectContaining(expectedScheduling),
    );
    expect(mockUserAdapter.save).toBeCalledWith(
      expect.objectContaining({
        scheduledServices: expect.arrayContaining([expect.any(String)]),
      }),
    );
    expect(mockServiceAdapter.save).toBeCalledWith(
      expect.objectContaining({
        schedule: expect.arrayContaining([expect.any(String)]),
      }),
    );
    expect(mockServiceProviderProfileAdapter.save).toBeCalledWith(
      expect.objectContaining({
        schedule: expect.arrayContaining([expect.any(String)]),
      }),
    );
    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledWith(
      expect.objectContaining(expectedScheduling),
    );
  });
});
