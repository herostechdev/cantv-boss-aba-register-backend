import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class FindPreOrderPreOrderNotAcceptedOrNotCompletedException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '3edf4d11-a929-404a-bb82-36eec8e0737b',
      objectOrError:
        'Preorden no aceptada/completada. Error 2002 - Error proceso no completado.Orden de servicio no ha sido creada',
    });
  }
}
