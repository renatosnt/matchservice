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
  getServices(): Service[];
  getSchedule(): Scheduling[];

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
    this.services!.push(service);
    return this;
  }

  public getServices(): Service[] {
    return this.services!;
  }

  public getSchedule(): Scheduling[] {
    return this.schedule!;
  }
}
