import { Scheduling } from "./scheduling.entity";
import { ServiceProviderProfile } from "./service-provider-profile.entity";

export interface IUser {
  id: string;
  username: string;
  realName: string;
  email: string;
  passwordHash: string;
  type: string;
  createdAt: Date;
  serviceProviderProfile?: ServiceProviderProfile;
  getScheduledServices(): Scheduling[] | undefined;
}

export class User implements IUser {
  constructor(
    public readonly id: string,
    public username: string,
    public realName: string,
    public email: string,
    public passwordHash: string,
    public type: string,
    public createdAt: Date,
    public serviceProviderProfile?: ServiceProviderProfile,
    private scheduledServices?: Scheduling[],
  ) {}

  public getScheduledServices(): Scheduling[] | undefined {
    return this.scheduledServices;
  }
}
