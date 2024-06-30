import { UUID } from "crypto";
import { User } from "../entities/user.entity";
import { IUserRepository } from "../repositories/user-repository";

export class getUserUsecase {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(id: UUID): Promise<User | null> {
    return this.userRepository.getById(id);
  }
}
