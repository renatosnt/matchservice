import { UUID } from "crypto";
import { ServiceProviderProfile } from "../domain/entities/service-provider-profile.entity";
import { IServiceProviderProfilePort } from "../domain/ports/service-provider-profile-port";

export class ServiceProviderProfileAdapter
  implements IServiceProviderProfilePort
{
  private readonly serviceProviderProfileRepository: IServiceProviderProfilePort;

  constructor(serviceproviderprofileRepository: IServiceProviderProfilePort) {
    this.serviceProviderProfileRepository = serviceproviderprofileRepository;
  }

  async getById(id: UUID): Promise<ServiceProviderProfile> {
    return await this.serviceProviderProfileRepository.getById(id);
  }

  async getByServiceProviderId(
    serviceProviderId: UUID,
  ): Promise<ServiceProviderProfile> {
    return await this.serviceProviderProfileRepository.getByServiceProviderId(
      serviceProviderId,
    );
  }

  async getUserIdByProfileId(id: UUID): Promise<UUID> {
    return await this.serviceProviderProfileRepository.getUserIdByProfileId(id);
  }

  async getServicesByProfileId(id: UUID): Promise<UUID[]> {
    return await this.serviceProviderProfileRepository.getServicesByProfileId(
      id,
    );
  }

  async getScheduleByProfileId(id: UUID): Promise<UUID[]> {
    return await this.serviceProviderProfileRepository.getScheduleByProfileId(
      id,
    );
  }

  async save(
    serviceproviderprofile: ServiceProviderProfile,
  ): Promise<ServiceProviderProfile> {
    return await this.serviceProviderProfileRepository.save(
      serviceproviderprofile,
    );
  }
}
