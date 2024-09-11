import { Reservation } from "@prisma/client";
import { IReservationRepository } from "./IReservationRepository";
import { CreateReservationDTO } from "../dtos/createReservationDTO";
import prisma from "../../../shared/prisma/client";

export class PrismaReservationRepository implements IReservationRepository {
  async create(data: CreateReservationDTO): Promise<Reservation> {
    const reserve = await prisma.reservation.create({
      data: {
        date: data.date,
        hour: data.hour,
        client: data.client,
        email: data.email,
        reserveSize: data.reserveSize,
      },
    });
    return reserve;
  }

  async getTotalReservedByDate(date: Date): Promise<number> {
    const parsedDate = new Date(date);
    const startOfDay = new Date(parsedDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(parsedDate.setHours(23, 59, 59, 999));

    const total = await prisma.reservation.aggregate({
      _sum: {
        reserveSize: true,
      },
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    return total._sum.reserveSize || 0;
  }

  async getAllReservations(): Promise<Reservation[]> {
    return prisma.reservation.findMany();
  }

  async getReservationByDate(date: Date): Promise<Reservation[]> {
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    return prisma.reservation.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
  }

  async getReservationByDateAndHour(
    date: Date,
    hour: string
  ): Promise<Reservation[]> {
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    return prisma.reservation.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
        hour,
      },
    });
  }
}
