import { UUID } from "crypto";
import { Service } from "../domain/entities/service.entity";
import { IServicePort } from "../domain/ports/service-port";
import { Scheduling } from "../domain/entities/scheduling.entity";

export class ServiceAdapter implements IServicePort {
  private readonly serviceRepository: IServicePort;

  constructor(serviceRepository: IServicePort) {
    this.serviceRepository = serviceRepository;
  }

  async getAll(): Promise<Service[]> {
    return await this.serviceRepository.getAll();
  }

  async getById(id: UUID): Promise<Service> {
    return await this.serviceRepository.getById(id);
  }

  async deleteById(id: UUID): Promise<Service> {
    return await this.serviceRepository.deleteById(id);
  }

  async getServiceSchedulingById(id: UUID): Promise<Scheduling[]> {
    return await this.serviceRepository.getServiceSchedulingById(id);
  }

  async getByServiceProviderId(serviceProviderId: UUID): Promise<Service[]> {
    return await this.serviceRepository.getByServiceProviderId(
      serviceProviderId,
    );
  }

  public async getUniqueCategories(): Promise<string[]> {
    return await this.serviceRepository.getUniqueCategories();
  }

  async search(
    title?: string,
    description?: string,
    category?: string,
    creatorProfileId?: string,
  ): Promise<Service[]> {
    return await this.serviceRepository.search(
      title,
      description,
      category,
      creatorProfileId,
    );
  }

  async save(service: Service): Promise<Service> {
    return await this.serviceRepository.save(service);
  }
}
