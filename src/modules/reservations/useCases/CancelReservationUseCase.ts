import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/errors/AppError";
import { IReservationRepository } from "../repositories/IReservationRepository";

@injectable()
export class CancelReservationUseCase {
  constructor(
    @inject("IReservationRepository")
    private reservationRepository: IReservationRepository
  ) {}

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
