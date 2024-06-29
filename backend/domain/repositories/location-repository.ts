import { Location } from "../entities/location.entity";
import { UUID } from "crypto";

export interface LocationRepository {
  getById(id: UUID): Location;
  getByLatitudeLongitude(latitude: number, longitude: number): Location;
  update(location: Location): void;
  save(location: Location): void;
}
