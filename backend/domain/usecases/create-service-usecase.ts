import { Service } from "../entities/service.entity";
import { IServiceRepository } from "../repositories/service-repository";

export class createServiceUsecase {
  private readonly serviceRepository: IServiceRepository;

  constructor(serviceRepository: IServiceRepository) {
    this.serviceRepository = serviceRepository;
  }

  async execute(service: Service): Promise<Service | null> {
    return this.serviceRepository.save(service);
  }
}
