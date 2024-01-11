import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class CreatingHostingChargeException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'bef9266f-c2e0-4175-a82e-6260af93647f',
      objectOrError: 'Error Creando Cargo de Hosting',
    });
  }
}
