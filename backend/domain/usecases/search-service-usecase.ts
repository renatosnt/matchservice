import { Service } from "../entities/service.entity";
import { ServiceRepository } from "../repositories/service-repository";

export class searchServiceUsecase {
  private readonly serviceRepository: ServiceRepository;

  constructor(serviceRepository: ServiceRepository) {
    this.serviceRepository = serviceRepository;
  }

  async execute(
    title?: string,
    description?: string,
    category?: string,
    active?: boolean,
    creatorProfileId?: string,
  ): Promise<Service[] | null> {
    return this.serviceRepository.search(
      title,
      description,
      category,
      active,
      creatorProfileId,
    );
  }
}
