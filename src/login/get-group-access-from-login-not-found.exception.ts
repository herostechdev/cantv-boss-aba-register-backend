import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetGroupAccessFromLoginNotFoundException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '8ed39200-ec38-402c-ac3e-dda9bcdd303c',
      objectOrError: 'Login no existe',
    });
  }
}
