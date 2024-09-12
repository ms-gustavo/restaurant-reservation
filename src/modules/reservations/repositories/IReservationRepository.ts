import { Reservation } from "@prisma/client";
import { CreateReservationDTO } from "../dtos/createReservationDTO";

export interface IReservationRepository {
  create(data: CreateReservationDTO): Promise<Reservation>;
  getAllReservations(): Promise<Reservation[]>;
  getReservationByDate(date: Date): Promise<Reservation[]>;
  getReservationByDateAndHour(date: Date, hour: string): Promise<Reservation[]>;
  getTotalReservedByDate(date: Date): Promise<number>;
  getReservationById(reservationId: number): Promise<Reservation | null>;
  cancelReservation(reservationId: number): Promise<void>;
}
