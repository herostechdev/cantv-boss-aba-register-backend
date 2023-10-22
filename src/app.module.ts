import { APP_GUARD } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { ApplicationConfigurationModule } from './system/configuration/application/application-configuration.module';
import { CacheConfigurationModule } from './system/configuration/cache/cache-configuration.module';
import { CacheConfigurationService } from './system/configuration/cache/cache-configuration.service';
import { ThrottlerConfigurationModule } from './system/configuration/throttler/throttler-configuration.module';
import { ThrottlerConfigurationService } from './system/configuration/throttler/throttler-configuration.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientExistsModule } from './client-exists/client-exists.module';
import { ConfirmRegistrationModule } from './confirm-registration/confirm-registration.module';
import { DSLAuditLogsModule } from './dsl-audit-logs/dsl-audit-logs.module';
import { EncryptionModule } from './system/infrastructure/security/encryption/encryption.module';
import { FindPreOrderModule } from './find-pre-order/find-pre-order.module';
import { GetASAPOrderDetailModule } from './get-asap-order-detail/get-asap-order-detail.module';
import { IsIPAllowedModule } from './is-ip-allowed/is-ip-allowed.module';
import { LoginModule } from './login/login.module';
import { OracleConfigurationModule } from './system/configuration/oracle/oracle-configuration.module';
import { PICConfigurationModule } from './system/configuration/pic/pic-configuration.module';
import { SecurityConfigurationModule } from './system/configuration/security/security-configuration.module';
import { ValidateCustomerModule } from './validate-client/validate-customer.module';
import { ValidateTechnicalFeasibilityModule } from './validate-technical-feasibility/validate-technical-feasibility.module';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [CacheConfigurationModule],
      useFactory: async (configService: CacheConfigurationService) => ({
        ttl: configService.ttl,
      }),
      inject: [CacheConfigurationService],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRootAsync({
      imports: [ThrottlerConfigurationModule],
      useFactory: async (configService: ThrottlerConfigurationService) => ({
        ttl: configService.ttl, // seconds,
        limit: configService.limit, // maximum number of requests
      }),
      inject: [ThrottlerConfigurationService],
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [OracleConfigurationModule],
    //   useFactory: async (configService: OracleConfigurationService) => ({
    //     type: 'oracle',
    //     uri: configService.uri,
    //     port: configService.port,
    //     username: configService.username,
    //     password: configService.password,
    //     //        database: configService.database,
    //     sid: configService.sid,
    //     entities: configService.entities,
    //     synchronize: configService.synchronize,
    //   }),
    //   inject: [OracleConfigurationService],
    // }),

    ApplicationConfigurationModule,
    ClientExistsModule,
    ConfirmRegistrationModule,
    DSLAuditLogsModule,
    EncryptionModule,
    FindPreOrderModule,
    GetASAPOrderDetailModule,
    IsIPAllowedModule,
    LoginModule,
    OracleConfigurationModule,
    PICConfigurationModule,
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
