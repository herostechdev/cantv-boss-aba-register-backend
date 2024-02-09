import { CustomInternalServerException } from './custom-exceptions/custom-internal-server-exception';
import { IException } from './custom-exceptions/exception.interface';

export class GetDatabaseConnectionException extends CustomInternalServerException {
  constructor(innerException?: IException) {
    super({
      guid: 'fbb36044-ccf6-47ce-bac1-a2b5f6754c69',
      command: 'connect',
      descriptionOrOptions:
        'An error occurred while obtaining a database connection',
      innerException: innerException,
    });
  }
}
