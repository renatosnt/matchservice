import { UUID } from "crypto";
import { Scheduling } from "./scheduling.entity";

export interface IServiceProviderProfile {
  id: UUID;
  userId: UUID;
  telephoneNumber: string;
  specialty: string;
  averageRating: number;

  getServices(): UUID[];
  setServices(services: UUID[]): void;
  getSchedule(): UUID[];
  calculateAndSetAverageRating(schedules: Scheduling[]): number;
  addService(serviceId: UUID): IServiceProviderProfile;
  addSchedule(scheduleId: UUID): void;
}

export class ServiceProviderProfile implements IServiceProviderProfile {
  constructor(
    public readonly id: UUID,
    public userId: UUID,
    public telephoneNumber: string,
    public specialty: string,
    public averageRating: number,
    private services: UUID[],
    private schedule: UUID[],
  ) {}

  public addService(serviceId: UUID): ServiceProviderProfile {
    if (this.services === undefined)
      throw new Error("The service array is uninitialized.");
    this.services.push(serviceId);
    return this;
  }

  public calculateAndSetAverageRating(schedules: Scheduling[]) {
    if (schedules.length === 0) return 0;

    let res = 0;
    let count = 0;
    for (let index = 0; index < schedules.length; index++) {
      if (!schedules[index].isCompleted) continue;
      res += schedules[index].rating;
      count++;
    }
    if (count === 0) return 0;

    const result = res / count;
    this.averageRating = result;
    return result;
  }

  public setServices(services: UUID[]): void {
    this.services = services;
  }

  public getServices(): UUID[] {
    return this.services;
  }

  public getSchedule(): UUID[] {
    return this.schedule;
  }

  public addSchedule(scheduleId: UUID) {
    this.schedule.push(scheduleId);
  }
}
