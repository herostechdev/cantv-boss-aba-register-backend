import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SecurityConfigurationService {
  constructor(private configService: ConfigService) {}

  get jwtSecret(): string {
    return this.configService.get<string>('security.jwtSecret');
  }

  get jwtTokenExpiresIn(): string {
    return this.configService.get<string>('security.jwtTokenExpiresIn');
  }

  get saltRounds(): number {
    return Number(this.configService.get<number>('security.saltRounds'));
  }

  get cipherPassword(): string {
    return this.configService.get<string>('security.cipherPassword');
  }

  get key(): string {
    return this.configService.get<string>('security.key');
  }

  get iv(): string {
    return this.configService.get<string>('security.iv');
  }
}
