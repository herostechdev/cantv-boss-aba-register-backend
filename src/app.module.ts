import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ApplicationConfigurationModule } from './system/configuration/application/application-configuration.module';
import { DocumentsConfigurationModule } from './system/configuration/documents/documents-configuration.module';
import { IntegrationsConfigurationModule } from './system/configuration/pic/integrations-configuration.module';
import { OracleConfigurationModule } from './system/configuration/oracle/oracle-configuration.module';
import { SecurityConfigurationModule } from './system/configuration/security/security-configuration.module';
import { ThrottlerConfigurationModule } from './system/configuration/throttler/throttler-configuration.module';
import { ThrottlerConfigurationService } from './system/configuration/throttler/throttler-configuration.service';

import { AbaRegisterModule } from './aba-register-flow/aba-register.module';
import { BossApiModule } from './raw/boss-api/boss-api-raw.module';
import { EncryptionModule } from './system/infrastructure/security/encryption/encryption.module';
import { DatabaseFunctionsRawModule } from './raw/database/functions/database-functions-raw.module';
import { PICModule } from './raw/pic/pic.module';
import { StoredProceduresRawModule } from './raw/stored-procedures/stored-procedures-raw.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    ThrottlerModule.forRootAsync({
      imports: [ThrottlerConfigurationModule],
      useFactory: async (configService: ThrottlerConfigurationService) => ({
        ttl: configService.ttl, // seconds,
        limit: configService.limit, // maximum number of requests
      }),
      inject: [ThrottlerConfigurationService],
    }),

    ApplicationConfigurationModule,
    DocumentsConfigurationModule,
    IntegrationsConfigurationModule,
    OracleConfigurationModule,
    SecurityConfigurationModule,

    AbaRegisterModule,
    BossApiModule,
    EncryptionModule,
    DatabaseFunctionsRawModule,
    PICModule,
    StoredProceduresRawModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: PermissionsGuard,
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
  ],
})
export class AppModule {}
