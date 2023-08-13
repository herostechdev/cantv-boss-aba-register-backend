import { MailBodyType } from './mail-body-type.constants';
import { IAttachment } from './mail-attachment.interface';

export interface IMailSendOptions {
  from: string;
  to: string;
  cc?: string;
  bcc?: string;
  subject: string;
  bodyType: MailBodyType;
  body: string;
  attachments?: IAttachment[];
}
