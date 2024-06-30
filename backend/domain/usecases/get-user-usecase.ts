import { UUID } from "crypto";
import { User } from "../entities/user.entity";
import { UserRepository } from "../repositories/user-repository";

export class getUserUsecase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(id: UUID): Promise<User | null> {
    return this.userRepository.getById(id);
  }
}
