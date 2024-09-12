import "reflect-metadata";
import { GetReservationsByDateUseCase } from "./GetReservationsByDateUseCase";
import { mockReservationRepository } from "../mocks/mockReservationRepository";

describe("Get Reservations By Date Use Case", () => {
  let getReservationsByDateUseCase: GetReservationsByDateUseCase;

  beforeEach(() => {
    getReservationsByDateUseCase = new GetReservationsByDateUseCase(
      mockReservationRepository
    );
  });

  it("should get reservations by date", async () => {
    const date = new Date();
    const hour = new Date();
    const reservations = [
      {
        id: 1,
        date,
        hour,
        client: "John Doe",
        email: "john@example.com",
        reserveSize: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    mockReservationRepository.getReservationByDate.mockResolvedValue(
      reservations
    );

    const result = await getReservationsByDateUseCase.execute(date);

    expect(result).toEqual(reservations);
    expect(mockReservationRepository.getReservationByDate).toHaveBeenCalledWith(
      date
    );
  });

  it("should throw an error if no reservations are found", async () => {
    const date = new Date();
    mockReservationRepository.getReservationByDate.mockResolvedValue([]);

    await expect(getReservationsByDateUseCase.execute(date)).rejects.toThrow(
      "Nenhuma reserva encontrada"
    );
  });
});
