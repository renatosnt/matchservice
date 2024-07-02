import { UUID } from "crypto";
import { Scheduling } from "../domain/entities/scheduling.entity";
import { ISchedulingPort } from "../domain/ports/scheduling-port";
import { PrismaClient } from "@prisma/client";
import { PrismaSchedulingMapper } from "./mappings/scheduling-mapping";
import { validateParameterIsNotUndefined } from "./mappings/undefined-validation";
import { validateUUID } from "./mappings/uuid-validation";

export class SchedulingDatabase implements ISchedulingPort {
  private readonly prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  public async getById(id: UUID): Promise<Scheduling> {
    validateParameterIsNotUndefined(id);
    validateUUID(id);

    const result = await this.prismaClient.scheduling.findFirst({
      where: { id: id },
    });

    if (result === null) throw new Error("No scheduling found by this ID.");

    return PrismaSchedulingMapper.toDomain(result);
  }

  public async deleteById(id: UUID): Promise<Scheduling> {
    validateParameterIsNotUndefined(id);
    validateUUID(id);

    const result = await this.prismaClient.scheduling.delete({
      where: { id: id },
    });

    if (result === null) throw new Error("No scheduling found by this ID.");

    return PrismaSchedulingMapper.toDomain(result);
  }

  public async getByServiceProviderProfileId(
    serviceProviderId: UUID,
  ): Promise<Scheduling[]> {
    validateParameterIsNotUndefined(serviceProviderId);
    validateUUID(serviceProviderId);

    const result = await this.prismaClient.scheduling.findMany({
      where: { serviceProviderProfileId: serviceProviderId },
    });

    if (result === null) throw new Error("No scheduling found by this ID.");

    return result.map((i) => PrismaSchedulingMapper.toDomain(i));
  }

  public async getByCustomerId(customerId: UUID): Promise<Scheduling[]> {
    validateParameterIsNotUndefined(customerId);
    validateUUID(customerId);

    const result = await this.prismaClient.scheduling.findMany({
      where: { customerId },
    });

    if (result === null) throw new Error("No scheduling found by this ID.");

    return result.map((i) => PrismaSchedulingMapper.toDomain(i));
  }

  public async save(scheduling: Scheduling): Promise<Scheduling> {
    validateParameterIsNotUndefined(scheduling);

    const result = await this.prismaClient.scheduling.upsert({
      where: { id: scheduling.id },
      update: PrismaSchedulingMapper.toPrisma(scheduling),
      create: PrismaSchedulingMapper.toPrisma(scheduling),
    });
    return PrismaSchedulingMapper.toDomain(result);
  }
}
