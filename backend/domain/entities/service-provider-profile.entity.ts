import { Scheduling } from "./scheduling.entity";
import { Service } from "./service.entity";
import { User } from "./user.entity";

export interface ServiceProviderProfile {
  id: string;
  user: User;
  userId: string;
  telephoneNumber: string;
  specialty: string;
  averageRating: number;
  services: Service[];
  history: Scheduling[];
}
