import { UUID } from "crypto";

export interface IServiceProviderProfile {
  id: UUID;
  userId: UUID;
  telephoneNumber: string;
  specialty: string;
  averageRating: number;

  getServices(): UUID[];
  setServices(services: UUID[]): void;
  getSchedule(): UUID[];

  addService(serviceId: UUID): IServiceProviderProfile;
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

  public setServices(services: UUID[]): void {
    this.services = services;
  }

  public getServices(): UUID[] {
    return this.services;
  }

  public getSchedule(): UUID[] {
    return this.schedule;
  }
}
