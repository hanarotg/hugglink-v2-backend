import { IsNumber, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class PageRequestDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsUrl()
  logoUrl: string;

  @IsNumber()
  status: number;

  @IsNumber()
  version: number;

  @IsString()
  content: string;

  comment: [];
}
