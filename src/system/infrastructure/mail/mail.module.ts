import { Module } from '@nestjs/common';
import { MailConfigurationModule } from 'src/system/configuration/mail/mail-configuration.module';
import { MailService } from './mail.service';

@Module({
  imports: [MailConfigurationModule],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
