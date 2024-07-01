import { Service } from "../entities/service.entity";
import { User } from "../entities/user.entity";
import { UUID } from "crypto";

export interface IUserPort {
  getById(id: UUID): Promise<User>;
  getUserServicesById(id: UUID): Promise<Service[]>;
  getByUsername(username: string): Promise<User>;
  save(user: User): Promise<User>;
}
