import { Scheduling } from "../entities/scheduling.entity";
import { UUID } from "crypto";

export interface ISchedulingPort {
  getById(id: UUID): Scheduling;
  getByServiceProviderId(serviceProviderId: UUID): Scheduling[];
  getByServiceCustomerId(customerId: UUID): Scheduling[];
  save(scheduling: Scheduling): Scheduling;
}
