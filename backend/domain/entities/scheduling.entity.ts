import { ServiceProviderProfile } from "./service-provider-profile.entity";
import { Service } from "./service.entity";
import { User } from "./user.entity";

export interface IScheduling {
  id: string;
  serviceId: string;
  scheduledDate: Date;
  isCompleted: boolean;
  isCanceled: boolean;
  customerId: string;
  rating: number;
  serviceProviderProfileId: string;
  customer?: User;
  service?: Service;
  serviceProviderProfile?: ServiceProviderProfile;
}

export class Scheduling implements IScheduling {
  constructor(
    public readonly id: string,
    public serviceId: string,
    public scheduledDate: Date,
    public isCompleted: boolean,
    public isCanceled: boolean,
    public customerId: string,
    public rating: number,
    public serviceProviderProfileId: string,
    public customer?: User,
    public service?: Service,
    public serviceProviderProfile?: ServiceProviderProfile,
  ) {}
}
