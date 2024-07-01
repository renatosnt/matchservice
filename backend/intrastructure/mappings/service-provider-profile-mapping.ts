import { ServiceProviderProfile as PrismaServiceProviderProfile } from "@prisma/client";
import { ServiceProviderProfile } from "../../domain/entities/service-provider-profile.entity";

export class PrismaServiceProviderProfileMapper {
  static toDomain(
    prismaServiceProviderProfile: PrismaServiceProviderProfile,
  ): ServiceProviderProfile {
    return new ServiceProviderProfile(
      prismaServiceProviderProfile.id,
      prismaServiceProviderProfile.userId,
      prismaServiceProviderProfile.telephoneNumber,
      prismaServiceProviderProfile.specialty,
      prismaServiceProviderProfile.averageRating,
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
    };
  }
}
