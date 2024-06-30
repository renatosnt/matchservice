import { Scheduling } from "./scheduling.entity";
import { ServiceProviderProfile } from "./service-provider-profile.entity";
import { UserType } from "./user-type.enum";

export interface IUser {
  id: string;
  username: string;
  realName: string;
  email: string;
  passwordHash: string;
  type: UserType;
  createdAt: Date;
  serviceProviderProfile?: ServiceProviderProfile;
  getScheduledServices(): Scheduling[];
}

export class User implements IUser {
  constructor(
    public readonly id: string,
    public username: string,
    public realName: string,
    public email: string,
    public passwordHash: string,
    public type: UserType,
    public createdAt: Date,
    private scheduledServices: Scheduling[],
    public serviceProviderProfile?: ServiceProviderProfile,
  ) {}

  public getScheduledServices(): Scheduling[] {
    return this.scheduledServices;
  }
}
