import { Service as PrismaService } from "@prisma/client";
import { Service } from "../../domain/entities/service.entity";
import { UUID } from "crypto";

export class PrismaServiceMapper {
  static toDomain(prismaService: PrismaService): Service {
    return new Service(
      prismaService.id as UUID,
      prismaService.title,
      prismaService.description,
      prismaService.viewCount,
      prismaService.category,
      prismaService.locationState,
      prismaService.locationCity,
      prismaService.creatorProfileId as UUID,
      prismaService.schedule as UUID[],
      prismaService.createdAt,
    );
  }

  static toPrisma(service: Service): PrismaService {
    if (service.createdAt === undefined) {
      throw new Error("Service creation date should be specified.");
    }

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
      schedule: service.getSchedule(),
    };
  }
}
