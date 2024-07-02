import { UUID } from "crypto";
import { ServiceProviderProfile } from "../domain/entities/service-provider-profile.entity";
import { IServiceProviderProfilePort } from "../domain/ports/service-provider-profile-port";
import { PrismaClient } from "@prisma/client";
import { PrismaServiceProviderProfileMapper } from "./mappings/service-provider-profile-mapping";
import { PrismaUserMapper } from "./mappings/user-mapping";
import { User } from "../domain/entities/user.entity";
import { Service } from "../domain/entities/service.entity";
import { PrismaServiceMapper } from "./mappings/service-mapping";
import { Scheduling } from "../domain/entities/scheduling.entity";
import { PrismaSchedulingMapper } from "./mappings/scheduling-mapping";

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

  public async getUserByProfileId(id: UUID): Promise<User> {
    const result = await this.prismaClient.serviceProviderProfile.findFirst({
      where: { id: id },
      select: { user: true },
    });

    if (result === null) throw new Error("No user found by this ID.");

    return PrismaUserMapper.toDomain(result.user);
  }

  public async getServicesByProfileId(id: UUID): Promise<Service[]> {
    const result = await this.prismaClient.serviceProviderProfile.findFirst({
      where: { id: id },
      select: { services: true },
    });

    if (result === null) throw new Error("No service found by this ID.");

    return result.services.map((i) => PrismaServiceMapper.toDomain(i));
  }

  public async getScheduleByProfileId(id: UUID): Promise<Scheduling[]> {
    const result = await this.prismaClient.serviceProviderProfile.findFirst({
      where: { id: id },
      select: { schedule: true },
    });

    if (result === null) throw new Error("No schedule found by this ID.");

    return result.schedule.map((i) => PrismaSchedulingMapper.toDomain(i));
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
