import { Scheduling } from "../entities/scheduling.entity";
import { UUID } from "crypto";

export interface ISchedulingPort {
  getById(id: UUID): Promise<Scheduling>;
  deleteById(id: UUID): Promise<Scheduling>;
  getByServiceProviderProfileId(serviceProviderId: UUID): Promise<Scheduling[]>;
  getByCustomerId(customerId: UUID): Promise<Scheduling[]>;
  save(scheduling: Scheduling): Promise<Scheduling>;
}
