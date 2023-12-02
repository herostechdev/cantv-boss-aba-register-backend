import { HttpException } from '@nestjs/common';
import { IException } from '../exceptions/custom-exceptions/exception.interface';

export class ExceptionHelper {
  public static throwIfNotHttpException(exception: IException | Error): void {
    if (exception instanceof HttpException) {
      return;
    }
    throw exception;
  }
}
