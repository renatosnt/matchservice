import { ServiceProviderProfile } from "../entities/service-provider-profile.entity";
import { UUID } from "crypto";

export interface IServiceProviderProfilePort {
  getById(id: UUID): Promise<ServiceProviderProfile>;
  getByServiceProviderId(
    serviceProviderId: UUID,
  ): Promise<ServiceProviderProfile>;
  save(
    serviceProviderProfile: ServiceProviderProfile,
  ): Promise<ServiceProviderProfile>;
}
