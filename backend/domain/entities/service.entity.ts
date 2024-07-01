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
  active: boolean;
  creatorProfile: ServiceProviderProfile;
  getAvailableDates(): Date[];
  getSchedules(): Scheduling[];
  addAvailableDate(date: Date): Service;
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
    public active: boolean,
    public creatorProfile: ServiceProviderProfile,
    private availableDates: Date[],
    private schedules: Scheduling[],
  ) {}

  public getAvailableDates(): Date[] {
    return this.availableDates;
  }

  public getSchedules(): Scheduling[] {
    return this.schedules;
  }

  public addAvailableDate(date: Date) {
    this.availableDates.push(date);
    return this;
  }
}
