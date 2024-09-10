import { Type } from "class-transformer";
import { IsDate, IsNotEmpty } from "class-validator";

export class GetReservationByDateDTO {
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty({ message: `A data é obrigatória` })
  date!: Date;
}
