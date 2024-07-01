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
    return PrismaUserMapper.toDomain(result!);
  }

  public async getUserServicesById(id: UUID): Promise<Service[]> {
    const result = await this.prismaClient.service.findMany({
      where: { creatorProfileId: id },
    });
    return result!.map((i) => PrismaServiceMapper.toDomain(i));
  }

  public async getByUsername(username: string): Promise<User> {
    const result = await this.prismaClient.user.findFirst({
      where: { username: username },
    });
    return PrismaUserMapper.toDomain(result!);
  }

  public async save(user: User): Promise<User> {
    const result = await this.prismaClient.user.upsert({
      where: { id: user.id },
      update: PrismaUserMapper.toPrisma(user),
      create: PrismaUserMapper.toPrisma(user),
    });
    return PrismaUserMapper.toDomain(result);
  }
}
