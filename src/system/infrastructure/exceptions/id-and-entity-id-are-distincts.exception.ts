import { CustomBadRequestException } from './custom-exceptions/custom-bad-request-exception';
import { IException } from './custom-exceptions/exception.interface';

export class IdAndEntityIdAreDistincsException extends CustomBadRequestException {
  constructor(id: string, entityId: string, innerException?: IException) {
    super({
      descriptionOrOptions: `The id ${id} and entity id ${entityId} are distincs`,
      innerException: innerException,
    });
  }
}
