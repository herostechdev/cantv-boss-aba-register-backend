import { IsString } from 'class-validator';

export class KeyValuePairDto {
  @IsString()
  key: string;

  @IsString()
  value: string;
}
