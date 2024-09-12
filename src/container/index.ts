import { container } from "tsyringe";
import { PrismaReservationRepository } from "../modules/reservations/repositories/PrismaReservationRepository";
import { CreateReservationUseCase } from "../modules/reservations/useCases/CreateReservationUseCase";
import { GetReservationsByDateUseCase } from "../modules/reservations/useCases/GetReservationsByDateUseCase";
import { CancelReservationUseCase } from "../modules/reservations/useCases/CancelReservationUseCase";
import { GetAllReservationsUseCase } from "../modules/reservations/useCases/GetAllReservationsUseCase";
import { GetReservationsByDateAndHourUseCase } from "../modules/reservations/useCases/GetReservationsByDateAndHourUseCase";

container.register("IReservationRepository", {
  useClass: PrismaReservationRepository,
});

container.register("CreateReservationUseCase", {
  useClass: CreateReservationUseCase,
});

container.register("GetReservationsByDateUseCase", {
  useClass: GetReservationsByDateUseCase,
});

container.register("CancelReservationUseCase", {
  useClass: CancelReservationUseCase,
});

container.register("GetAllReservationsUseCase", {
  useClass: GetAllReservationsUseCase,
});

container.register("GetReservationsByDateAndHourUseCase", {
  useClass: GetReservationsByDateAndHourUseCase,
});
