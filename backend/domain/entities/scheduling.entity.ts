import { UUID } from "crypto";

export interface IScheduling {
  id: UUID;
  serviceId: UUID;
  scheduledDate: Date;
  isCompleted: boolean;
  isCanceled: boolean;
  rating: number;
  serviceProviderProfileId: string;
  customerId: UUID;
}

export class Scheduling implements IScheduling {
  constructor(
    public readonly id: UUID,
    public serviceId: UUID,
    public scheduledDate: Date,
    public isCompleted: boolean,
    public isCanceled: boolean,
    public rating: number,
    public serviceProviderProfileId: string,
    public customerId: UUID,
  ) {}
}
