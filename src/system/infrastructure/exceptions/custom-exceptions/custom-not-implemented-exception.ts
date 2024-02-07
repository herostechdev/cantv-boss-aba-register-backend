import { NotImplementedException } from '@nestjs/common';
import { IException } from './exception.interface';
import { IExceptionInputData } from './exception-input-data.interface';

export class CustomNotImplementedException
  extends NotImplementedException
  implements IException
{
  constructor(exceptionData: IExceptionInputData) {
    super(
      exceptionData.objectOrError,
      exceptionData.descriptionOrOptions ?? exceptionData.objectOrError,
    );
    this.code = exceptionData.code;
    this.guid = exceptionData.guid;
    this.command = exceptionData.command;
    this.innerException = exceptionData.innerException;
  }

  code: string;

  guid: string;

  command: string;

  innerException?: IException;
}
