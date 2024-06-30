import { Scheduling } from "../entities/scheduling.entity";
import { ISchedulingRepository } from "../repositories/scheduling-repository";

export class createSchedulingUsecase {
  private readonly schedulingRepository: ISchedulingRepository;

  constructor(schedulingRepository: ISchedulingRepository) {
    this.schedulingRepository = schedulingRepository;
  }

  async execute(scheduling: Scheduling): Promise<Scheduling | null> {
    return this.schedulingRepository.save(scheduling);
  }
}
