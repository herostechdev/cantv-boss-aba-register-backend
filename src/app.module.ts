import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import {
  CacheInterceptor,
  CacheModule,
  CacheStore,
} from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApplicationConfigurationModule } from './system/configuration/application/application-configuration.module';
import { CacheConfigurationModule } from './system/configuration/cache/cache-configuration.module';
import { CacheConfigurationService } from './system/configuration/cache/cache-configuration.service';
import { ThrottlerConfigurationModule } from './system/configuration/throttler/throttler-configuration.module';
import { ThrottlerConfigurationService } from './system/configuration/throttler/throttler-configuration.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CheckIpModule } from './check-ip/check-ip.module';
// import { AuthModule } from './system/infrastructure/security/auth/auth.module';
// import { ContextModule } from './system/infrastructure/contexts/context.module';
// import { EncryptionModule } from './system/infrastructure/security/encryption/encryption.module';
// import { HttpFileSystemModule } from './system/infrastructure/file-system/http/http-file-system.module';
// import { JwtAuthGuard } from './system/infrastructure/security/auth/guards/jwt-auth.guard';
// import { LogsModule } from './system/infrastructure/loggers/logs.module';
// import { MailModule } from './system/infrastructure/mail/mail.module';
// import { NameDictionaryModule } from './system/infrastructure/name-dictionary/name-dictionary.module';
import { OracleConfigurationModule } from './system/configuration/oracle/oracle-configuration.module';
import { OracleConfigurationService } from './system/configuration/oracle/oracle-configuration.service';
import { EncryptionModule } from './system/infrastructure/security/encryption/encryption.module';
import { SecurityConfigurationModule } from './system/configuration/security/security-configuration.module';
// import { PermissionsGuard } from './system/infrastructure/security/auth/guards/permissions.guard';
// import { SettingsModule } from './system/infrastructure/settings/settings.module';
// import { TreeGroupsModule } from './system/infrastructure/tree-groups/tree-groups.module';

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
    //     database: configService.database,
    //     entities: configService.entities,
    //     synchronize: configService.synchronize,
    //   }),
    //   inject: [OracleConfigurationService],
    // }),

    ApplicationConfigurationModule,
    CheckIpModule,
    EncryptionModule,
    SecurityConfigurationModule,
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
