import { Scheduling } from "./scheduling.entity";
import { Service } from "./service.entity";
import { User } from "./user.entity";

export interface IServiceProviderProfile {
  id: string;
  user: User;
  userId: string;
  telephoneNumber: string;
  specialty: string;
  averageRating: number;

  getServices(): Service[];
  getHistory(): Scheduling[];

  addService(service: Service): ServiceProviderProfile;
}

export class ServiceProviderProfile implements IServiceProviderProfile {
  constructor(
    public readonly id: string,
    public user: User,
    public userId: string,
    public telephoneNumber: string,
    public specialty: string,
    public averageRating: number,
    private services: Service[],
    private history: Scheduling[],
  ) {}

  public addService(service: Service): ServiceProviderProfile {
    this.services.push(service);
    return this;
  }

  public getServices(): Service[] {
    return this.services;
  }

  public getHistory(): Scheduling[] {
    return this.history;
  }
}
