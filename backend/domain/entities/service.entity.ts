import { Scheduling } from "./scheduling.entity";
import { ServiceProviderProfile } from "./service-provider-profile.entity";

export interface IService {
  id: string;
  title: string;
  description: string;
  viewCount: number;
  category: string;
  locationState: string;
  locationCity: string;
  createdAt: Date;
  creatorProfileId: string;
  creatorProfile?: ServiceProviderProfile;
  getSchedule(): Scheduling[] | undefined;
  addSchedule(schedule: Scheduling): Service;
}

export class Service implements IService {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string,
    public viewCount: number,
    public category: string,
    public locationState: string,
    public locationCity: string,
    public createdAt: Date,
    public creatorProfileId: string,
    public creatorProfile?: ServiceProviderProfile,
    private schedule?: Scheduling[],
  ) {}

  public getSchedule(): Scheduling[] | undefined {
    return this.schedule;
  }

  public addSchedule(schedule: Scheduling): Service {
    if (this.schedule === undefined)
      throw new Error("The schedule array is uninitialized.");
    this.schedule.push(schedule);
    return this;
  }
}
