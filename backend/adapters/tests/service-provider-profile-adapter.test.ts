import { randomUUID } from "crypto";
import { ServiceProviderProfile } from "../../domain/entities/service-provider-profile.entity";
import { IServiceProviderProfilePort } from "../../domain/ports/service-provider-profile-port";
import { ServiceProviderProfileAdapter } from "../service-provider-profile-adapter";

// Create a mock implementation of IServiceProviderProfilePort
const mockServiceProviderProfileRepository: IServiceProviderProfilePort = {
  getById: jest.fn(),
  getByServiceProviderId: jest.fn(),
  getUserIdByProfileId: jest.fn(),
  getServicesByProfileId: jest.fn(),
  getScheduleByProfileId: jest.fn(),
  save: jest.fn(),
};

describe("ServiceProviderProfileAdapter", () => {
  let serviceProviderProfileAdapter: ServiceProviderProfileAdapter;

  beforeEach(() => {
    serviceProviderProfileAdapter = new ServiceProviderProfileAdapter(
      mockServiceProviderProfileRepository,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should call getById on the service provider profile repository", async () => {
    const profileId = randomUUID();
    const expectedProfile = new ServiceProviderProfile(
      profileId,
      randomUUID(),
      "123456789",
      "Specialty",
      4.5,
      [randomUUID(), randomUUID()],
      [randomUUID()],
    );
    (
      mockServiceProviderProfileRepository.getById as jest.Mock
    ).mockResolvedValue(expectedProfile);

    const result = await serviceProviderProfileAdapter.getById(profileId);

    expect(mockServiceProviderProfileRepository.getById).toHaveBeenCalledWith(
      profileId,
    );
    expect(result).toEqual(expectedProfile);
  });

  test("should call getByServiceProviderId on the service provider profile repository", async () => {
    const serviceProviderId = randomUUID();
    const expectedProfile = new ServiceProviderProfile(
      randomUUID(),
      serviceProviderId,
      "123456789",
      "Specialty",
      4.5,
      [randomUUID(), randomUUID()],
      [randomUUID()],
    );
    (
      mockServiceProviderProfileRepository.getByServiceProviderId as jest.Mock
    ).mockResolvedValue(expectedProfile);

    const result =
      await serviceProviderProfileAdapter.getByServiceProviderId(
        serviceProviderId,
      );

    expect(
      mockServiceProviderProfileRepository.getByServiceProviderId,
    ).toHaveBeenCalledWith(serviceProviderId);
    expect(result).toEqual(expectedProfile);
  });

  test("should call getUserIdByProfileId on the service provider profile repository", async () => {
    const profileId = randomUUID();
    const expectedUserId = randomUUID();
    (
      mockServiceProviderProfileRepository.getUserIdByProfileId as jest.Mock
    ).mockResolvedValue(expectedUserId);

    const result =
      await serviceProviderProfileAdapter.getUserIdByProfileId(profileId);

    expect(
      mockServiceProviderProfileRepository.getUserIdByProfileId,
    ).toHaveBeenCalledWith(profileId);
    expect(result).toEqual(expectedUserId);
  });

  test("should call getServicesByProfileId on the service provider profile repository", async () => {
    const profileId = randomUUID();
    const expectedServices = [randomUUID(), randomUUID()];
    (
      mockServiceProviderProfileRepository.getServicesByProfileId as jest.Mock
    ).mockResolvedValue(expectedServices);

    const result =
      await serviceProviderProfileAdapter.getServicesByProfileId(profileId);

    expect(
      mockServiceProviderProfileRepository.getServicesByProfileId,
    ).toHaveBeenCalledWith(profileId);
    expect(result).toEqual(expectedServices);
  });

  test("should call getScheduleByProfileId on the service provider profile repository", async () => {
    const profileId = randomUUID();
    const expectedSchedule = [randomUUID(), randomUUID()];
    (
      mockServiceProviderProfileRepository.getScheduleByProfileId as jest.Mock
    ).mockResolvedValue(expectedSchedule);

    const result =
      await serviceProviderProfileAdapter.getScheduleByProfileId(profileId);

    expect(
      mockServiceProviderProfileRepository.getScheduleByProfileId,
    ).toHaveBeenCalledWith(profileId);
    expect(result).toEqual(expectedSchedule);
  });

  test("should call save on the service provider profile repository", async () => {
    const profileToSave = new ServiceProviderProfile(
      randomUUID(),
      randomUUID(),
      "123456789",
      "Specialty",
      4.5,
      [randomUUID(), randomUUID()],
      [randomUUID()],
    );
    const expectedSavedProfile = new ServiceProviderProfile(
      profileToSave.id,
      profileToSave.userId,
      profileToSave.telephoneNumber,
      profileToSave.specialty,
      profileToSave.averageRating,
      profileToSave.getServices(),
      profileToSave.getSchedule(),
    );
    (mockServiceProviderProfileRepository.save as jest.Mock).mockResolvedValue(
      expectedSavedProfile,
    );

    const result = await serviceProviderProfileAdapter.save(profileToSave);

    expect(mockServiceProviderProfileRepository.save).toHaveBeenCalledWith(
      profileToSave,
    );
    expect(result).toEqual(expectedSavedProfile);
  });
});
