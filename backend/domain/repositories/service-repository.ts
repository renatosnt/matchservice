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
  save(service: Service): Service;
}
