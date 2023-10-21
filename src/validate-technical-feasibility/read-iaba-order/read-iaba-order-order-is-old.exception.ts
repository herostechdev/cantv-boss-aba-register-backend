import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class ReadIABAOrderOrderIsOldException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '6bda131f-a35e-4ac0-b2e1-d65c4684fddc',
      objectOrError: 'La orden es antigua',
    });
  }
}
