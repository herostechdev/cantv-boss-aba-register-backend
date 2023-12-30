import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class DSLAuditLogsErrorException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '2872ce30-d337-4fca-974a-0eb7f20493e8',
      objectOrError: 'Ha ocurrido un error al ejecutar el SP DSLAUDITLOGS',
    });
  }
}
