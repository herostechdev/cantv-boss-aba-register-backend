import { IsString } from 'class-validator';

export class EncryptionMessageDto {
  @IsString()
  message: string;
}
