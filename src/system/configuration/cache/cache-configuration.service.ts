import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CacheConfigurationService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('cache.host');
  }

  get port(): number {
    return Number(this.configService.get<number>('cache.port'));
  }

  get password(): string {
    return this.configService.get<string>('cache.password');
  }

  get ttl(): number {
    return Number(this.configService.get<number>('cache.ttl'));
  }

  get max(): number {
    return Number(this.configService.get<number>('cache.max'));
  }
}
