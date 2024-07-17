import { UUID } from "crypto";
import { Service } from "../domain/entities/service.entity";
import { IServicePort } from "../domain/ports/service-port";
import { PrismaClient } from "@prisma/client";
import { PrismaServiceMapper } from "./mappings/service-mapping";
import { Scheduling } from "../domain/entities/scheduling.entity";
import { PrismaSchedulingMapper } from "./mappings/scheduling-mapping";
import { validateParameterIsNotUndefined } from "./mappings/undefined-validation";
import { validateUUID } from "./mappings/uuid-validation";

export class ServiceDatabase implements IServicePort {
  private readonly prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  public async getAll(): Promise<Service[]> {
    const result = await this.prismaClient.service.findMany();

    return result.map((i) => PrismaServiceMapper.toDomain(i));
  }

  public async getById(id: UUID): Promise<Service> {
    validateParameterIsNotUndefined(id);
    validateUUID(id);

    const result = await this.prismaClient.service.findFirst({
      where: { id: id },
    });

    if (result === null) throw new Error("No service found by this ID.");

    return PrismaServiceMapper.toDomain(result);
  }

  public async deleteById(id: UUID): Promise<Service> {
    validateParameterIsNotUndefined(id);
    validateUUID(id);

    const result = await this.prismaClient.service.delete({
      where: { id: id },
    });

    if (result === null) throw new Error("No service found by this ID.");

    return PrismaServiceMapper.toDomain(result);
  }

  public async getByServiceProviderId(
    serviceProviderId: UUID,
  ): Promise<Service[]> {
    validateParameterIsNotUndefined(serviceProviderId);
    validateUUID(serviceProviderId);

    const result = await this.prismaClient.service.findMany({
      where: { creatorProfileId: serviceProviderId },
    });

    if (result === null) throw new Error("No service found by this ID.");

    return result.map((i) => PrismaServiceMapper.toDomain(i));
  }

  public async getServiceSchedulingById(id: UUID): Promise<Scheduling[]> {
    validateParameterIsNotUndefined(id);
    validateUUID(id);

    const result = await this.prismaClient.scheduling.findMany({
      where: { serviceId: id },
    });

    if (result === null) throw new Error("No scheduling found by this ID.");

    return result.map((i) => PrismaSchedulingMapper.toDomain(i));
  }

  public async getUniqueCategories(): Promise<string[]> {
    const categories = await this.prismaClient.service.findMany({
      select: { category: true },
    });

    if (categories === null) throw new Error("No categories found.");

    const result = [...new Set(categories)];

    return result.map((x) => x.category);
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

    if (result === null) throw new Error("No service found on this search.");

    return result.map((i) => PrismaServiceMapper.toDomain(i));
  }

  public async save(service: Service): Promise<Service> {
    validateParameterIsNotUndefined(service);

    const result = await this.prismaClient.service.upsert({
      where: { id: service.id },
      update: PrismaServiceMapper.toPrisma(service),
      create: PrismaServiceMapper.toPrisma(service),
    });
    return PrismaServiceMapper.toDomain(result);
  }
}
