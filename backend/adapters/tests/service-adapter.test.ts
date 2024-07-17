import { randomUUID } from "crypto";
import { Service } from "../../domain/entities/service.entity";
import { IServicePort } from "../../domain/ports/service-port";
import { Scheduling } from "../../domain/entities/scheduling.entity";
import { ServiceAdapter } from "../../adapters/service-adapter";

// Create a mock implementation of IServicePort
const mockServiceRepository: IServicePort = {
  getAll: jest.fn(),
  getById: jest.fn(),
  deleteById: jest.fn(),
  getServiceSchedulingById: jest.fn(),
  getByServiceProviderId: jest.fn(),
  getUniqueCategories: jest.fn(),
  search: jest.fn(),
  save: jest.fn(),
};

describe("ServiceAdapter", () => {
  let serviceAdapter: ServiceAdapter;

  beforeEach(() => {
    serviceAdapter = new ServiceAdapter(mockServiceRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should call getAll on the service repository", async () => {
    const expectedServices: Service[] = [
      new Service(
        randomUUID(),
        "Service 1",
        "Description 1",
        10,
        "Category 1",
        "State 1",
        "City 1",
        randomUUID(),
        [randomUUID(), randomUUID()],
        new Date(),
      ),
      new Service(
        randomUUID(),
        "Service 2",
        "Description 2",
        20,
        "Category 2",
        "State 2",
        "City 2",
        randomUUID(),
        [randomUUID()],
        new Date(),
      ),
    ];
    (mockServiceRepository.getAll as jest.Mock).mockResolvedValue(
      expectedServices,
    );

    const result = await serviceAdapter.getAll();

    expect(mockServiceRepository.getAll).toHaveBeenCalled();
    expect(result).toEqual(expectedServices);
  });

  test("should call getById on the service repository", async () => {
    const serviceId = randomUUID();
    const expectedServices: Service[] = [
      new Service(
        randomUUID(),
        "Service 1",
        "Description 1",
        10,
        "Category 1",
        "State 1",
        "City 1",
        randomUUID(),
        [randomUUID(), randomUUID()],
        new Date(),
      ),
      new Service(
        randomUUID(),
        "Service 2",
        "Description 2",
        20,
        "Category 2",
        "State 2",
        "City 2",
        randomUUID(),
        [randomUUID()],
        new Date(),
      ),
    ];
    (mockServiceRepository.getById as jest.Mock).mockResolvedValue(
      expectedServices,
    );

    const result = await serviceAdapter.getById(serviceId);

    expect(mockServiceRepository.getById).toHaveBeenCalledWith(serviceId);
    expect(result).toEqual(expectedServices);
  });

  test("should call deleteById on the service repository", async () => {
    const serviceId = randomUUID();
    const expectedServices: Service[] = [
      new Service(
        randomUUID(),
        "Service 1",
        "Description 1",
        10,
        "Category 1",
        "State 1",
        "City 1",
        randomUUID(),
        [randomUUID(), randomUUID()],
        new Date(),
      ),
      new Service(
        randomUUID(),
        "Service 2",
        "Description 2",
        20,
        "Category 2",
        "State 2",
        "City 2",
        randomUUID(),
        [randomUUID()],
        new Date(),
      ),
    ];
    (mockServiceRepository.deleteById as jest.Mock).mockResolvedValue(
      expectedServices,
    );

    const result = await serviceAdapter.deleteById(serviceId);

    expect(mockServiceRepository.deleteById).toHaveBeenCalledWith(serviceId);
    expect(result).toEqual(expectedServices);
  });

  test("should call getServiceSchedulingById on the service repository", async () => {
    const serviceId = randomUUID();
    const expectedServices: Service[] = [
      new Service(
        randomUUID(),
        "Service 1",
        "Description 1",
        10,
        "Category 1",
        "State 1",
        "City 1",
        randomUUID(),
        [randomUUID(), randomUUID()],
        new Date(),
      ),
      new Service(
        randomUUID(),
        "Service 2",
        "Description 2",
        20,
        "Category 2",
        "State 2",
        "City 2",
        randomUUID(),
        [randomUUID()],
        new Date(),
      ),
    ];
    (
      mockServiceRepository.getServiceSchedulingById as jest.Mock
    ).mockResolvedValue(expectedServices);

    const result = await serviceAdapter.getServiceSchedulingById(serviceId);

    expect(mockServiceRepository.getServiceSchedulingById).toHaveBeenCalledWith(
      serviceId,
    );
    expect(result).toEqual(expectedServices);
  });

  test("should call getByServiceProviderId on the service repository", async () => {
    const serviceProviderId = randomUUID();
    const expectedServices: Service[] = [
      new Service(
        randomUUID(),
        "Service 1",
        "Description 1",
        10,
        "Category 1",
        "State 1",
        "City 1",
        randomUUID(),
        [randomUUID(), randomUUID()],
        new Date(),
      ),
      new Service(
        randomUUID(),
        "Service 2",
        "Description 2",
        20,
        "Category 2",
        "State 2",
        "City 2",
        randomUUID(),
        [randomUUID()],
        new Date(),
      ),
    ];
    (
      mockServiceRepository.getByServiceProviderId as jest.Mock
    ).mockResolvedValue(expectedServices);

    const result =
      await serviceAdapter.getByServiceProviderId(serviceProviderId);

    expect(mockServiceRepository.getByServiceProviderId).toHaveBeenCalledWith(
      serviceProviderId,
    );
    expect(result).toEqual(expectedServices);
  });

  test("should call getUniqueCategories on the service repository", async () => {
    const expectedCategories: string[] = ["Category 1", "Category 2"];
    (mockServiceRepository.getUniqueCategories as jest.Mock).mockResolvedValue(
      expectedCategories,
    );

    const result = await serviceAdapter.getUniqueCategories();

    expect(mockServiceRepository.getUniqueCategories).toHaveBeenCalled();
    expect(result).toEqual(expectedCategories);
  });

  test("should call search on the service repository with the provided parameters", async () => {
    const title = "Service Title";
    const description = "Service Description";
    const category = "Service Category";
    const creatorProfileId = randomUUID();

    const expectedServices: Service[] = [
      new Service(
        randomUUID(),
        title,
        description,
        10,
        category,
        "State 1",
        "City 1",
        creatorProfileId,
        [randomUUID(), randomUUID()],
        new Date(),
      ),
      new Service(
        randomUUID(),
        "Another Service",
        "Another Description",
        20,
        category,
        "State 2",
        "City 2",
        randomUUID(),
        [randomUUID()],
        new Date(),
      ),
    ];

    (mockServiceRepository.search as jest.Mock).mockResolvedValue(
      expectedServices,
    );

    const result = await serviceAdapter.search(
      title,
      description,
      category,
      creatorProfileId,
    );

    expect(mockServiceRepository.search).toHaveBeenCalledWith(
      title,
      description,
      category,
      creatorProfileId,
    );
    expect(result).toEqual(expectedServices);
  });

  test("should call save on the service repository with the provided service", async () => {
    const serviceToSave: Service = new Service(
      randomUUID(),
      "Service to Save",
      "Description of Service to Save",
      0,
      "Category",
      "State",
      "City",
      randomUUID(),
      [randomUUID(), randomUUID()],
      new Date(),
    );

    const expectedSavedService: Service = new Service(
      serviceToSave.id,
      serviceToSave.title,
      serviceToSave.description,
      serviceToSave.viewCount,
      serviceToSave.category,
      serviceToSave.locationState,
      serviceToSave.locationCity,
      serviceToSave.creatorProfileId,
      serviceToSave.getSchedule(),
      serviceToSave.createdAt,
    );

    (mockServiceRepository.save as jest.Mock).mockResolvedValue(
      expectedSavedService,
    );

    const result = await serviceAdapter.save(serviceToSave);

    expect(mockServiceRepository.save).toHaveBeenCalledWith(serviceToSave);
    expect(result).toEqual(expectedSavedService);
  });
});
