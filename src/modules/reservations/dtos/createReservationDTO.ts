import { Type } from "class-transformer";
import {
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
} from "class-validator";

export class CreateReservationDTO {
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty({ message: `A data é obrigatória` })
  date!: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty({ message: `O horário é obrigatório` })
  hour!: Date;

  @IsString()
  @IsNotEmpty({ message: `O nome do cliente é obrigatório` })
  client!: string;

  @IsEmail({}, { message: `O email precisa ser um endereço válido` })
  @IsNotEmpty({ message: `O email é obrigatório` })
  email!: string;

  @IsInt({ message: `O número de pessoas precisa ser um número inteiro` })
  @Min(1, { message: `O número mínimo de pessoas é 1` })
  @Max(20, { message: `O número máximo de pessoas é 20` })
  @IsNotEmpty({ message: `O número de pessoas é obrigatório` })
  reserveSize!: number;
}
