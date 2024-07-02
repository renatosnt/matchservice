import { Scheduling as PrismaScheduling } from "@prisma/client";
import { Scheduling } from "../../domain/entities/scheduling.entity";
import { UUID } from "crypto";

export class PrismaSchedulingMapper {
  static toDomain(prismaScheduling: PrismaScheduling): Scheduling {
    return new Scheduling(
      prismaScheduling.id as UUID,
      prismaScheduling.serviceId as UUID,
      prismaScheduling.scheduledDate,
      prismaScheduling.isCompleted,
      prismaScheduling.isCanceled,
      prismaScheduling.rating,
      prismaScheduling.serviceProviderProfileId,
      prismaScheduling.customerId as UUID,
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
