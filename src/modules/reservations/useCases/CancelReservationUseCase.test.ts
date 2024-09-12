import "reflect-metadata";
import { CancelReservationUseCase } from "./CancelReservationUseCase";
import { mockReservationRepository } from "../mocks/mockReservationRepository";

describe("Cancel Reservation Use Case", () => {
  let cancelReservationUseCase: CancelReservationUseCase;

  beforeEach(() => {
    cancelReservationUseCase = new CancelReservationUseCase(
      mockReservationRepository
    );
  });

  it("should cancel a reservation", async () => {
    const reservationId = 1;
    const reservation = {
      id: reservationId,
      date: new Date(),
      hour: new Date(),
      client: "John Doe",
      email: "johndoe@example.com",
      reserveSize: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockReservationRepository.getReservationById.mockResolvedValue(reservation);

    await cancelReservationUseCase.execute(reservationId);
    expect(mockReservationRepository.cancelReservation).toHaveBeenCalledWith(
      reservationId
    );
  });

  it("should throw an error if the reservation does not exist", async () => {
    const reservationId = 1;
    mockReservationRepository.getReservationById.mockResolvedValue(null);

    await expect(
      cancelReservationUseCase.execute(reservationId)
    ).rejects.toThrow("Reserva não encontrada");
  });
});
