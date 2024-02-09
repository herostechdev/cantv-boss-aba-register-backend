import { HttpException } from '@nestjs/common';
import { IException } from '../exceptions/custom-exceptions/exception.interface';

export class ExceptionHelper {
  public static throwIfNotHttpException(exception: IException | Error): void {
    if (exception instanceof HttpException) {
      return;
    }
    throw exception;
  }

  public static functionExecutionExceptionMessage(
    functionName: string,
  ): string {
    return `Error al ejecutar la función: ${functionName}`;
  }

  public static storedProcedureExecutionExceptionMessage(
    storedProcedureName: string,
  ): string {
    return `Error al ejecutar el procedimiento almacenado (Stored Procedure): ${storedProcedureName}`;
  }
}
