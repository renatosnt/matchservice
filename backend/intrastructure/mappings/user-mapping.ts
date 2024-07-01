import { User as PrismaUser } from "@prisma/client";
import { User } from "../../domain/entities/user.entity";

export class PrismaUserMapper {
  static toDomain(prismaUser: PrismaUser): User {
    return new User(
      prismaUser.id,
      prismaUser.username,
      prismaUser.realName,
      prismaUser.email,
      prismaUser.passwordHash,
      prismaUser.type,
      prismaUser.createdAt,
    );
  }

  static toPrisma(user: User): PrismaUser {
    return {
      id: user.id,
      username: user.username,
      realName: user.realName,
      email: user.email,
      passwordHash: user.passwordHash,
      type: user.type,
      createdAt: user.createdAt,
    };
  }
}
