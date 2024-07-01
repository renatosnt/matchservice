import { UUID } from "crypto";
import { User } from "../domain/entities/user.entity";
import { IUserPort } from "../domain/ports/user-port";
import { Service } from "../domain/entities/service.entity";

export class UserAdapter implements IUserPort {
  private readonly userRepository: IUserPort;

  constructor(userRepository: IUserPort) {
    this.userRepository = userRepository;
  }

  async getById(id: UUID): Promise<User> {
    return await this.userRepository.getById(id);
  }

  async getUserServicesById(id: UUID): Promise<Service[]> {
    return await this.userRepository.getUserServicesById(id);
  }

  async getByUsername(username: string): Promise<User> {
    return await this.userRepository.getByUsername(username);
  }

  async save(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}
