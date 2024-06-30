import { Location } from "../entities/location.entity";
import { UUID } from "crypto";

export interface LocationRepository {
  getById(id: UUID): Location;
  getByLatitudeLongitude(latitude: number, longitude: number): Location;
  save(location: Location): void;
}
