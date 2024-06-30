import { UUID } from "crypto";
import { Service } from "../entities/service.entity";
import { IServiceRepository } from "../repositories/service-repository";

export class deleteServiceUsecase {
  private readonly serviceRepository: IServiceRepository;

  constructor(serviceRepository: IServiceRepository) {
    this.serviceRepository = serviceRepository;
  }

  async execute(id: UUID): Promise<Service | null> {
    return this.serviceRepository.deleteById(id);
  }
}
