import { Service } from "@prisma/client";
import { UUID } from "crypto";

export interface ServiceRepository {
  getById(id: UUID): Service;
  getByServiceProviderId(serviceProviderId: UUID): Service[];
  update(service: Service): void;
  save(service: Service): void;
}
