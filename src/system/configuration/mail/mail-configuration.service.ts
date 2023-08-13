import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailConfigurationService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('mail.host');
  }

  get port(): number {
    return Number(this.configService.get<number>('mail.port'));
  }

  get secure(): boolean {
    return this.configService.get<string>('mail.secure') === 'true';
  }

  get user(): string {
    return this.configService.get<string>('mail.user');
  }

  get password(): string {
    return this.configService.get<string>('mail.password');
  }
}
