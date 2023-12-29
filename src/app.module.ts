import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { ApplicationConfigurationModule } from './system/configuration/application/application-configuration.module';
import { ThrottlerConfigurationModule } from './system/configuration/throttler/throttler-configuration.module';
import { ThrottlerConfigurationService } from './system/configuration/throttler/throttler-configuration.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AbaRegisterModule } from './aba-register-flow/aba-register.module';
import { BossApiRawModule } from './raw/boss-api/boss-api-raw.module';
import { PICModule } from './raw/pic/pic.module';
import { StoredproceduresRawModule } from './raw/stored-procedures/stored-procedure-raw.module';

import { ConfirmRegistrationModule } from './confirm-registration/confirm-registration.module';
import { DocumentsConfigurationModule } from './system/configuration/documents/documents-configuration.module';
import { DSLAuditLogsModule } from './dsl-audit-logs/dsl-audit-logs.module';
import { EncryptionModule } from './system/infrastructure/security/encryption/encryption.module';
import { GetPlanDescriptionFromPlanNameModule } from './plan-selection/get-plan-description-from-plan-name/get-plan-description-from-plan-name.module';
import { GetStateFromSerialModule } from './get-state-from-serial/get-state-from-serial.module';
import { IntegrationsConfigurationModule } from './system/configuration/pic/integrations-configuration.module';
import { OracleConfigurationModule } from './system/configuration/oracle/oracle-configuration.module';
import { PlanByClassClientModule } from './plan-selection/plan-by-class-client/plan-by-class-client.module';
import { SecurityConfigurationModule } from './system/configuration/security/security-configuration.module';
import { ValidateCustomerModule } from './validate-customer/validate-customer.module';
import { ValidateTechnicalFeasibilityModule } from './validate-technical-feasibility/validate-technical-feasibility.module';

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

    AbaRegisterModule,
    BossApiRawModule,
    StoredproceduresRawModule,
    PICModule,

    ConfirmRegistrationModule,
    DocumentsConfigurationModule,
    DSLAuditLogsModule,
    EncryptionModule,
    GetPlanDescriptionFromPlanNameModule,
    GetStateFromSerialModule,
    IntegrationsConfigurationModule,
    OracleConfigurationModule,
    PlanByClassClientModule,
    SecurityConfigurationModule,
    ValidateCustomerModule,
    ValidateTechnicalFeasibilityModule,
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
