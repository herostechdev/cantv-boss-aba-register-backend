import { CustomInternalServerException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-internal-server-exception';

export class Error30047Exception extends CustomInternalServerException {
  constructor(command: string) {
    super({
      code: '3004-7',
      guid: '434adc1e-da09-4bff-9c7e-272eb2e3669a',
      command: command,
      objectOrError: 'El número de orden  no corresponde al teléfono',
    });
  }
}
