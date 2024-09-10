import { Request, Response } from "express";
import { CreateReservationUseCase } from "../useCases/CreateReservationUseCase";
import { PrismaReservationRepository } from "../repositories/PrismaReservationRepository";
import { AppError } from "../../../shared/errors/AppError";
import { CreateReservationDTO } from "../dtos/createReservationDTO";

const reservationRepository = new PrismaReservationRepository();

export class ReservationController {
  async create(request: Request, response: Response): Promise<Response> {
    const { date, hour, client, email, reserveSize }: CreateReservationDTO =
      request.body;

    const createReservationUseCase = new CreateReservationUseCase(
      reservationRepository
    );

    try {
      await createReservationUseCase.execute({
        date,
        hour,
        client,
        email,
        reserveSize,
      });

      return response
        .status(201)
        .json({ message: `Reserva criada com sucesso!` });
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return response
          .status(error.statusCode)
          .json({ message: error.message });
      }
      return response.status(500).json({
        status: "error",
        message: "Erro ao criar a reserva",
        details: (error as Error).message,
      });
    }
  }

  async getAllReservations(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const reservations = await reservationRepository.getAllReservations();

      if (reservations.length < 1) {
        throw new AppError("Nenhuma reserva encontrada", 404);
      }

      return response.status(200).json(reservations);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return response
          .status(error.statusCode)
          .json({ message: error.message });
      }
      return response.status(500).json({
        status: "error",
        message: "Erro ao buscar as reservas",
        details: (error as Error).message,
      });
    }
  }

  async getReservationByDate(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { date } = request.query;

    try {
      const reservations = await reservationRepository.getReservationByDate(
        new Date(date as string)
      );

      if (reservations.length < 1) {
        throw new AppError("Nenhuma reserva encontrada", 404);
      }

      return response.status(200).json(reservations);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return response
          .status(error.statusCode)
          .json({ message: error.message });
      }
      return response.status(500).json({
        status: "error",
        message: "Erro ao buscar as reservas",
        details: (error as Error).message,
      });
    }
  }

  async getReservationByDateAndHour(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { date, hour } = request.query;

    try {
      const reservations =
        await reservationRepository.getReservationByDateAndHour(
          new Date(date as string),
          hour as string
        );

      if (reservations.length < 1) {
        throw new AppError("Nenhuma reserva encontrada", 404);
      }
      return response.status(200).json(reservations);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return response
          .status(error.statusCode)
          .json({ message: error.message });
      }
      return response.status(500).json({
        status: "error",
        message: "Erro ao buscar as reservas",
        details: (error as Error).message,
      });
    }
  }
}
