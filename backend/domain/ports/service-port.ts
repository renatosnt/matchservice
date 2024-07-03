import { Scheduling } from "../entities/scheduling.entity";
import { Service } from "../entities/service.entity";
import { UUID } from "crypto";

export interface IServicePort {
  getAll(): Promise<Service[]>;
  getById(id: UUID): Promise<Service>;
  deleteById(id: UUID): Promise<Service>;
  getServiceSchedulingById(id: UUID): Promise<Scheduling[]>;
  getByServiceProviderId(serviceProviderId: UUID): Promise<Service[]>;
  getUniqueCategories(): Promise<string[]>;
  search(
    title?: string,
    description?: string,
    category?: string,
    creatorProfileId?: string,
  ): Promise<Service[]>;
  save(service: Service): Promise<Service>;
}
