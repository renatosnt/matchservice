import { Scheduling as PrismaScheduling } from "@prisma/client";
import { Scheduling } from "../../domain/entities/scheduling.entity";

export class PrismaSchedulingMapper {
  static toDomain(prismaScheduling: PrismaScheduling): Scheduling {
    return new Scheduling(
      prismaScheduling.id,
      prismaScheduling.serviceId,
      prismaScheduling.scheduledDate,
      prismaScheduling.isCompleted,
      prismaScheduling.isCanceled,
      prismaScheduling.customerId,
      prismaScheduling.rating,
      prismaScheduling.serviceProviderProfileId,
    );
  }

  static toPrisma(scheduling: Scheduling): PrismaScheduling {
    return {
      id: scheduling.id,
      serviceId: scheduling.serviceId,
      scheduledDate: scheduling.scheduledDate,
      isCompleted: scheduling.isCompleted,
      isCanceled: scheduling.isCanceled,
      customerId: scheduling.customerId,
      rating: scheduling.rating,
      serviceProviderProfileId: scheduling.serviceProviderProfileId,
    };
  }
}
