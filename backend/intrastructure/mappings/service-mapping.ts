import { Service as PrismaService } from "@prisma/client";
import { Service } from "../../domain/entities/service.entity";

export class PrismaServiceMapper {
  static toDomain(prismaService: PrismaService): Service {
    return new Service(
      prismaService.id,
      prismaService.title,
      prismaService.description,
      prismaService.viewCount,
      prismaService.category,
      prismaService.locationState,
      prismaService.locationCity,
      prismaService.createdAt,
      prismaService.creatorProfileId,
    );
  }

  static toPrisma(service: Service): PrismaService {
    return {
      id: service.id,
      title: service.title,
      description: service.description,
      viewCount: service.viewCount,
      category: service.category,
      locationState: service.locationState,
      locationCity: service.locationCity,
      createdAt: service.createdAt,
      creatorProfileId: service.creatorProfileId,
    };
  }
}
