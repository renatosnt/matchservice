import { User } from "@prisma/client";
import { UUID } from "crypto";

export interface UserRepository {
  getById(id: UUID): User;
  getByUsername(username: string): User;
  update(user: User): void;
  save(user: User): void;
}
