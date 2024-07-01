import { Service } from "../entities/service.entity";
import { UUID } from "crypto";

export interface IServiceRepository {
  getById(id: UUID): Service;
  deleteById(id: UUID): Service;
  getByServiceProviderId(serviceProviderId: UUID): Service[];
  search(
    title?: string,
    description?: string,
    category?: string,
    creatorProfileId?: string,
  ): Service[];
  save(service: Service): Service;
}
