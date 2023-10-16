import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetAndRegisterQualifOfServiceException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'ba286f3e-2bdb-42e1-a502-acb066d9e02c',
      objectOrError: 'Error al obtener / registrar Calidad de Servicio',
    });
  }
}
