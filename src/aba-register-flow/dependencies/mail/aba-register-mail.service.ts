import { Injectable } from '@nestjs/common';
import { AbaRegisterMailDto } from './aba-register-mail.dto';
import { BossConstants } from 'src/boss/boss.constants';
import { IMailSendOptions } from 'src/system/infrastructure/mail/mail-send-options.interface';
import { MailBodyType } from 'src/system/infrastructure/mail/mail-body-type.constants';
import { MailService } from 'src/system/infrastructure/mail/mail.service';
import { WLogHelper } from 'src/system/infrastructure/winston-logger/wlog.helper';

@Injectable()
export class AbaRegisterMailService {
  constructor(private readonly mailService: MailService) {}

  private readonly wlog = new WLogHelper(AbaRegisterMailService.name);

  public async okNotification(dto: AbaRegisterMailDto): Promise<void> {
    this.wlog.methodName = 'okNotification';
    this.wlog.dto = dto;
    try {
      this.wlog.info(BossConstants.ABA_SEND_OK_NOTIFICATION);
      await this.mailService.send(this.getOkOptions());
      this.wlog.info(BossConstants.ABA_SENT_OK_NOTIFICATION);
    } catch (error) {
      this.wlog.error(error);
    }
  }

  public async notOkNotification(dto: AbaRegisterMailDto): Promise<void> {
    this.wlog.methodName = 'notOkNotification';
    this.wlog.dto = dto;
    try {
      this.wlog.info(BossConstants.ABA_SEND_NOT_OK_NOTIFICATION);
      await this.mailService.send(this.getNotOkOptions());
      this.wlog.info(BossConstants.ABA_SENT_NOT_OK_NOTIFICATION);
    } catch (error) {
      this.wlog.error(error);
    }
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
