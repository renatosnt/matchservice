import { User } from "../entities/user.entity";
import { UserRepository } from "../repositories/user-repository";

export class createUserUsecase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(user: User): Promise<User | null> {
    return this.userRepository.save(user);
  }
}
