import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class IsAPrepaidVoiceLineException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'a6360b68-d3eb-46d2-9d93-ed76077794f9',
      objectOrError: 'Es línea de voz prepago',
    });
  }
}
