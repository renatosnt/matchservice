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
import { ServiceProviderProfile } from "../../../../../domain/entities/service-provider-profile.entity";

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
    const req = getMockReq({ params: { serviceId: randomUUID() } });
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
    const req = getMockReq({ params: { serviceId: randomUUID() } });
    const { res } = getMockRes();

    await serviceRouterHandler.getServiceScheduleByIdHandler(req, res);

    expect(res.json).toBeCalledWith(
      expect.objectContaining({ name: "service" }),
    );
  });

  test("tests if user cannot delete a service as a customer", async () => {
    mockUserAdapter.getById.mockReturnValue({ serviceProviderProfileId: null });
    const req = getMockReq({
      params: { serviceId: randomUUID() },
      userData: { key: "value" },
    });
    const { res } = getMockRes();

    await serviceRouterHandler.deleteServiceByIdHandler(req, res);
    expect(res.status).toBeCalledWith(403);
    expect(res.json).toBeCalledWith(
      expect.objectContaining({
        message: "Authenticated user is not a Service Provider.",
      }),
    );
  });

  test("tests if user can delete a service successfully", async () => {
    mockUserAdapter.getById.mockReturnValue({ serviceProviderProfileId: "" });
    mockServiceAdapter.deleteById.mockReturnValue({ name: "service" });
    mockServiceProviderProfileAdapter.getById.mockReturnValue(
      new ServiceProviderProfile(
        randomUUID(),
        randomUUID(),
        "",
        "",
        0,
        [
          "1d5cc17a-4425-48e7-9506-5617082dc518",
          "f59afd5a-7d65-4c02-bce4-4722770f7eaf",
        ],
        [],
      ),
    );
    const req = getMockReq({
      params: { serviceId: "1d5cc17a-4425-48e7-9506-5617082dc518" },
      userData: { key: "value" },
    });
    const { res } = getMockRes();

    await serviceRouterHandler.deleteServiceByIdHandler(req, res);
    expect(mockServiceProviderProfileAdapter.save).toBeCalledWith(
      expect.objectContaining({
        services: ["f59afd5a-7d65-4c02-bce4-4722770f7eaf"],
      }),
    );

    expect(res.json).toBeCalledWith(
      expect.objectContaining({ name: "service" }),
    );
  });

  test("tests if user cannot delete a service by not being its owner", async () => {
    mockUserAdapter.getById.mockReturnValue({ serviceProviderProfileId: "" });
    mockServiceProviderProfileAdapter.getById.mockReturnValue(
      new ServiceProviderProfile(
        randomUUID(),
        randomUUID(),
        "",
        "",
        0,
        [randomUUID()],
        [],
      ),
    );
    const req = getMockReq({
      params: { serviceId: randomUUID() },
      userData: { key: "value" },
    });
    const { res } = getMockRes();

    await serviceRouterHandler.deleteServiceByIdHandler(req, res);
    expect(res.status).toBeCalledWith(403);
    expect(res.json).toBeCalledWith(
      expect.objectContaining({
        message: "Authenticated user does not own this Service.",
      }),
    );
  });

  test("tests if user cannot create a service as a customer", async () => {
    mockUserAdapter.getById.mockReturnValue({ serviceProviderProfileId: null });
    const req = getMockReq({
      userData: { key: "value" },
    });
    const { res } = getMockRes();

    await serviceRouterHandler.createServiceHandler(req, res);
    expect(res.status).toBeCalledWith(403);
    expect(res.json).toBeCalledWith(
      expect.objectContaining({
        message: "Authenticated user is not a Service Provider.",
      }),
    );
  });

  test("tests if user can create a service successfully", async () => {
    mockUserAdapter.getById.mockReturnValue({
      serviceProviderProfileId: randomUUID(),
    });
    mockServiceProviderProfileAdapter.getById.mockReturnValue(
      new ServiceProviderProfile(
        randomUUID(),
        randomUUID(),
        "",
        "",
        0,
        ["f59afd5a-7d65-4c02-bce4-4722770f7eaf"],
        [],
      ),
    );
    const requestBody = {
      title: "service",
      description: "mega description",
      category: "Drawing",
      locationState: "Minas Gerais",
      locationCity: "Belo Horizonte",
    };
    mockServiceAdapter.save.mockReturnValue(requestBody);
    const req = getMockReq({
      userData: { key: "value" },
      body: requestBody,
    });
    const { res } = getMockRes();

    await serviceRouterHandler.createServiceHandler(req, res);
    expect(mockServiceProviderProfileAdapter.save).toBeCalledWith(
      expect.objectContaining({
        services: expect.arrayContaining([
          "f59afd5a-7d65-4c02-bce4-4722770f7eaf",
        ]),
      }),
    );
    expect(mockServiceAdapter.save).toBeCalledWith(
      expect.objectContaining(requestBody),
    );
    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledWith(expect.objectContaining(requestBody));
  });

  test("tests if user cannot patch a service by not being its owner", async () => {
    mockUserAdapter.getById.mockReturnValue({ serviceProviderProfileId: null });
    const req = getMockReq({
      params: { serviceId: randomUUID() },
      userData: { key: "value" },
    });
    const { res } = getMockRes();

    await serviceRouterHandler.patchServiceHandler(req, res);
    expect(res.status).toBeCalledWith(403);
    expect(res.json).toBeCalledWith(
      expect.objectContaining({
        message: "Authenticated user does not own this Service.",
      }),
    );
  });

  test("tests if user can patch a service successfully", async () => {
    mockUserAdapter.getById.mockReturnValue({
      serviceProviderProfileId: "1d5cc17a-4425-48e7-9506-5617082dc518",
    });
    const serviceBody = {
      title: "service",
      description: "mega description",
      category: "Drawing",
      locationState: "Minas Gerais",
      locationCity: "Belo Horizonte",
      creatorProfileId: "1d5cc17a-4425-48e7-9506-5617082dc518",
    };
    mockServiceAdapter.getById.mockReturnValue(serviceBody);

    const requestBody = {
      title: "service (new)",
      locationCity: "São Paulo",
      category: "Art",
    };
    const req = getMockReq({
      params: { serviceId: randomUUID() },
      userData: { key: "value" },
      body: requestBody,
    });
    const { res } = getMockRes();

    const updatedService = {
      title: "service (new)",
      description: "mega description",
      category: "Art",
      locationState: "Minas Gerais",
      locationCity: "São Paulo",
      creatorProfileId: "1d5cc17a-4425-48e7-9506-5617082dc518",
    };
    mockServiceAdapter.save.mockReturnValue(updatedService);

    await serviceRouterHandler.patchServiceHandler(req, res);
    expect(mockServiceAdapter.save).toBeCalledWith(updatedService);
    expect(res.json).toBeCalledWith(expect.objectContaining(updatedService));
  });
});
