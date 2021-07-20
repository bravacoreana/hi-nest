import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMovieDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsOptional()
  @IsString({ each: true })
  readonly genres: string[];
}

// what people can send & what we want them to send
