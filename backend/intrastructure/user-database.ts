import { UUID } from "crypto";
import { User } from "../domain/entities/user.entity";
import { IUserPort } from "../domain/ports/user-port";
import { PrismaClient } from "@prisma/client";
import { PrismaUserMapper } from "./mappings/user-mapping";
import { Service } from "../domain/entities/service.entity";
import { PrismaServiceMapper } from "./mappings/service-mapping";

export class UserDatabase implements IUserPort {
  private readonly prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  public async getById(id: UUID): Promise<User> {
    const result = await this.prismaClient.user.findFirst({
      where: { id: id },
    });

    if (result === null) throw new Error("No user found by this ID.");

    return PrismaUserMapper.toDomain(result);
  }

  public async getUserServicesById(id: UUID): Promise<Service[]> {
    const result = await this.prismaClient.service.findMany({
      where: { creatorProfileId: id },
    });

    if (result === null) throw new Error("No service found by this ID.");

    return result.map((i) => PrismaServiceMapper.toDomain(i));
  }

  public async getByUsername(username: string): Promise<User> {
    const result = await this.prismaClient.user.findFirst({
      where: { username: username },
    });

    if (result === null) throw new Error("No user found by this ID.");

    return PrismaUserMapper.toDomain(result);
  }

  public async getByEmail(email: string): Promise<User> {
    const result = await this.prismaClient.user.findFirst({
      where: { email: email },
    });

    if (result === null) throw new Error("No user found by this Email.");

    return PrismaUserMapper.toDomain(result);
  }

  public async save(user: User): Promise<User> {
    const input = {
      id: user.id,
      username: user.username,
      realName: user.realName,
      email: user.email,
      passwordHash: user.passwordHash,
      type: user.type,
      createdAt: user.createdAt,
      scheduledServices: user.getScheduledServices(),
      serviceProviderProfileId: user.serviceProviderProfileId,
    };

    const result = await this.prismaClient.user.upsert({
      where: { id: user.id },
      update: input,
      create: input,
    });
    return PrismaUserMapper.toDomain(result);
  }
}
