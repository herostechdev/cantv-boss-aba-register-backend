import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class ReadIABAOrderOrderExistsException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '9c8316d3-2d45-4963-8226-84e18d9ddd28',
      objectOrError: 'La orden existe',
    });
  }
}
