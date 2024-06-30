import { User } from "../entities/user.entity";
import { IUserRepository } from "../repositories/user-repository";

export class createUserUsecase {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(user: User): Promise<User | null> {
    return this.userRepository.save(user);
  }
}
