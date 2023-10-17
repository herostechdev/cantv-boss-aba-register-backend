import { CustomInternalServerException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-internal-server-exception';

export class Error1003Exception extends CustomInternalServerException {
  constructor() {
    super({
      code: '1003',
      guid: '883df900-e755-4840-bc14-293ec424afb4',
      objectOrError: 'Error Validando la IP',
    });
  }
}
