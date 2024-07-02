import { ServiceProviderProfile } from "../entities/service-provider-profile.entity";
import { UUID } from "crypto";
import { User } from "../entities/user.entity";
import { Service } from "../entities/service.entity";
import { Scheduling } from "../entities/scheduling.entity";

export interface IServiceProviderProfilePort {
  getById(id: UUID): Promise<ServiceProviderProfile>;
  getByServiceProviderId(
    serviceProviderId: UUID,
  ): Promise<ServiceProviderProfile>;
  getUserByProfileId(id: UUID): Promise<User>;
  getServicesByProfileId(id: UUID): Promise<Service[]>;
  getScheduleByProfileId(id: UUID): Promise<Scheduling[]>;
  save(
    serviceProviderProfile: ServiceProviderProfile,
  ): Promise<ServiceProviderProfile>;
}
