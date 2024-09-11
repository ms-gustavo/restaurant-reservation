import { AppError } from "../../../shared/errors/AppError";
import { IReservationRepository } from "../repositories/IReservationRepository";

export class CancelReservationUseCase {
  constructor(private reservationRepository: IReservationRepository) {}

  async execute(reservationId: number): Promise<void> {
    const reservation = await this.reservationRepository.getReservationById(
      reservationId
    );

    if (!reservation) {
      throw new AppError(`Reserva não encontrada`, 404);
    }

    await this.reservationRepository.cancelReservation(reservationId);
  }
}
