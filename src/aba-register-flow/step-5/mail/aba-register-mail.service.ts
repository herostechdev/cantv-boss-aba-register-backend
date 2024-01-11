import { Injectable } from '@nestjs/common';
import { ExceptionsService } from 'src/system/infrastructure/services/exceptions.service';
import { IMailSendOptions } from 'src/system/infrastructure/mail/mail-send-options.interface';
import { MailService } from 'src/system/infrastructure/mail/mail.service';
import { MailBodyType } from 'src/system/infrastructure/mail/mail-body-type.constants';

@Injectable()
export class AbaRegisterMailService extends ExceptionsService {
  constructor(private readonly mailService: MailService) {
    super();
  }

  public async send(): Promise<void> {
    try {
      await this.mailService.send(this.getOptions());
    } catch (error) {
      super.exceptionHandler(error);
    }
  }

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
