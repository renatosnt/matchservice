import { ServiceProviderProfile } from "../entities/service-provider-profile.entity";
import { UUID } from "crypto";

export interface IServiceProviderProfileRepository {
  getById(id: UUID): ServiceProviderProfile;
  getByServiceProviderId(serviceProviderId: UUID): ServiceProviderProfile;
  save(serviceProviderProfile: ServiceProviderProfile): void;
}
