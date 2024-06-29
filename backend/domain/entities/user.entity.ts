import { Scheduling } from "./scheduling.entity";
import { ServiceProviderProfile } from "./service-provider-profile.entity";
import { UserType } from "./user-type.enum";

export interface User {
  id: string;
  username: string;
  realName: string;
  email: string;
  passwordHash: string;
  type: UserType;
  createdAt: Date;
  scheduledServices: Scheduling[];
  serviceProviderProfile?: ServiceProviderProfile;
}
