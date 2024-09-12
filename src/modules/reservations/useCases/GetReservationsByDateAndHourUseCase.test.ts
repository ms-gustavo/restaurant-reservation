import "reflect-metadata";
import { GetReservationsByDateAndHourUseCase } from "./GetReservationsByDateAndHourUseCase";
import { mockReservationRepository } from "../mocks/mockReservationRepository";

describe("Get Reservations By Date And Hour Use Case", () => {
  let getReservationsByDateAndHourUseCase: GetReservationsByDateAndHourUseCase;

  beforeEach(() => {
    getReservationsByDateAndHourUseCase =
      new GetReservationsByDateAndHourUseCase(mockReservationRepository);
  });

  it("should get reservations by date and hour", async () => {
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
    mockReservationRepository.getReservationByDateAndHour.mockResolvedValue(
      reservations
    );

    const result = await getReservationsByDateAndHourUseCase.execute(
      date,
      hour.toString()
    );

    expect(result).toEqual(reservations);
    expect(
      mockReservationRepository.getReservationByDateAndHour
    ).toHaveBeenCalledWith(date, hour.toString());
  });

  it("should throw an error if no reservations are found", async () => {
    const date = new Date();
    const hour = new Date();
    mockReservationRepository.getReservationByDateAndHour.mockResolvedValue([]);

    await expect(
      getReservationsByDateAndHourUseCase.execute(date, hour.toString())
    ).rejects.toThrow("Nenhuma reserva encontrada");
  });
});
