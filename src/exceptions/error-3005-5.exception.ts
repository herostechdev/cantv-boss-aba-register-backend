import { CustomInternalServerException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-internal-server-exception';

export class Error30055Exception extends CustomInternalServerException {
  constructor(command: string) {
    super({
      code: '3005-5',
      guid: '4c6bd14b-00d3-41e8-9866-28ba83fc9229',
      command: command,
      objectOrError:
        'La dirección IP no es valida para la central, para ningún pool RBE aunque si existe una central para el número telefónico. La localidad en la que se encuentra no coincide con la localidad del número ABA que está tratando de registrar',
    });
  }
}
