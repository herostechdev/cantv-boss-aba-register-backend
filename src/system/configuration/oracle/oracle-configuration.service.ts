import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OracleConfigurationService {
  constructor(private configService: ConfigService) {}

  get type(): string {
    return this.configService.get<string>('db.type');
  }

  get uri(): string {
    return this.configService.get<string>('db.uri');
  }

  get port(): number {
    return Number(this.configService.get<number>('db.port'));
  }

  get username(): string {
    return this.configService.get<string>('db.username');
  }

  get password(): string {
    return this.configService.get<string>('db.password');
  }

  get database(): string {
    return this.configService.get<string>('db.database');
  }

  get sid(): string {
    return this.configService.get<string>('db.sid');
  }

  get entities(): string[] {
    return [this.configService.get<string>('db.entities')];
  }

  get synchronize(): boolean {
    return Boolean(this.configService.get<boolean>('db.synchronize'));
  }

  get oracleHome(): string {
    return this.configService.get<string>('db.oracleHome');
  }
}
