import { Service } from "../entities/service.entity";
import { ServiceRepository } from "../repositories/service-repository";

export class createServiceUsecase {
    private readonly serviceRepository: ServiceRepository;

    constructor(serviceRepository: ServiceRepository) {
        this.serviceRepository = serviceRepository;
    }

    async execute(service: Service): Promise<Service | null> {
        return this.serviceRepository.save(service);
    }
}