import { NotAcceptableException } from '@nestjs/common';
import { IException } from './exception.interface';
import { IExceptionInputData } from './exception-input-data.interface';

export class CustomNotAcceptableException
  extends NotAcceptableException
  implements IException
{
  constructor(exceptionData: IExceptionInputData) {
    super(exceptionData.objectOrError, exceptionData.descriptionOrOptions);
    this.code = exceptionData.code;
    this.guid = exceptionData.guid;
    this.innerException = exceptionData.innerException;
  }

  code: string;

  guid: string;

  innerException?: IException;
}
