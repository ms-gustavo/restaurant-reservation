import { IReservationRepository } from "../repositories/IReservationRepository";
import { CreateReservationDTO } from "../dtos/createReservationDTO";
import { AppError } from "../../../shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateReservationUseCase {
  constructor(
    @inject("IReservationRepository")
    private reservationRepository: IReservationRepository
  ) {}

  async execute(data: CreateReservationDTO): Promise<void> {
    const maxCapacity = parseInt(process.env.MAX_CAPACITY as string);

    const totalReserved =
      await this.reservationRepository.getTotalReservedByDate(data.date);

    if (totalReserved + data.reserveSize > maxCapacity) {
      throw new AppError(
        `Capacidade máxima de reservas excedida para a data escolhida`,
        409
      );
    }
    await this.reservationRepository.create(data);
  }
}
