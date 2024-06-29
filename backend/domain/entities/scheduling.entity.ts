import { ServiceProviderProfile } from "./service-provider-profile.entity";
import { Service } from "./service.entity";
import { User } from "./user.entity";

export interface Scheduling {
  id: string;
  service: Service;
  serviceId: string;
  scheduledDate: Date;
  isCompleted: boolean;
  isCanceled: boolean;
  customer: User;
  customerId: string;
  rating: number;
  serviceProviderProfile?: ServiceProviderProfile;
}
