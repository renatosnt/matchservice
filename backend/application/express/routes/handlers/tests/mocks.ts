export const USER_ADAPTER_PATH = "../../../../../adapters/user-adapter";
export const SERVICE_ADAPTER_PATH = "../../../../../adapters/service-adapter";
export const SCHEDULING_ADAPTER_PATH =
  "../../../../../adapters/scheduling-adapter";
export const PROFILE_ADAPTER_PATH =
  "../../../../../adapters/service-provider-profile-adapter";

export const mockUserAdapter = {
  getById: jest.fn(),
  getUserServicesById: jest.fn(),
  getByUsername: jest.fn(),
  getByEmail: jest.fn(),
  save: jest.fn(),
};

jest.mock("../../../../../adapters/user-adapter", () => {
  return jest.fn().mockImplementation(() => mockUserAdapter);
});

export const mockServiceAdapter = {
  getAll: jest.fn(),
  getById: jest.fn(),
  deleteById: jest.fn(),
  getServiceSchedulingById: jest.fn(),
  getByServiceProviderId: jest.fn(),
  getUniqueCategories: jest.fn(),
  search: jest.fn(),
  save: jest.fn(),
};

jest.mock("../../../../../adapters/service-adapter", () => {
  return jest.fn().mockImplementation(() => mockServiceAdapter);
});

export const mockSchedulingAdapter = {
  getById: jest.fn(),
  deleteById: jest.fn(),
  getByServiceProviderProfileId: jest.fn(),
  getByCustomerId: jest.fn(),
  getByServiceId: jest.fn(),
  save: jest.fn(),
};

jest.mock("../../../../../adapters/scheduling-adapter", () => {
  return jest.fn().mockImplementation(() => mockSchedulingAdapter);
});

export const mockServiceProviderProfileAdapter = {
  getById: jest.fn(),
  getByServiceProviderId: jest.fn(),
  getUserIdByProfileId: jest.fn(),
  getServicesByProfileId: jest.fn(),
  getScheduleByProfileId: jest.fn(),
  save: jest.fn(),
};

jest.mock("../../../../../adapters/service-provider-profile-adapter", () => {
  return jest.fn().mockImplementation(() => mockServiceProviderProfileAdapter);
});
