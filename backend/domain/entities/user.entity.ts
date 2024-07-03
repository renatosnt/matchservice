import { UUID } from "crypto";

export interface IUser {
  id: UUID;
  username: string;
  realName: string;
  email: string;
  password: string;
  type: string;
  createdAt?: Date;
  serviceProviderProfileId?: UUID | null;
  getScheduledServices(): UUID[];
  addSchedule(scheduleId: UUID): void;
}

export class User implements IUser {
  constructor(
    public readonly id: UUID,
    public username: string,
    public realName: string,
    public email: string,
    public password: string,
    public type: string,
    private scheduledServices: UUID[],
    public serviceProviderProfileId?: UUID | null,
    public createdAt?: Date,
  ) {}

  public getScheduledServices(): UUID[] {
    return this.scheduledServices;
  }

  public addSchedule(scheduleId: UUID) {
    this.scheduledServices.push(scheduleId);
  }
}
