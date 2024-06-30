import { UUID } from "crypto";
import { Service } from "../entities/service.entity";
import { ServiceRepository } from "../repositories/service-repository";

export class deleteServiceUsecase {
    private readonly serviceRepository: ServiceRepository;

    constructor(serviceRepository: ServiceRepository) {
        this.serviceRepository = serviceRepository;
    }

    async execute(id: UUID): Promise<Service | null> {
        return this.serviceRepository.deleteById(id);
    }
}