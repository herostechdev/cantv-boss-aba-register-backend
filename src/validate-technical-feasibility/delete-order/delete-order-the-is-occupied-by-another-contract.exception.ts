import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class DeleteOrderThePortIsOccupiedByAnotherContractException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '9cf68af9-d5f6-4d0a-8ca1-af9e1de51314',
      objectOrError: 'El puerto está ocupado por otro contrato',
    });
  }
}
