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
import { ValidationHelper } from '../../helpers/validation.helper';

@Controller('v1/security')
export class EncryptionController {
  constructor(
    private readonly cipherService: CipherService,
    private readonly hashService: HashService,
  ) {}

  @IsPublic()
  @Post('cipher')
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  async cipher(
    @Body(ValidationPipe) dto: EncryptionMessageDto,
  ): Promise<EncryptionMessageDto> {
    return { message: await this.cipherService.cipher(dto.message) };
  }

  @IsPublic()
  @Post('decipher')
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  async decipher(
    @Body(ValidationPipe) dto: EncryptionMessageDto,
  ): Promise<EncryptionMessageDto> {
    return { message: await this.cipherService.decipher(dto.message) };
  }

  @IsPublic()
  @Post('md5')
  @HttpCode(200)
  @UseFilters(new HttpExceptionFilter())
  md5(@Body(ValidationPipe) dto: EncryptionMessageDto): EncryptionMessageDto {
    console.log();
    console.log(
      'hashService is defined',
      ValidationHelper.isDefined(this.hashService),
    );
    console.log();
    console.log();
    console.log();
    console.log();
    console.log('message', dto.message);
    console.log('Hashing');
    const hash = this.hashService.md5(dto.message);
    console.log('Hash', hash);
    console.log('Validate');
    const isMatch = this.hashService.verifyMd5(dto.message, hash);
    console.log('isMatch', isMatch);
    console.log();
    console.log();
    console.log();
    return { message: hash };
  }
}
