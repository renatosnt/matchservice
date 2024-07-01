import { UUID } from "crypto";
import { Service } from "../domain/entities/service.entity";
import { IServicePort } from "../domain/ports/service-port";
import { PrismaClient } from "@prisma/client";
import { PrismaServiceMapper } from "./mappings/service-mapping";
import { Scheduling } from "../domain/entities/scheduling.entity";
import { PrismaSchedulingMapper } from "./mappings/scheduling-mapping";

export class ServiceDatabase implements IServicePort {
  private readonly prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  public async getById(id: UUID): Promise<Service> {
    const result = await this.prismaClient.service.findFirst({
      where: { id: id },
    });
    return PrismaServiceMapper.toDomain(result!);
  }

  public async deleteById(id: UUID): Promise<Service> {
    const result = await this.prismaClient.service.delete({
      where: { id: id },
    });
    return PrismaServiceMapper.toDomain(result!);
  }

  public async getByServiceProviderId(
    serviceProviderId: UUID,
  ): Promise<Service[]> {
    const result = await this.prismaClient.service.findMany({
      where: { creatorProfileId: serviceProviderId },
    });
    return result!.map((i) => PrismaServiceMapper.toDomain(i));
  }

  public async getServiceSchedulingById(id: UUID): Promise<Scheduling[]> {
    const result = await this.prismaClient.scheduling.findMany({
      where: { serviceId: id },
    });
    return result!.map((i) => PrismaSchedulingMapper.toDomain(i));
  }

  public async search(
    title?: string,
    description?: string,
    category?: string,
    creatorProfileId?: string,
  ): Promise<Service[]> {
    const result = await this.prismaClient.service.findMany({
      where: {
        OR: [{ title }, { description }, { category }, { creatorProfileId }],
      },
    });
    return result!.map((i) => PrismaServiceMapper.toDomain(i));
  }

  public async save(service: Service): Promise<Service> {
    const result = await this.prismaClient.service.upsert({
      where: { id: service.id },
      update: PrismaServiceMapper.toPrisma(service),
      create: PrismaServiceMapper.toPrisma(service),
    });
    return PrismaServiceMapper.toDomain(result);
  }
}
