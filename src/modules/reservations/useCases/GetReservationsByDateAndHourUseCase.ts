import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/errors/AppError";
import { IReservationRepository } from "../repositories/IReservationRepository";

@injectable()
export class GetReservationsByDateAndHourUseCase {
  constructor(
    @inject("IReservationRepository")
    private reservationRepository: IReservationRepository
  ) {}

  async execute(date: Date, hour: string) {
    const reservations =
      await this.reservationRepository.getReservationByDateAndHour(date, hour);

    if (reservations.length < 1) {
      throw new AppError(`Nenhuma reserva encontrada`, 404);
    }

    return reservations;
  }
}
