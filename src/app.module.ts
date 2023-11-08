import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { ApplicationConfigurationModule } from './system/configuration/application/application-configuration.module';
import { ThrottlerConfigurationModule } from './system/configuration/throttler/throttler-configuration.module';
import { ThrottlerConfigurationService } from './system/configuration/throttler/throttler-configuration.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfirmRegistrationModule } from './confirm-registration/confirm-registration.module';
import { CRMCustomersModule } from './customers/crm-customers.module';
import { CustomerExistsModule } from './customer-exists/customer-exists.module';
import { DocumentsConfigurationModule } from './system/configuration/documents/documents-configuration.module';
import { DSLAuditLogsModule } from './dsl-audit-logs/dsl-audit-logs.module';
import { EncryptionModule } from './system/infrastructure/security/encryption/encryption.module';
import { FindPreOrderModule } from './find-pre-order/find-pre-order.module';
import { GetASAPOrderDetailModule } from './get-asap-order-detail/get-asap-order-detail.module';
import { GetLegalDocumentsModule } from './get-legal-documents/get-legal-documents.module';
import { GetOrderIdFromABASalesModule } from './get-order-id-from-aba-sales/get-order-id-from-aba-sales.module';
import { GetPlanDescriptionFromPlanNameModule } from './plan-selection/get-plan-description-from-plan-name/get-plan-description-from-plan-name.module';
import { GetStateFromSerialModule } from './get-state-from-serial/get-state-from-serial.module';
import { IsIPAllowedModule } from './is-ip-allowed/is-ip-allowed.module';
import { LoginModule } from './login/login.module';
import { OracleConfigurationModule } from './system/configuration/oracle/oracle-configuration.module';
import { PICConfigurationModule } from './system/configuration/pic/pic-configuration.module';
import { PlanByClassClientModule } from './plan-selection/plan-by-class-client/plan-by-class-client.module';
import { SecurityConfigurationModule } from './system/configuration/security/security-configuration.module';
import { ValidateCustomerModule } from './validate-client/validate-customer.module';
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
    CustomerExistsModule,
    ConfirmRegistrationModule,
    CRMCustomersModule,
    DocumentsConfigurationModule,
    DSLAuditLogsModule,
    EncryptionModule,
    FindPreOrderModule,
    GetASAPOrderDetailModule,
    GetLegalDocumentsModule,
    GetOrderIdFromABASalesModule,
    GetPlanDescriptionFromPlanNameModule,
    GetStateFromSerialModule,
    IsIPAllowedModule,
    LoginModule,
    OracleConfigurationModule,
    PICConfigurationModule,
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
