import { User as PrismaUser } from "@prisma/client";
import { User } from "../../domain/entities/user.entity";
import { UUID } from "crypto";

export class PrismaUserMapper {
  static toDomain(prismaUser: PrismaUser): User {
    return new User(
      prismaUser.id as UUID,
      prismaUser.username,
      prismaUser.realName,
      prismaUser.email,
      prismaUser.passwordHash,
      prismaUser.type,
      prismaUser.scheduledServices as UUID[],
      prismaUser.serviceProviderProfileId as UUID | null
    );
  }

  static toPrisma(user: User): PrismaUser {

    if (user.createdAt === undefined) {
      throw new Error("Service creation date should be specified.")
    }

    return {
      id: user.id,
      username: user.username,
      realName: user.realName,
      email: user.email,
      passwordHash: user.passwordHash,
      type: user.type,
      createdAt: user.createdAt,
      serviceProviderProfileId: user.serviceProviderProfileId as UUID | null,
      scheduledServices: user.getScheduledServices()
    };
  }
}
