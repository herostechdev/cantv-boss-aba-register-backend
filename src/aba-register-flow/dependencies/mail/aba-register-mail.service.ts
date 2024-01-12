import { Injectable } from '@nestjs/common';
import { AbaRegisterMailDto } from './aba-register-mail.dto';
import { IMailSendOptions } from 'src/system/infrastructure/mail/mail-send-options.interface';
import { MailBodyType } from 'src/system/infrastructure/mail/mail-body-type.constants';
import { MailService } from 'src/system/infrastructure/mail/mail.service';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';
import { BossHelper } from 'src/boss/boss.helper';
import { BossConstants } from 'src/boss/boss.constants';

@Injectable()
export class AbaRegisterMailService {
  constructor(private readonly mailService: MailService) {}

  public async okNotification(dto: AbaRegisterMailDto): Promise<void> {
    try {
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: BossConstants.ABA_SEND_OK_NOTIFICATION,
        input: JSON.stringify(dto),
        clazz: AbaRegisterMailService.name,
        method: 'okNotification',
      });
      await this.mailService.send(this.getOkOptions());
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: BossConstants.ABA_SENT_OK_NOTIFICATION,
        input: JSON.stringify(dto),
        clazz: AbaRegisterMailService.name,
        method: 'okNotification',
      });
    } catch (error) {}
  }

  public async notOkNotification(dto: AbaRegisterMailDto): Promise<void> {
    try {
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: BossConstants.ABA_SEND_NOT_OK_NOTIFICATION,
        input: JSON.stringify(dto),
        clazz: AbaRegisterMailService.name,
        method: 'notOkNotification',
      });
      await this.mailService.send(this.getNotOkOptions());
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: BossConstants.ABA_SENT_NOT_OK_NOTIFICATION,
        input: JSON.stringify(dto),
        clazz: AbaRegisterMailService.name,
        method: 'notOkNotification',
      });
    } catch (error) {}
  }

  // TODO: getOkOptions
  private getOkOptions(): IMailSendOptions {
    const options = this.getOptions();
    options.subject = null;
    options.body = null;
    return options;
  }

  // TODO: getNotOkOptions
  private getNotOkOptions(): IMailSendOptions {
    const options = this.getOptions();
    options.subject = null;
    options.body = null;
    return options;
  }

  // TODO: mail common options
  private getOptions(): IMailSendOptions {
    return {
      from: null,
      to: null,
      cc: null,
      bcc: null,
      subject: null,
      bodyType: MailBodyType.PLAIN_TEXT,
      body: null,
      attachments: null,
    };
  }
}
