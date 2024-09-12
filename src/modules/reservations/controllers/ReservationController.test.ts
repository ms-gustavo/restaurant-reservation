import "reflect-metadata";
import { Request, Response } from "express";
import { container } from "tsyringe";
import {
  createReservationsUtils,
  getReservationsUtils,
  mockCancelReservationUseCase,
  mockCreateReservationUseCase,
  mockGetAllReservationsUseCase,
  mockGetReservationsByDateAndHourUseCase,
  mockGetReservationsByDateUseCase,
  reservationController,
  reservations,
} from "../mocks/mockReservationController";
import { AppError } from "../../../shared/errors/AppError";
import { cancelReservationUtils } from "../mocks/mockReservationController";

jest.mock("../useCases/CreateReservationUseCase");
jest.mock("../useCases/GetAllReservationsUseCase");
jest.mock("../useCases/GetReservationsByDateUseCase");
jest.mock("../useCases/GetReservationsByDateAndHourUseCase");
jest.mock("../useCases/CancelReservationUseCase");

let mockRequest: Partial<Request>;
let mockResponse: Partial<Response>;
describe("Create - ReservationController", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockRequest = {
      body: {
        date: new Date(),
        hour: new Date(),
        client: "John Doe",
        email: "john@example.com",
        reserveSize: 4,
      },
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest
      .spyOn(container, "resolve")
      .mockReturnValue(mockCreateReservationUseCase);
  });

  it("should create a reservation and return 201 status", async () => {
    await reservationController.create(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockCreateReservationUseCase.execute).toHaveBeenCalledWith(
      mockRequest.body
    );
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: createReservationsUtils.successMessage,
    });
  });

  it("should return 409 if an AppError is thrown due to exceeding capacity", async () => {
    const appError = new AppError(
      createReservationsUtils.errorMaxCapacityMessage,
      createReservationsUtils.statusCode
    );

    mockCreateReservationUseCase.execute.mockRejectedValueOnce(appError);

    await reservationController.create(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(
      createReservationsUtils.statusCode
    );
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: createReservationsUtils.errorMaxCapacityMessage,
    });
  });

  it("should return 500 if an error occurs", async () => {
    mockCreateReservationUseCase.execute.mockRejectedValueOnce(
      new Error("Erro ao criar a reserva")
    );

    await reservationController.create(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "error",
      message: createReservationsUtils.errorUnknownMessage,
      details: createReservationsUtils.errorUnknownMessage,
    });
  });
});

describe("Get All - Reservation Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest
      .spyOn(container, "resolve")
      .mockReturnValue(mockGetAllReservationsUseCase);
  });
  it("should return all reservations", async () => {
    mockGetAllReservationsUseCase.execute.mockResolvedValueOnce(reservations);

    await reservationController.getAllReservations(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(reservations);
  });

  it("should return 409 if an AppError is thrown due to not found reservation", async () => {
    const appError = new AppError(
      getReservationsUtils.errorNotFoundMessage,
      getReservationsUtils.statusCode
    );

    mockGetAllReservationsUseCase.execute.mockRejectedValueOnce(appError);

    await reservationController.getAllReservations(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(
      getReservationsUtils.statusCode
    );
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: getReservationsUtils.errorNotFoundMessage,
    });
  });

  it("should return 500 if an error occurs", async () => {
    mockGetAllReservationsUseCase.execute.mockRejectedValueOnce(
      new Error(getReservationsUtils.errorUnknownMessage)
    );

    await reservationController.getAllReservations(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "error",
      message: getReservationsUtils.errorUnknownMessage,
      details: getReservationsUtils.errorUnknownMessage,
    });
  });
});

describe("Get By Date - Reservation Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockRequest = {
      query: {
        date: new Date().toISOString(),
      },
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest
      .spyOn(container, "resolve")
      .mockReturnValue(mockGetReservationsByDateUseCase);
  });

  it("should return all reservations by date", async () => {
    mockGetReservationsByDateUseCase.execute.mockResolvedValue(reservations);

    await reservationController.getReservationByDate(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(reservations);
  });

  it("should return 409 if an AppError is thrown due to not found reservation", async () => {
    const appError = new AppError(
      getReservationsUtils.errorNotFoundMessage,
      getReservationsUtils.statusCode
    );

    mockGetReservationsByDateUseCase.execute.mockRejectedValueOnce(appError);

    await reservationController.getReservationByDate(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(
      getReservationsUtils.statusCode
    );
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: getReservationsUtils.errorNotFoundMessage,
    });
  });

  it("should return 500 if an error occurs", async () => {
    mockGetReservationsByDateUseCase.execute.mockRejectedValueOnce(
      new Error(getReservationsUtils.errorUnknownMessage)
    );

    await reservationController.getReservationByDate(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "error",
      message: getReservationsUtils.errorUnknownMessage,
      details: getReservationsUtils.errorUnknownMessage,
    });
  });
});

describe("Get By Date and Hour - Reservation Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockRequest = {
      query: {
        date: new Date().toISOString(),
        hour: new Date().toISOString(),
      },
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest
      .spyOn(container, "resolve")
      .mockReturnValue(mockGetReservationsByDateAndHourUseCase);
  });

  it("should return all reservations by date and hour", async () => {
    mockGetReservationsByDateAndHourUseCase.execute.mockResolvedValue(
      reservations
    );

    await reservationController.getReservationByDateAndHour(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(reservations);
  });

  it("should return 409 if an AppError is thrown due to not found reservation", async () => {
    const appError = new AppError(
      getReservationsUtils.errorNotFoundMessage,
      getReservationsUtils.statusCode
    );

    mockGetReservationsByDateAndHourUseCase.execute.mockRejectedValueOnce(
      appError
    );

    await reservationController.getReservationByDateAndHour(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(
      getReservationsUtils.statusCode
    );
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: getReservationsUtils.errorNotFoundMessage,
    });
  });

  it("should return 500 if an error occurs", async () => {
    mockGetReservationsByDateAndHourUseCase.execute.mockRejectedValueOnce(
      new Error(getReservationsUtils.errorUnknownMessage)
    );

    await reservationController.getReservationByDateAndHour(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "error",
      message: getReservationsUtils.errorUnknownMessage,
      details: getReservationsUtils.errorUnknownMessage,
    });
  });
});

describe("Cancel Reservation - Reservation Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockRequest = {
      params: {
        id: "1",
      },
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest
      .spyOn(container, "resolve")
      .mockReturnValue(mockCancelReservationUseCase);
  });

  it("should cancel a reservation and return 200 status", async () => {
    await reservationController.cancelReservation(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockCancelReservationUseCase.execute).toHaveBeenCalledWith(
      Number(mockRequest!.params!.id)
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: cancelReservationUtils.successMessage,
    });
  });

  it("should return 409 if an AppError is thrown due to not found reservation", async () => {
    const appError = new AppError(
      cancelReservationUtils.errorNotFoundMessage,
      cancelReservationUtils.statusCode
    );

    mockCancelReservationUseCase.execute.mockRejectedValueOnce(appError);

    await reservationController.cancelReservation(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(
      cancelReservationUtils.statusCode
    );
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: cancelReservationUtils.errorNotFoundMessage,
    });
  });

  it("should return 500 if an error occurs", async () => {
    mockCancelReservationUseCase.execute.mockRejectedValueOnce(
      new Error(cancelReservationUtils.errorUnknownMessage)
    );

    await reservationController.cancelReservation(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "error",
      message: cancelReservationUtils.errorUnknownMessage,
      details: cancelReservationUtils.errorUnknownMessage,
    });
  });
});
