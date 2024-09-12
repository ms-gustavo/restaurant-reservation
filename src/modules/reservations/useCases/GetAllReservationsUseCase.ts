import { inject, injectable } from "tsyringe";
import { IReservationRepository } from "../repositories/IReservationRepository";
import { AppError } from "../../../shared/errors/AppError";

@injectable()
export class GetAllReservationsUseCase {
  constructor(
    @inject("IReservationRepository")
    private reservationRepository: IReservationRepository
  ) {}

  async execute() {
    const reservations = await this.reservationRepository.getAllReservations();

    if (reservations.length < 1) {
      throw new AppError(`Nenhuma reserva encontrada`, 404);
    }

    return reservations;
  }
}
