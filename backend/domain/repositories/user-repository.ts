import { User } from "../entities/user.entity";
import { UUID } from "crypto";

export interface IUserRepository {
  getById(id: UUID): User;
  getByUsername(username: string): User;
  save(user: User): User;
}
