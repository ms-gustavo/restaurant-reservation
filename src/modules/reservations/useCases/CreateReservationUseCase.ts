import { IReservationRepository } from "../repositories/IReservationRepository";
import { CreateReservationDTO } from "../dtos/createReservationDTO";
import prisma from "../../../shared/prisma/client";
import { AppError } from "../../../shared/errors/AppError";

export class CreateReservationUseCase {
  constructor(private reservationRepository: IReservationRepository) {}

  async execute(data: CreateReservationDTO): Promise<void> {
    const maxCapacity = parseInt(process.env.MAX_CAPACITY as string);

    const totalClientsInHour = await prisma.reservation.aggregate({
      _sum: {
        reserveSize: true,
      },
      where: {
        date: data.date,
        hour: data.hour,
      },
    });

    const actualCapacity = totalClientsInHour._sum?.reserveSize || 0;

    if (actualCapacity + data.reserveSize > maxCapacity) {
      throw new AppError(`Capacidade máxima de reservas excedida`, 409);
    }

    await this.reservationRepository.create(data);
  }
}
