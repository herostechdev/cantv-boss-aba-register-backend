export class MailInvalidSendOptionsException extends Error {
  constructor() {
    super('Invalid mail send options');
  }
}
