import { ServiceProviderProfile } from "./service-provider-profile.entity";
import { Service } from "./service.entity";
import { User } from "./user.entity";

export interface IScheduling {
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

export class Scheduling implements IScheduling {
  constructor(
    public readonly id: string,
    public service: Service,
    public serviceId: string,
    public scheduledDate: Date,
    public isCompleted: boolean,
    public isCanceled: boolean,
    public customer: User,
    public customerId: string,
    public rating: number,
    public serviceProviderProfile?: ServiceProviderProfile,
  ) {}
}
