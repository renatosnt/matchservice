import { ServiceProviderProfile as PrismaServiceProviderProfile } from "@prisma/client";
import { ServiceProviderProfile } from "../../domain/entities/service-provider-profile.entity";
import { UUID } from "crypto";

export class PrismaServiceProviderProfileMapper {
  static toDomain(
    prismaServiceProviderProfile: PrismaServiceProviderProfile,
  ): ServiceProviderProfile {
    return new ServiceProviderProfile(
      prismaServiceProviderProfile.id as UUID,
      prismaServiceProviderProfile.userId as UUID,
      prismaServiceProviderProfile.telephoneNumber,
      prismaServiceProviderProfile.specialty,
      prismaServiceProviderProfile.averageRating,
      prismaServiceProviderProfile.services as UUID[],
      prismaServiceProviderProfile.schedule as UUID[]
    );
  }

  static toPrisma(
    serviceproviderprofile: ServiceProviderProfile,
  ): PrismaServiceProviderProfile {
    return {
      id: serviceproviderprofile.id,
      userId: serviceproviderprofile.userId,
      telephoneNumber: serviceproviderprofile.telephoneNumber,
      specialty: serviceproviderprofile.specialty,
      averageRating: serviceproviderprofile.averageRating,
      services: serviceproviderprofile.getServices(),
      schedule: serviceproviderprofile.getSchedule()
    };
  }
}
