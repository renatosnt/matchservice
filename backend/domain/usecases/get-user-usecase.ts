import { UUID } from "crypto";
import { User } from "../entities/user.entity";
import { IUserPort } from "../ports/user-port";

export class getUserUsecase {
  private readonly userPort: IUserPort;

  constructor(userPort: IUserPort) {
    this.userPort = userPort;
  }

  async execute(id: UUID): Promise<User | null> {
    return this.userPort.getById(id);
  }
}
