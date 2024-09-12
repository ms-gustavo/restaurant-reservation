import { Router } from "express";
import { ReservationController } from "../controllers/ReservationController";
import { validateDTO } from "../../../shared/middlewares/validateBody";
import { CreateReservationDTO } from "../dtos/createReservationDTO";
import { GetReservationByDateDTO } from "../dtos/getReservationByDateDTO";
import { validateQueryDTO } from "../../../shared/middlewares/validateQuery";
import { GetReservationByDateAndHourDTO } from "../dtos/getReservationByDateAndHourDTO";

const reservationRoutes = Router();
const reservationController = new ReservationController();

reservationRoutes.get(
  "/reservations",
  reservationController.getAllReservations
);
reservationRoutes.get(
  "/reservations/date",
  validateQueryDTO(GetReservationByDateDTO),
  reservationController.getReservationByDate
);
reservationRoutes.get(
  "/reservations/hour",
  validateQueryDTO(GetReservationByDateAndHourDTO),
  reservationController.getReservationByDateAndHour
);
reservationRoutes.post(
  "/reservations",
  validateDTO(CreateReservationDTO),
  reservationController.create
);
reservationRoutes.delete(
  "/reservations/:id",
  reservationController.cancelReservation
);

export { reservationRoutes };
