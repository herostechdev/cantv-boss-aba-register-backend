import { CustomInternalServerException } from './custom-exceptions/custom-internal-server-exception';
import { IException } from './custom-exceptions/exception.interface';

export class CloseDatabaseConnectionException extends CustomInternalServerException {
  constructor(innerException?: IException) {
    super({
      guid: '4b753345-5295-4d92-8917-2c0a2d2f44d5',
      command: 'closeConnection',
      descriptionOrOptions:
        'An error occurred while closing a database connection',
      innerException: innerException,
    });
  }
}
