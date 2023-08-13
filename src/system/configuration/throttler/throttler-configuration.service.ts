import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ThrottlerConfigurationService {
  constructor(private configService: ConfigService) {}

  get ttl(): number {
    return Number(this.configService.get<number>('throttler.ttl'));
  }

  get limit(): number {
    return Number(this.configService.get<number>('throttler.limit'));
  }
}
