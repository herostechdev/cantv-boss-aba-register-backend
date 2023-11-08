import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class IntegrationsConfigurationService {
  constructor(private configService: ConfigService) {}

  get getASAPOrderDetailUrl(): string {
    return this.configService.get<string>('integrations.getASAPOrderDetailUrl');
  }

  get getDHCPDataUrl(): string {
    return this.configService.get<string>('integrations.getDHCPDataUrl');
  }
}
