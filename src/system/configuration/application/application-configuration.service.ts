import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApplicationConfigurationService {
  constructor(private configService: ConfigService) {}

  get env(): string {
    return this.configService.get<string>('application.env');
  }

  get port(): number {
    return Number(this.configService.get<number>('application.port'));
  }

  get routesPrefix(): string {
    return this.configService.get<string>('application.routesPrefix');
  }

  get requestTimeout(): number {
    return Number(this.configService.get<number>('application.requestTimeout'));
  }

  get requestOffset(): number {
    return Number(this.configService.get<number>('application.requestOffset'));
  }

  get requestLimit(): number {
    return Number(this.configService.get<number>('application.requestLimit'));
  }

  get requestFilter(): string {
    return this.configService.get<string>('application.requestFilter');
  }

  get maxConcurrentProcess(): number {
    return Number(
      this.configService.get<number>('application.maxConcurrentProcess'),
    );
  }
}
