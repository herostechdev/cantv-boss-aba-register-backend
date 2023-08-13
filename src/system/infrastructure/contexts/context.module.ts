import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ContextService } from './context.service';
import { SecurityConfigurationModule } from 'src/system/configuration/security/security-configuration.module';
import { SecurityConfigurationService } from 'src/system/configuration/security/security-configuration.service';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [SecurityConfigurationModule],
      useFactory: async (configService: SecurityConfigurationService) => ({
        secret: configService.jwtSecret,
        signOptions: { expiresIn: configService.jwtTokenExpiresIn },
      }),
      inject: [SecurityConfigurationService],
    }),
  ],
  providers: [ContextService],
  exports: [ContextService],
})
export class ContextModule {}
