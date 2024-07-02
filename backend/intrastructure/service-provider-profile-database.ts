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

    if (result === null) throw new Error("No profile found by this ID.");

    return PrismaServiceProviderProfileMapper.toDomain(result);
  }

  public async getByServiceProviderId(
    id: UUID,
  ): Promise<ServiceProviderProfile> {
    const result = await this.prismaClient.serviceProviderProfile.findFirst({
      where: { userId: id },
    });

    if (result === null) throw new Error("No profile found by this ID.");

    return PrismaServiceProviderProfileMapper.toDomain(result);
  }

  public async getUserIdByProfileId(id: UUID): Promise<UUID> {
    const result = await this.prismaClient.serviceProviderProfile.findFirst({
      where: { id: id },
      select: { userId: true },
    });

    if (result === null) throw new Error("No user found by this ID.");

    return result.userId as UUID;
  }

  public async getServicesByProfileId(id: UUID): Promise<UUID[]> {
    const result = await this.prismaClient.serviceProviderProfile.findFirst({
      where: { id: id },
      select: { services: true },
    });

    if (result === null) throw new Error("No service found by this ID.");

    return result.services as UUID[];
  }

  public async getScheduleByProfileId(id: UUID): Promise<UUID[]> {
    const result = await this.prismaClient.serviceProviderProfile.findFirst({
      where: { id: id },
      select: { schedule: true },
    });

    if (result === null) throw new Error("No schedule found by this ID.");

    return result.schedule as UUID[];
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
