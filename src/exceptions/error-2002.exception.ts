import { CustomInternalServerException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-internal-server-exception';

export class Error2002Exception extends CustomInternalServerException {
  constructor() {
    super({
      code: '2002',
      guid: '4e5e7fc5-0861-47fd-9d25-8510f0794657',
      objectOrError:
        'Preorden no aceptada/completada. Error 2002 - Error proceso no completado.Orden de servicio no ha sido creada',
    });
  }
}
