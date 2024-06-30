import { Service } from "../entities/service.entity";
import { UUID } from "crypto";

export interface ServiceRepository {
  getById(id: UUID): Service;
  deleteById(id: UUID): Service;
  getByServiceProviderId(serviceProviderId: UUID): Service[];
  search(
    title?: string,
    description?: string,
    category?: string,
    active?: boolean,
    creatorProfileId?: string,
  ): Service[];
  addDate(service: Service, date: Date): Service;
  update(service: Service): void;
  save(service: Service): Service;
}
