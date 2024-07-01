import { UUID } from "crypto";
import { Service } from "../entities/service.entity";
import { IServicePort } from "../ports/service-port";

export class getServiceUsecase {
  private readonly servicePort: IServicePort;

  constructor(servicePort: IServicePort) {
    this.servicePort = servicePort;
  }

  async execute(id: UUID): Promise<Service | null> {
    return this.servicePort.getById(id);
  }
}
