import { Injectable } from '@nestjs/common';
import * as nodeMailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import { Address, Attachment, Options } from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { MailBodyType } from './mail-body-type.constants';
import { IAttachment } from './mail-attachment.interface';
import { IMailSendOptions } from './mail-send-options.interface';
import { MailInvalidSendOptionsException } from './mail-invalid-send-options.exception';
import { ExceptionsService } from '../services/exceptions.service';
import { ValidationHelper } from '../helpers/validation.helper';
import { MailConfigurationService } from 'src/system/configuration/mail/mail-configuration.service';

@Injectable()
export class MailService extends ExceptionsService {
  constructor(
    private readonly mailConfigurationService: MailConfigurationService,
  ) {
    super();
  }

  async send(mailOptions: IMailSendOptions): Promise<IMailSentMessageInfo> {
    try {
      this.validate(mailOptions);
      const transporter = this.getSMTPTransporter();
      const response = await transporter.sendMail(
        this.getMailSendOptions(mailOptions),
      );
      return this.getMailSentMessageInfo(response);
    } catch (error) {
      this.exceptionHandler(error);
    }
  }

  private validate(mailOptions: IMailSendOptions): void {
    if (
      !ValidationHelper.isDefined(mailOptions) ||
      !ValidationHelper.isDefined(mailOptions.from) ||
      !ValidationHelper.isDefined(mailOptions.to) ||
      !ValidationHelper.isDefined(mailOptions.subject) ||
      !ValidationHelper.isDefined(mailOptions.bodyType) ||
      !ValidationHelper.isDefined(mailOptions.body)
    ) {
      throw new MailInvalidSendOptionsException();
    }
  }

  private getSMTPTransporter(): Transporter<SMTPTransport.SentMessageInfo> {
    return nodeMailer.createTransport({
      host: this.mailConfigurationService.host,
      port: this.mailConfigurationService.port,
      secure: this.mailConfigurationService.secure,
      auth: {
        user: this.mailConfigurationService.user,
        pass: this.mailConfigurationService.password,
      },
    });
  }

  private getMailSendOptions(source: IMailSendOptions): Options {
    const target = this.getMailSendBasicOptions(source);
    this.setMailSendBody(source, target);
    this.setMailSendAttachments(source, target);
    return target;
  }

  private getMailSendBasicOptions(source: IMailSendOptions): Options {
    return {
      from: source.from,
      to: source.to,
      cc: source.cc,
      bcc: source.bcc,
      subject: source.subject,
    };
  }

  private setMailSendBody(source: IMailSendOptions, target: Options): void {
    switch (source.bodyType) {
      case MailBodyType.HTML:
        target.html = source.body;
        break;
      default:
        target.text = source.body;
        break;
    }
  }

  private setMailSendAttachments(source: IMailSendOptions, target: Options) {
    if (!Array.isArray(source)) {
      return null;
    }
    target.attachments = source
      .filter((value) => value !== null)
      .map((value) => this.bindAttachment(value));
  }

  private bindAttachment(source?: IAttachment): Attachment {
    return {
      filename: source.filename,
      cid: source.cid,
      encoding: source.encoding,
      contentType: source.contentType,
      contentTransferEncoding: source.contentTransferEncoding,
      contentDisposition: source.contentDisposition,
      raw: source.raw,
    };
  }

  private getMailSentMessageInfo(
    source: SMTPTransport.SentMessageInfo,
  ): IMailSentMessageInfo {
    return {
      messageId: source.messageId,
      accepted: this.bindAddress(source.accepted),
      rejected: this.bindAddress(source.rejected),
      pending: this.bindAddress(source.pending),
      response: source.response,
    };
  }

  private bindAddress(data: Array<string | Address>): string[] {
    if (!Array.isArray(data)) {
      return null;
    }
    return data
      .filter((value) => value !== null)
      .map((value) => value.toString());
  }
}
