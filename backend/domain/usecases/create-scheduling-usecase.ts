import { Scheduling } from "../entities/scheduling.entity";
import { SchedulingRepository } from "../repositories/scheduling-repository";

export class createSchedulingUsecase {
    private readonly schedulingRepository: SchedulingRepository;

    constructor(schedulingRepository: SchedulingRepository) {
        this.schedulingRepository = schedulingRepository;
    }

    async execute(scheduling: Scheduling): Promise<Scheduling | null> {
        return this.schedulingRepository.save(scheduling);
    }
}