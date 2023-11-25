import { IsString } from 'class-validator';

export class CustomerExistsRequestDto {
  @IsString()
  attributeName: string;

  @IsString()
  attributeValue: string;
}
