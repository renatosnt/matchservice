import { UUID } from "crypto";

export interface IService {
  id: UUID;
  title: string;
  description: string;
  viewCount: number;
  category: string;
  locationState: string;
  locationCity: string;
  creatorProfileId: UUID;
  createdAt?: Date;
  basePrice?: string;
  pictureLinks?: string[];
  getSchedule(): UUID[];
  addSchedule(scheduleId: UUID): Service;
}

export class Service implements IService {
  public basePrice?: string;
  public pictureLinks?: string[];
  constructor(
    public readonly id: UUID,
    public title: string,
    public description: string,
    public viewCount: number,
    public category: string,
    public locationState: string,
    public locationCity: string,
    public creatorProfileId: UUID,
    private schedule: UUID[],
    public createdAt?: Date,
  ) {
    this.basePrice = "0";
    this.pictureLinks = [];
  }

  public getSchedule(): UUID[] {
    return this.schedule;
  }

  public addSchedule(scheduleId: UUID): Service {
    if (this.schedule === undefined)
      throw new Error("The schedule array is uninitialized.");
    this.schedule.push(scheduleId);
    return this;
  }
}
