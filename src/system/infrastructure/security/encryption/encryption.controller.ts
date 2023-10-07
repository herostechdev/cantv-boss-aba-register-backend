import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseFilters,
  ValidationPipe,
} from '@nestjs/common';
import { IsPublic } from 'src/system/infrastructure/decorators/is-public.decorator';
import { CipherService } from './cipher.service';
import { EncryptionMessageDto } from './encryption-message.dto';
import { HashService } from './hash.service';
import { HttpExceptionFilter } from '../../exceptions/exception-filters/http-exception.filter';

@Controller('v1/security')
export class EncryptionController {
  constructor(
    private readonly cipherService: CipherService,
    private readonly hashService: HashService,
  ) {}

  @IsPublic()
  @Post('/cipher')
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  async cipher(
    @Body(ValidationPipe) dto: EncryptionMessageDto,
  ): Promise<EncryptionMessageDto> {
    return { message: await this.cipherService.cipher(dto.message) };
  }

  @IsPublic()
  @Post('/decipher')
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  async decipher(
    @Body(ValidationPipe) dto: EncryptionMessageDto,
  ): Promise<EncryptionMessageDto> {
    return { message: await this.cipherService.decipher(dto.message) };
  }

  @IsPublic()
  @Post('/hash')
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  async hash(
    @Body(ValidationPipe) dto: EncryptionMessageDto,
  ): Promise<EncryptionMessageDto> {
    return { message: await this.hashService.hashing(dto.message) };
  }
}
