import { CustomInternalServerException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-internal-server-exception';
import { IException } from 'src/system/infrastructure/exceptions/custom-exceptions/exception.interface';

export class GetDHCPDataException extends CustomInternalServerException {
  constructor(error?: IException) {
    super({
      objectOrError: 'Error al consultar la información del DHCP',
      guid: '0acdeec2-4017-4705-b4d7-b1335a2c5b2c',
      innerException: error,
    });
  }
}
