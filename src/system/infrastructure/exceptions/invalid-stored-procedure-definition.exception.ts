import { CustomBadRequestException } from './custom-exceptions/custom-bad-request-exception';
import { IException } from './custom-exceptions/exception.interface';

export class InvalidStoredProcedureDefinitionException extends CustomBadRequestException {
  constructor(storedProcedureName: string, innerException?: IException) {
    super({
      command: storedProcedureName,
      descriptionOrOptions: `The stored procedure ${storedProcedureName} is invalid`,
      innerException: innerException,
    });
  }
}
