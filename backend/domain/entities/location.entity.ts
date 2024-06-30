import { Service } from "./service.entity";

export interface ILocation {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
  getRelatedSevices(): Service[];
}

export class Location implements ILocation {
  constructor(
    public readonly id: string,
    public address: string,
    public latitude: number,
    public longitude: number,
    private services: Service[],
  ) {}

  public getRelatedSevices(): Service[] {
    return this.services;
  }
}
