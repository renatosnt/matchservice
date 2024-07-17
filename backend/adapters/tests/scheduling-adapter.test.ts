import { randomUUID } from "crypto";
import { Scheduling } from "../../domain/entities/scheduling.entity";
import { ISchedulingPort } from "../../domain/ports/scheduling-port";
import { SchedulingAdapter } from "../scheduling-adapter";

// Create a mock implementation of ISchedulingPort
const mockSchedulingRepository: ISchedulingPort = {
  getById: jest.fn(),
  deleteById: jest.fn(),
  getByServiceProviderProfileId: jest.fn(),
  getByCustomerId: jest.fn(),
  getByServiceId: jest.fn(),
  save: jest.fn(),
};

describe("SchedulingAdapter", () => {
  let schedulingAdapter: SchedulingAdapter;

  beforeEach(() => {
    schedulingAdapter = new SchedulingAdapter(mockSchedulingRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should call getById on the scheduling repository", async () => {
    const schedulingId = randomUUID();
    const expectedScheduling: Scheduling = new Scheduling(
      schedulingId,
      randomUUID(),
      new Date(),
      false,
      false,
      0,
      "provider123",
      randomUUID()
    );
    (mockSchedulingRepository.getById as jest.Mock).mockResolvedValue(expectedScheduling);

    const result = await schedulingAdapter.getById(schedulingId);

    expect(mockSchedulingRepository.getById).toHaveBeenCalledWith(schedulingId);
    expect(result).toEqual(expectedScheduling);
  });

  test("should call deleteById on the scheduling repository", async () => {
    const schedulingId = randomUUID();
    const expectedScheduling: Scheduling = new Scheduling(
      schedulingId,
      randomUUID(),
      new Date(),
      false,
      false,
      0,
      "provider123",
      randomUUID()
    );
    (mockSchedulingRepository.deleteById as jest.Mock).mockResolvedValue(expectedScheduling);

    const result = await schedulingAdapter.deleteById(schedulingId);

    expect(mockSchedulingRepository.deleteById).toHaveBeenCalledWith(schedulingId);
    expect(result).toEqual(expectedScheduling);
  });

  test("should call getByServiceProviderProfileId on the scheduling repository", async () => {
    const serviceProviderId = randomUUID();
    const expectedSchedulings: Scheduling[] = [
      new Scheduling(
        randomUUID(),
        randomUUID(),
        new Date(),
        false,
        false,
        0,
        "provider123",
        randomUUID()
      ),
      new Scheduling(
        randomUUID(),
        randomUUID(),
        new Date(),
        true,
        false,
        4,
        "provider123",
        randomUUID()
      ),
    ];
    (mockSchedulingRepository.getByServiceProviderProfileId as jest.Mock).mockResolvedValue(expectedSchedulings);

    const result = await schedulingAdapter.getByServiceProviderProfileId(serviceProviderId);

    expect(mockSchedulingRepository.getByServiceProviderProfileId).toHaveBeenCalledWith(serviceProviderId);
    expect(result).toEqual(expectedSchedulings);
  });

  test("should call getByCustomerId on the scheduling repository", async () => {
    const customerId = randomUUID();
    const expectedSchedulings: Scheduling[] = [
      new Scheduling(
        randomUUID(),
        randomUUID(),
        new Date(),
        false,
        false,
        0,
        "provider123",
        customerId
      ),
      new Scheduling(
        randomUUID(),
        randomUUID(),
        new Date(),
        true,
        false,
        4,
        "provider456",
        customerId
      ),
    ];
    (mockSchedulingRepository.getByCustomerId as jest.Mock).mockResolvedValue(expectedSchedulings);
  
    const result = await schedulingAdapter.getByCustomerId(customerId);
  
    expect(mockSchedulingRepository.getByCustomerId).toHaveBeenCalledWith(customerId);
    expect(result).toEqual(expectedSchedulings);
  });
  
  test("should call getByServiceId on the scheduling repository", async () => {
    const serviceId = randomUUID();
    const expectedSchedulings: Scheduling[] = [
      new Scheduling(
        randomUUID(),
        serviceId,
        new Date(),
        false,
        false,
        0,
        "provider123",
        randomUUID()
      ),
      new Scheduling(
        randomUUID(),
        serviceId,
        new Date(),
        true,
        false,
        4,
        "provider456",
        randomUUID()
      ),
    ];
    (mockSchedulingRepository.getByServiceId as jest.Mock).mockResolvedValue(expectedSchedulings);
  
    const result = await schedulingAdapter.getByServiceId(serviceId);
  
    expect(mockSchedulingRepository.getByServiceId).toHaveBeenCalledWith(serviceId);
    expect(result).toEqual(expectedSchedulings);
  });
  
  test("should call save on the scheduling repository", async () => {
    const scheduling: Scheduling = new Scheduling(
      randomUUID(),
      randomUUID(),
      new Date(),
      false,
      false,
      0,
      "provider123",
      randomUUID()
    );
    (mockSchedulingRepository.save as jest.Mock).mockResolvedValue(scheduling);
  
    const result = await schedulingAdapter.save(scheduling);
  
    expect(mockSchedulingRepository.save).toHaveBeenCalledWith(scheduling);
    expect(result).toEqual(scheduling);
  });
});