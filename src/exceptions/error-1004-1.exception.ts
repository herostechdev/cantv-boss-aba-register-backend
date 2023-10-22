import { CustomInternalServerException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-internal-server-exception';

export class Error10041Exception extends CustomInternalServerException {
  constructor() {
    super({
      code: '1004-1',
      guid: 'b00a1f62-a1fe-49f3-8271-a4be68b6196c',
      objectOrError: 'Error 1004-1',
    });
  }
}
