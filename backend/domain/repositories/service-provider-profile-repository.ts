import { ServiceProviderProfile } from "../entities/service-provider-profile.entity";
import { UUID } from "crypto";
import { Service } from "../entities/service.entity";

export interface ServiceProviderProfileRepository {
  getById(id: UUID): ServiceProviderProfile;
  getByServiceProviderId(serviceProviderId: UUID): ServiceProviderProfile;
  addService(serviceProviderProfileRepository: ServiceProviderProfile, service: Service): ServiceProviderProfile;
  update(serviceProviderProfile: ServiceProviderProfile): void;
  save(serviceProviderProfile: ServiceProviderProfile): void;
}
