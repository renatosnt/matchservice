import { Scheduling } from "../entities/scheduling.entity";
import { UUID } from "crypto";

export interface SchedulingRepository {
  getById(id: UUID): Scheduling;
  getByServiceProviderId(serviceProviderId: UUID): Scheduling[];
  getByServiceCustomerId(customerId: UUID): Scheduling[];
  update(scheduling: Scheduling): void;
  save(scheduling: Scheduling): Scheduling;
}
