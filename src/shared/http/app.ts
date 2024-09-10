import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { reservationRoutes } from "../../modules/reservations/routes/ReservationRoutes";
import { errorHandler } from "../middlewares/errorHandler";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(reservationRoutes);

app.use(errorHandler);

export { app };
