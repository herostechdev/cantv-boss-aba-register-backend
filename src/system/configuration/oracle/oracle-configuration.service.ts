import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OracleConfigurationService {
  constructor(private configService: ConfigService) {}

  get oracleHome(): string {
    return this.configService.get<string>('db.oracleHome');
  }

  get uri(): string {
    return this.configService.get<string>('db.uri');
  }

  get port(): number {
    return Number(this.configService.get<number>('db.port'));
  }

  get sid(): string {
    return this.configService.get<string>('db.sid');
  }

  get username(): string {
    return this.configService.get<string>('db.username');
  }

  get password(): string {
    return this.configService.get<string>('db.password');
  }

  get poolMaxConnections(): number {
    return Number(this.configService.get<number>('db.poolMaxConnections'));
  }

  get poolMinConnections(): number {
    return Number(this.configService.get<number>('db.poolMinConnections'));
  }
}
