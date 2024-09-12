import "reflect-metadata";
import { CreateReservationUseCase } from "./CreateReservationUseCase";
import { mockReservationRepository } from "../mocks/mockReservationRepository";
import { AppError } from "../../../shared/errors/AppError";

describe("Create Reservation Use Case", () => {
  let createReservationUseCase: CreateReservationUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    createReservationUseCase = new CreateReservationUseCase(
      mockReservationRepository
    );
  });

  it("should create a new reservation", async () => {
    const reservationData = {
      date: new Date(),
      hour: new Date(),
      client: "John Doe",
      email: "johndoe@example.com",
      reserveSize: 15,
    };

    await createReservationUseCase.execute(reservationData);
    expect(mockReservationRepository.create).toHaveBeenCalledWith(
      reservationData
    );
  });

  it("should thrown an error if the total reserved exceeds the maximum capacity", async () => {
    const maxCapacity = 10;
    process.env.MAX_CAPACITY = maxCapacity.toString();

    const reservationMaximumData = {
      date: new Date(),
      hour: new Date(),
      client: "John Doe",
      email: "johndoe@example.com",
      reserveSize: 5,
    };

    mockReservationRepository.getTotalReservedByDate.mockResolvedValue(10);
    console.log(
      "Total reservado:",
      await mockReservationRepository.getTotalReservedByDate(new Date())
    );

    await expect(
      createReservationUseCase.execute(reservationMaximumData)
    ).rejects.toThrow(
      new AppError(
        `Capacidade máxima de reservas excedida para a data escolhida`,
        409
      )
    );

    expect(mockReservationRepository.create).not.toHaveBeenCalled();
  });
});
