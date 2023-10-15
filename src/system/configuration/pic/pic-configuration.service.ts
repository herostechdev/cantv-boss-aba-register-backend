import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PICConfigurationService {
  constructor(private configService: ConfigService) {}

  get getASAPOrderDetailUrl(): string {
    return this.configService.get<string>('pic.getASAPOrderDetailUrl');
  }
}
