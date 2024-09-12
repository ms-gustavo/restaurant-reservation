import { ReservationController } from "../controllers/ReservationController";
import { CancelReservationUseCase } from "../useCases/CancelReservationUseCase";
import { CreateReservationUseCase } from "../useCases/CreateReservationUseCase";
import { GetAllReservationsUseCase } from "../useCases/GetAllReservationsUseCase";
import { GetReservationsByDateAndHourUseCase } from "../useCases/GetReservationsByDateAndHourUseCase";
import { GetReservationsByDateUseCase } from "../useCases/GetReservationsByDateUseCase";
import { mockReservationRepository } from "./mockReservationRepository";

export const reservationController: ReservationController =
  new ReservationController();

export const mockCreateReservationUseCase: jest.Mocked<CreateReservationUseCase> =
  new CreateReservationUseCase(
    mockReservationRepository
  ) as jest.Mocked<CreateReservationUseCase>;

export const mockGetAllReservationsUseCase = new GetAllReservationsUseCase(
  mockReservationRepository
) as jest.Mocked<GetAllReservationsUseCase>;

export const mockGetReservationsByDateUseCase =
  new GetReservationsByDateUseCase(
    mockReservationRepository
  ) as jest.Mocked<GetReservationsByDateUseCase>;

export const mockGetReservationsByDateAndHourUseCase =
  new GetReservationsByDateAndHourUseCase(
    mockReservationRepository
  ) as jest.Mocked<GetReservationsByDateAndHourUseCase>;

export const mockCancelReservationUseCase = new CancelReservationUseCase(
  mockReservationRepository
) as jest.Mocked<CancelReservationUseCase>;

export const reservations = [
  {
    id: 1,
    date: new Date(),
    hour: new Date(),
    client: "John Doe",
    email: "john@example.com",
    reserveSize: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const createReservationsUtils = {
  successMessage: `Reserva criada com sucesso!`,
  errorMaxCapacityMessage: `Capacidade máxima de reservas excedida para a data escolhida`,
  errorUnknownMessage: `Erro ao criar a reserva`,
  statusCode: 409,
};

export const getReservationsUtils = {
  errorNotFoundMessage: "Nenhuma reserva encontrada",
  errorUnknownMessage: "Erro ao buscar as reservas",
  statusCode: 404,
};

export const cancelReservationUtils = {
  successMessage: `Reserva cancelada com sucesso!`,
  errorNotFoundMessage: `Reserva não encontrada`,
  errorUnknownMessage: `Erro ao cancelar a reserva`,
  statusCode: 404,
};
