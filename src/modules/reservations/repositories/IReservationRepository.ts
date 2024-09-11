import { Reservation } from "@prisma/client";
import { CreateReservationDTO } from "../dtos/createReservationDTO";

export interface IReservationRepository {
  create(data: CreateReservationDTO): Promise<Reservation>;
  getTotalReservedByDate(date: Date): Promise<number>;
}
