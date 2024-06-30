import { Service } from "../entities/service.entity";
import { ServiceRepository } from "../repositories/service-repository";

export class addDatesToServiceUsecase {
  private readonly serviceRepository: ServiceRepository;

  constructor(serviceRepository: ServiceRepository) {
    this.serviceRepository = serviceRepository;
  }

  async execute(service: Service, date: Date): Promise<Service | null> {
    return this.serviceRepository.addDate(service, date);
  }
}
