import { describe, expect, test } from "@jest/globals";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { randomUUID } from "crypto";
import {
  mockSchedulingAdapter,
  mockServiceProviderProfileAdapter,
  mockUserAdapter,
  PROFILE_ADAPTER_PATH,
  SCHEDULING_ADAPTER_PATH,
  USER_ADAPTER_PATH,
} from "./mocks";
import { ServiceProviderProfile } from "../../../../../domain/entities/service-provider-profile.entity";
import { ProfileRouterHandler } from "../profile-handler";

describe("tests service router handler", () => {
  let profileRouterHandler: ProfileRouterHandler;

  beforeEach(() => {
    profileRouterHandler = new ProfileRouterHandler(
      new (require(PROFILE_ADAPTER_PATH))(),
      new (require(SCHEDULING_ADAPTER_PATH))(),
      new (require(USER_ADAPTER_PATH))(),
    );
  });

  test("tests if it can get profile by id", async () => {
    mockServiceProviderProfileAdapter.getById.mockReturnValue({
      sample: "profile",
    });
    const req = getMockReq({ params: { profileId: randomUUID() } });
    const { res } = getMockRes();

    await profileRouterHandler.getProfileByIdHandler(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith(
      expect.objectContaining({ sample: "profile" }),
    );
  });

  test("tests if it handles a exception when getting a profile by id", async () => {
    mockServiceProviderProfileAdapter.getById.mockImplementation(() => {
      throw new Error("Sample Error");
    });
    const req = getMockReq({ params: { profileId: randomUUID() } });
    const { res } = getMockRes();

    await profileRouterHandler.getProfileByIdHandler(req, res);

    expect(res.status).toBeCalledWith(500);
    expect(res.json).toBeCalledWith(
      expect.objectContaining({ message: "Sample Error" }),
    );
  });

  test("tests if it can get profile rating by id", async () => {
    const profileId = randomUUID();
    mockServiceProviderProfileAdapter.getById.mockReturnValue(
      new ServiceProviderProfile(profileId, randomUUID(), "", "", 3.88, [], []),
    );
    mockSchedulingAdapter.getByServiceProviderProfileId.mockReturnValue([
      {
        isCompleted: true,
        rating: 3,
      },
      {
        isCompleted: false,
        rating: 4,
      },
      {
        isCompleted: true,
        rating: 5,
      },
    ]);
    const req = getMockReq({ params: { profileId } });
    const { res } = getMockRes();

    await profileRouterHandler.getProfileRatingByIdHandler(req, res);

    expect(mockServiceProviderProfileAdapter.save).toBeCalledWith(
      expect.objectContaining({ averageRating: 4 }),
    );
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith(4);
  });

  test("tests if it handles a exception when getting a profile rating by id", async () => {
    mockServiceProviderProfileAdapter.getById.mockImplementation(() => {
      throw new Error("Sample Error");
    });
    const req = getMockReq({ params: { profileId: randomUUID() } });
    const { res } = getMockRes();

    await profileRouterHandler.getProfileRatingByIdHandler(req, res);

    expect(res.status).toBeCalledWith(500);
    expect(res.json).toBeCalledWith(
      expect.objectContaining({ message: "Sample Error" }),
    );
  });

  test("tests if it can get profile schedule by id", async () => {
    const profileId = randomUUID();
    const schedule = [
      {
        isCompleted: true,
        rating: 3,
      },
      {
        isCompleted: false,
        rating: 4,
      },
      {
        isCompleted: true,
        rating: 5,
      },
    ];
    mockSchedulingAdapter.getByServiceProviderProfileId.mockReturnValue(
      schedule,
    );
    const req = getMockReq({ params: { profileId } });
    const { res } = getMockRes();

    await profileRouterHandler.getProfileScheduleByIdHandler(req, res);

    expect(mockSchedulingAdapter.getByServiceProviderProfileId).toBeCalledWith(
      profileId,
    );
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith(schedule);
  });

  test("tests if it handles a exception when getting a profile schedule by id", async () => {
    mockSchedulingAdapter.getByServiceProviderProfileId.mockImplementation(
      () => {
        throw new Error("Sample Error");
      },
    );
    const req = getMockReq({ params: { profileId: randomUUID() } });
    const { res } = getMockRes();

    await profileRouterHandler.getProfileScheduleByIdHandler(req, res);

    expect(res.status).toBeCalledWith(500);
    expect(res.json).toBeCalledWith(
      expect.objectContaining({ message: "Sample Error" }),
    );
  });

  test("tests if it cannot patch a profile by id if its not a service provider", async () => {
    const profileId = randomUUID();
    const userId = randomUUID();
    mockUserAdapter.getById.mockReturnValue({ type: "Customer" });
    const req = getMockReq({ params: { profileId }, userData: { id: userId } });
    const { res } = getMockRes();

    await profileRouterHandler.patchProfileByIdHandler(req, res);

    expect(mockUserAdapter.getById).toBeCalledWith(userId);
    expect(res.status).toBeCalledWith(403);
    expect(res.json).toBeCalledWith({
      message: "Authenticated user is not a Service Provider.",
    });
  });

  test("tests if it cannot patch a profile by id if it does not own the profile", async () => {
    const profileId = randomUUID();
    const userId = randomUUID();
    mockUserAdapter.getById.mockReturnValue({
      type: "ServiceProvider",
      serviceProviderProfileId: "random string lol",
    });
    const req = getMockReq({ params: { profileId }, userData: { id: userId } });
    const { res } = getMockRes();

    await profileRouterHandler.patchProfileByIdHandler(req, res);

    expect(mockUserAdapter.getById).toBeCalledWith(userId);
    expect(res.status).toBeCalledWith(403);
    expect(res.json).toBeCalledWith({
      message: "Authenticated user does not own this Profile.",
    });
  });

  test("tests if it can patch a profile by id successfully", async () => {
    const profileId = randomUUID();
    const userId = randomUUID();
    mockUserAdapter.getById.mockReturnValue({
      type: "ServiceProvider",
      serviceProviderProfileId: profileId,
    });
    mockServiceProviderProfileAdapter.getById.mockReturnValue({
      telephoneNumber: "654321",
      specialty: "Technology",
    });
    mockServiceProviderProfileAdapter.save.mockReturnValue({
      telephoneNumber: "654321",
      specialty: "Art",
    });
    const req = getMockReq({
      params: { profileId },
      userData: { id: userId },
      body: { specialty: "Art" },
    });
    const { res } = getMockRes();

    await profileRouterHandler.patchProfileByIdHandler(req, res);

    expect(mockUserAdapter.getById).toBeCalledWith(userId);
    expect(mockServiceProviderProfileAdapter.getById).toBeCalledWith(profileId);
    expect(mockServiceProviderProfileAdapter.save).toBeCalledWith(
      expect.objectContaining({ specialty: "Art" }),
    );
    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledWith(
      expect.objectContaining({ specialty: "Art" }),
    );
  });

  test("tests if it cannot create a profile if its not a service provider", async () => {
    const profileId = randomUUID();
    const userId = randomUUID();
    mockUserAdapter.getById.mockReturnValue({ type: "Customer" });
    const req = getMockReq({ params: { profileId }, userData: { id: userId } });
    const { res } = getMockRes();

    await profileRouterHandler.createProfileHandler(req, res);

    expect(mockUserAdapter.getById).toBeCalledWith(userId);
    expect(res.status).toBeCalledWith(403);
    expect(res.json).toBeCalledWith({
      message: "Authenticated user is not a Service Provider.",
    });
  });

  test("tests if it can create a profile successfully", async () => {
    const profileId = randomUUID();
    const userId = randomUUID();
    mockUserAdapter.getById.mockReturnValue({
      type: "ServiceProvider",
      serviceProviderProfileId: profileId,
    });
    mockServiceProviderProfileAdapter.save.mockReturnValue({
      telephoneNumber: "123456",
      specialty: "Art",
      userId: userId,
    });
    const req = getMockReq({
      userData: { id: userId },
      body: { telephoneNumber: "123456", specialty: "Art" },
    });
    const { res } = getMockRes();

    await profileRouterHandler.createProfileHandler(req, res);

    const expectedReturn = {
      telephoneNumber: "123456",
      specialty: "Art",
      id: expect.any(String),
      userId: userId,
    };

    expect(mockUserAdapter.getById).toBeCalledWith(userId);
    expect(mockServiceProviderProfileAdapter.save).toBeCalledWith(
      expect.objectContaining(expectedReturn),
    );
    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledWith(
      expect.objectContaining({
        telephoneNumber: "123456",
        specialty: "Art",
        userId: userId,
      }),
    );
  });
});
