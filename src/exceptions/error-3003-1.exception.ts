import { CustomInternalServerException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-internal-server-exception';

export class Error30031Exception extends CustomInternalServerException {
  constructor() {
    super({
      code: '3003-2',
      guid: 'f4495c9f-f821-48e2-82ca-efed637ff618',
      objectOrError:
        'Dirección IP con la que se intenta el registro está asignada a otro usuario',
      descriptionOrOptions:
        'Usuario intenta registrarse en un puerto ya ocupado',
    });
  }
}
