import "reflect-metadata";
import { GetAllReservationsUseCase } from "./GetAllReservationsUseCase";
import { mockReservationRepository } from "../mocks/mockReservationRepository";

describe("Get All Reservations Use Case", () => {
  let getAllReservationsUseCase: GetAllReservationsUseCase;

  beforeEach(() => {
    getAllReservationsUseCase = new GetAllReservationsUseCase(
      mockReservationRepository
    );
  });

  it("should get all reservations", async () => {
    const reservations = [
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

    mockReservationRepository.getAllReservations.mockResolvedValue(
      reservations
    );

    const result = await getAllReservationsUseCase.execute();

    expect(result).toEqual(reservations);
    expect(mockReservationRepository.getAllReservations).toHaveBeenCalled();
  });

  it("should throw an error if no reservations are found", async () => {
    mockReservationRepository.getAllReservations.mockResolvedValue([]);

    await expect(getAllReservationsUseCase.execute()).rejects.toThrow(
      "Nenhuma reserva encontrada"
    );
  });
});
