import { ServiceProviderProfile } from "../entities/service-provider-profile.entity";
import { UUID } from "crypto";

export interface IServiceProviderProfilePort {
  getById(id: UUID): Promise<ServiceProviderProfile>;
  getByServiceProviderId(
    serviceProviderId: UUID,
  ): Promise<ServiceProviderProfile>;
  getUserIdByProfileId(id: UUID): Promise<UUID>;
  getServicesByProfileId(id: UUID): Promise<UUID[]>;
  getScheduleByProfileId(id: UUID): Promise<UUID[]>;
  save(
    serviceProviderProfile: ServiceProviderProfile,
  ): Promise<ServiceProviderProfile>;
}
