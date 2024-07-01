import { Service } from "../entities/service.entity";
import { IServiceRepository } from "../repositories/service-repository";

export class searchServiceUsecase {
  private readonly serviceRepository: IServiceRepository;

  constructor(serviceRepository: IServiceRepository) {
    this.serviceRepository = serviceRepository;
  }

  async execute(
    title?: string,
    description?: string,
    category?: string,
    creatorProfileId?: string,
  ): Promise<Service[] | null> {
    return this.serviceRepository.search(
      title,
      description,
      category,
      creatorProfileId,
    );
  }
}
