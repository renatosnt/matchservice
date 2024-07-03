import { UUID } from "crypto";
import { Scheduling } from "../domain/entities/scheduling.entity";
import { ISchedulingPort } from "../domain/ports/scheduling-port";

export class SchedulingAdapter implements ISchedulingPort {
  private readonly schedulingRepository: ISchedulingPort;

  constructor(schedulingRepository: ISchedulingPort) {
    this.schedulingRepository = schedulingRepository;
  }

  async getById(id: UUID): Promise<Scheduling> {
    return await this.schedulingRepository.getById(id);
  }

  async deleteById(id: UUID): Promise<Scheduling> {
    return await this.schedulingRepository.deleteById(id);
  }

  async getByServiceProviderProfileId(
    serviceProviderId: UUID,
  ): Promise<Scheduling[]> {
    return await this.schedulingRepository.getByServiceProviderProfileId(
      serviceProviderId,
    );
  }

  async getByCustomerId(customerId: UUID): Promise<Scheduling[]> {
    return await this.schedulingRepository.getByCustomerId(customerId);
  }

  async getByServiceId(serviceId: UUID): Promise<Scheduling[]> {
    return await this.schedulingRepository.getByCustomerId(serviceId);
  }

  async save(scheduling: Scheduling): Promise<Scheduling> {
    return await this.schedulingRepository.save(scheduling);
  }
}
