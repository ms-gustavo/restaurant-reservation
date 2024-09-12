import { Type } from "class-transformer";
import { IsDate, IsNotEmpty } from "class-validator";

export class GetReservationByDateAndHourDTO {
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty({ message: `A data é obrigatória` })
  date!: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty({ message: `O horário é obrigatório` })
  hour!: Date;
}
