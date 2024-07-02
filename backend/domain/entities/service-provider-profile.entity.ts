import { Scheduling } from "./scheduling.entity";
import { Service } from "./service.entity";
import { User } from "./user.entity";

export interface IServiceProviderProfile {
  id: string;
  userId: string;
  telephoneNumber: string;
  specialty: string;
  averageRating: number;

  user?: User;
  getServices(): Service[] | undefined;
  setServices(services: Service[]): void;
  getSchedule(): Scheduling[] | undefined;

  addService(service: Service): ServiceProviderProfile;
}

export class ServiceProviderProfile implements IServiceProviderProfile {
  constructor(
    public readonly id: string,
    public userId: string,
    public telephoneNumber: string,
    public specialty: string,
    public averageRating: number,
    public user?: User,
    private services?: Service[],
    private schedule?: Scheduling[],
  ) {}

  public addService(service: Service): ServiceProviderProfile {
    if (this.services === undefined)
      throw new Error("The service array is uninitialized.");
    this.services.push(service);
    return this;
  }

  public setServices(services: Service[]): void {
    this.services = services;
  }

  public getServices(): Service[] | undefined {
    return this.services;
  }

  public getSchedule(): Scheduling[] | undefined {
    return this.schedule;
  }
}
