import { Scheduling } from "./scheduling.entity";
import { ServiceProviderProfile } from "./service-provider-profile.entity";

export interface Service {
  id: string;
  title: string;
  description: string;
  viewCount: number;
  category: string;
  location: Location;
  createdAt: Date;
  active: boolean;
  availableDates: Date[];
  creatorProfile: ServiceProviderProfile;
  schedules: Scheduling[];
}
