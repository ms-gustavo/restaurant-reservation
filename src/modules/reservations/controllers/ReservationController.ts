import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateReservationUseCase } from "../useCases/CreateReservationUseCase";
import { AppError } from "../../../shared/errors/AppError";
import { CreateReservationDTO } from "../dtos/createReservationDTO";
import { CancelReservationUseCase } from "../useCases/CancelReservationUseCase";
import { GetReservationsByDateUseCase } from "../useCases/GetReservationsByDateUseCase";
import { GetAllReservationsUseCase } from "../useCases/GetAllReservationsUseCase";
import { GetReservationsByDateAndHourUseCase } from "../useCases/GetReservationsByDateAndHourUseCase";

export class ReservationController {
  async create(request: Request, response: Response): Promise<Response> {
    const { date, hour, client, email, reserveSize }: CreateReservationDTO =
      request.body;

    try {
      const createReservationUseCase = container.resolve(
        CreateReservationUseCase
      );

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
      const getAllReservations = container.resolve(GetAllReservationsUseCase);

      const reservations = await getAllReservations.execute();

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
      const getReservationsByDateUseCase = container.resolve(
        GetReservationsByDateUseCase
      );

      const reservations = await getReservationsByDateUseCase.execute(
        new Date(date as string)
      );

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
      const getReservationsByDateUseCase = container.resolve(
        GetReservationsByDateAndHourUseCase
      );

      const reservations = await getReservationsByDateUseCase.execute(
        new Date(date as string),
        hour as string
      );

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

  async cancelReservation(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;

    try {
      const cancelReservationUseCase = container.resolve(
        CancelReservationUseCase
      );

      await cancelReservationUseCase.execute(Number(id));

      return response
        .status(200)
        .json({ message: `Reserva cancelada com sucesso!` });
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return response
          .status(error.statusCode)
          .json({ message: error.message });
      }
      return response.status(500).json({
        status: "error",
        message: "Erro ao cancelar a reserva",
        details: (error as Error).message,
      });
    }
  }
}
