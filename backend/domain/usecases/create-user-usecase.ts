import { User } from "../entities/user.entity";
import { IUserPort } from "../ports/user-port";

export class createUserUsecase {
  private readonly userPort: IUserPort;

  constructor(userPort: IUserPort) {
    this.userPort = userPort;
  }

  async execute(user: User): Promise<User | null> {
    return this.userPort.save(user);
  }
}
