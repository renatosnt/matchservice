import { Service } from "../entities/service.entity";
import { IServicePort } from "../ports/service-port";

export class searchServiceUsecase {
  private readonly servicePort: IServicePort;

  constructor(servicePort: IServicePort) {
    this.servicePort = servicePort;
  }

  async execute(
    title?: string,
    description?: string,
    category?: string,
    creatorProfileId?: string,
  ): Promise<Service[] | null> {
    return this.servicePort.search(
      title,
      description,
      category,
      creatorProfileId,
    );
  }
}
