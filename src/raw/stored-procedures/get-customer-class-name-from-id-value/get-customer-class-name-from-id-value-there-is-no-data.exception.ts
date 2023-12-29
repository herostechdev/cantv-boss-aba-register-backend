import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetCustomerClassNameFromIdValueThereIsNoDataException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '459bd162-dcb0-4e26-932c-eef17849acf3',
      objectOrError: 'No hay datos',
    });
  }
}
