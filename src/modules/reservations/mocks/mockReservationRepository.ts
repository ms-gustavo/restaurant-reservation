import { IReservationRepository } from "../repositories/IReservationRepository";

export const mockReservationRepository: jest.Mocked<IReservationRepository> = {
  create: jest.fn(),
  getAllReservations: jest.fn(),
  getReservationById: jest.fn(),
  getReservationByDate: jest.fn(),
  getReservationByDateAndHour: jest.fn(),
  cancelReservation: jest.fn(),
  getTotalReservedByDate: jest.fn(),
};
