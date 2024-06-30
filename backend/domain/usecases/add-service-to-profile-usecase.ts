import { ServiceProviderProfile } from "../entities/service-provider-profile.entity";
import { Service } from "../entities/service.entity";
import { ServiceProviderProfileRepository } from "../repositories/service-provider-profile-repository";

export class addServiceToProfileUsecase {
    private readonly serviceProviderProfileRepository: ServiceProviderProfileRepository;

    constructor(serviceProviderProfileRepository: ServiceProviderProfileRepository) {
        this.serviceProviderProfileRepository = serviceProviderProfileRepository;
    }

    async execute(serviceProviderProfile: ServiceProviderProfile, service: Service): Promise<ServiceProviderProfile | null> {
        return this.serviceProviderProfileRepository.addService(serviceProviderProfile, service);
    }
}