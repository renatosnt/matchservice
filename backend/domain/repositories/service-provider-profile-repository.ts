import { ServiceProviderProfile } from "../entities/service-provider-profile.entity";
import { UUID } from "crypto";

export interface ServiceProviderProfileRepository {
  getById(id: UUID): ServiceProviderProfile;
  getByServiceProviderId(serviceProviderId: UUID): ServiceProviderProfile;
  update(serviceProviderProfile: ServiceProviderProfile): void;
  save(serviceProviderProfile: ServiceProviderProfile): void;
}
