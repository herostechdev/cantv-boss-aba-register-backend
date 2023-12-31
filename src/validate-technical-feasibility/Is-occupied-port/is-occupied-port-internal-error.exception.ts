import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class IsOccupiedPortInternalErrorException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'df143a11-2d3e-4ca9-b25d-ce40a965e5ac',
      objectOrError:
        'Ha ocurrido un error al determinar si el puerto está ocupado.',
    });
  }
}
