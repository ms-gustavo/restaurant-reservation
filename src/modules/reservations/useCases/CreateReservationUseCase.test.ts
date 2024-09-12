import "reflect-metadata";
import { CreateReservationUseCase } from "./CreateReservationUseCase";
import { mockReservationRepository } from "../mocks/mockReservationRepository";

describe("Create Reservation Use Case", () => {
  let createReservationUseCase: CreateReservationUseCase;

  beforeEach(() => {
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
      reserveSize: 4,
    };

    await createReservationUseCase.execute(reservationData);
    expect(mockReservationRepository.create).toHaveBeenCalledWith(
      reservationData
    );
  });

  it("should throw an error if the reservation repository fails", async () => {
    mockReservationRepository.create.mockRejectedValue(
      new Error("Repository failed")
    );
    const reservationData = {
      date: new Date(),
      hour: new Date(),
      client: "John Doe",
      email: "johndoe@example.com",
      reserveSize: 4,
    };

    await expect(
      createReservationUseCase.execute(reservationData)
    ).rejects.toThrow("Repository failed");
  });
});
