import { Scheduling } from "../entities/scheduling.entity";
import { UUID } from "crypto";
import { User } from "../entities/user.entity";
import { ServiceProviderProfile } from "../entities/service-provider-profile.entity";
import { Service } from "../entities/service.entity";

export interface ISchedulingPort {
  getById(id: UUID): Promise<Scheduling>;
  getByServiceProviderProfileId(serviceProviderId: UUID): Promise<Scheduling[]>;
  getByCustomerId(customerId: UUID): Promise<Scheduling[]>;
  save(scheduling: Scheduling): Promise<Scheduling>;
}
