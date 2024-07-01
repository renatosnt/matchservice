import { UUID } from "crypto";
import { ServiceProviderProfile } from "../domain/entities/service-provider-profile.entity";
import { IServiceProviderProfilePort } from "../domain/ports/service-provider-profile-port";
import { PrismaClient } from "@prisma/client";
import { PrismaServiceProviderProfileMapper } from "./mappings/service-provider-profile-mapping";

export class ServiceProviderProfileDatabase
  implements IServiceProviderProfilePort
{
  private readonly prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  public async getById(id: UUID): Promise<ServiceProviderProfile> {
    const result = await this.prismaClient.serviceProviderProfile.findFirst({
      where: { id: id },
    });
    return PrismaServiceProviderProfileMapper.toDomain(result!);
  }

  public async getByServiceProviderId(
    id: UUID,
  ): Promise<ServiceProviderProfile> {
    const result = await this.prismaClient.serviceProviderProfile.findFirst({
      where: { userId: id },
    });
    return PrismaServiceProviderProfileMapper.toDomain(result!);
  }

  public async save(
    serviceproviderprofile: ServiceProviderProfile,
  ): Promise<ServiceProviderProfile> {
    const result = await this.prismaClient.serviceProviderProfile.upsert({
      where: { id: serviceproviderprofile.id },
      update: PrismaServiceProviderProfileMapper.toPrisma(
        serviceproviderprofile,
      ),
      create: PrismaServiceProviderProfileMapper.toPrisma(
        serviceproviderprofile,
      ),
    });
    return PrismaServiceProviderProfileMapper.toDomain(result);
  }
}
