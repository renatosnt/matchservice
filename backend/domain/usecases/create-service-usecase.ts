import { Service } from "../entities/service.entity";
import { IServicePort } from "../ports/service-port";

export class createServiceUsecase {
  private readonly servicePort: IServicePort;

  constructor(servicePort: IServicePort) {
    this.servicePort = servicePort;
  }

  async execute(service: Service): Promise<Service | null> {
    return this.servicePort.save(service);
  }
}
