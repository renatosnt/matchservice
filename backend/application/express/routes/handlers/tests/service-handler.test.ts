import { ServiceRouterHandler } from "../service-handler";
import { describe, expect, test } from "@jest/globals";
import { getMockReq, getMockRes } from "@jest-mock/express";
import { randomUUID } from "crypto";
import {
  mockSchedulingAdapter,
  mockServiceAdapter,
  PROFILE_ADAPTER_PATH,
  SCHEDULING_ADAPTER_PATH,
  SERVICE_ADAPTER_PATH,
  USER_ADAPTER_PATH,
} from "./mocks";

describe("tests service router handler", () => {
  let serviceRouterHandler: ServiceRouterHandler;

  beforeEach(() => {
    serviceRouterHandler = new ServiceRouterHandler(
      new (require(PROFILE_ADAPTER_PATH))(),
      new (require(SCHEDULING_ADAPTER_PATH))(),
      new (require(SERVICE_ADAPTER_PATH))(),
      new (require(USER_ADAPTER_PATH))(),
    );
  });

  test("tests if can get all services", async () => {
    mockServiceAdapter.getAll.mockReturnValue([
      { name: "service", description: "whatever" },
    ]);
    const req = getMockReq();
    const { res } = getMockRes();

    await serviceRouterHandler.getServicesHandler(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith([
      expect.objectContaining({ name: "service", description: "whatever" }),
    ]);
  });

  test("tests if can search for services", async () => {
    mockServiceAdapter.search.mockReturnValue([
      { name: "service", category: "Photography", description: "anything" },
    ]);
    const req = getMockReq({
      body: {
        title: "service",
        category: "Photography",
      },
    });
    const { res } = getMockRes();

    await serviceRouterHandler.searchServicesHandler(req, res);

    expect(res.json).toBeCalledWith([
      expect.objectContaining({
        name: "service",
        category: "Photography",
        description: "anything",
      }),
    ]);
  });

  test("tests if can search for categories", async () => {
    mockServiceAdapter.getUniqueCategories.mockReturnValue([
      "Photography",
      "Technology",
      "Painting",
    ]);
    const req = getMockReq();
    const { res } = getMockRes();

    await serviceRouterHandler.getServiceCategoriesHandler(req, res);

    expect(res.json).toBeCalledWith(["Photography", "Technology", "Painting"]);
  });

  test("tests if can get a service by its ID", async () => {
    mockServiceAdapter.getById.mockReturnValue({
      viewCount: 12,
      name: "service",
    });
    const req = getMockReq({ params: { serviceID: randomUUID() } });
    const { res } = getMockRes();

    await serviceRouterHandler.getServiceByIdHandler(req, res);

    expect(mockServiceAdapter.save).toBeCalled();
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith(
      expect.objectContaining({ viewCount: 13, name: "service" }),
    );
  });

  test("tests if can get a service schedule by its ID", async () => {
    mockSchedulingAdapter.getByServiceId.mockReturnValue({ name: "service" });
    const req = getMockReq({ params: { serviceID: randomUUID() } });
    const { res } = getMockRes();

    await serviceRouterHandler.getServiceScheduleByIdHandler(req, res);

    expect(res.json).toBeCalledWith(
      expect.objectContaining({ name: "service" }),
    );
  });
});
