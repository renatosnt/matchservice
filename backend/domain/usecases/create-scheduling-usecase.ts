import { Scheduling } from "../entities/scheduling.entity";
import { ISchedulingPort } from "../ports/scheduling-port";

export class createSchedulingUsecase {
  private readonly schedulingPort: ISchedulingPort;

  constructor(schedulingPort: ISchedulingPort) {
    this.schedulingPort = schedulingPort;
  }

  async execute(scheduling: Scheduling): Promise<Scheduling | null> {
    return this.schedulingPort.save(scheduling);
  }
}
