import { Service } from "./service.entity";

export interface Location {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
  services: Service[];
}
