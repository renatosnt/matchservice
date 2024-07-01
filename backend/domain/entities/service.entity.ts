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
  creatorProfile: ServiceProviderProfile;
  getSchedule(): Scheduling[];
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
    public creatorProfile: ServiceProviderProfile,
    private schedule: Scheduling[],
  ) {}


  public getSchedule(): Scheduling[] {
    return this.schedule;
  }

  public addSchedule(schedule: Scheduling): Service {
    this.schedule.push(schedule);
    return this;
  }
}
