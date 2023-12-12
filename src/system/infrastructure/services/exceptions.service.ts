import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { v4 } from 'uuid';
import { CustomForbiddenException } from '../exceptions/custom-exceptions/custom-forbidden-exception';
import { EntityDuplicatedException } from 'src/system/infrastructure/exceptions/entity-duplicated.exception';
import { EntityNotFoundException } from '../exceptions/entity-not-found.exception';

export abstract class ExceptionsService {
  protected exceptionHandler(error: any, document?: any): void {
    this.conditionalThrowException(
      error,
      'duplicate key',
      new EntityDuplicatedException(document, error),
    );
    this.conditionalThrowException(
      error,
      'Could not find any entity',
      new EntityNotFoundException(document, error),
    );
    this.throwHttpException(error);
  }

  protected securityExceptionHandler(error: any): void {
    if (error instanceof HttpException) {
      this.logException(error as HttpException);
      throw error;
    }
    this.throwForbiddenException(error);
  }

  private conditionalThrowException(
    error: any,
    partialReason: string,
    exception: HttpException,
  ): void {
    if (this.errorIncludes(error, partialReason)) {
      this.logException(exception);
      throw exception;
    }
  }

  private errorIncludes(error: any, partialReason: string): boolean {
    return (
      partialReason &&
      error &&
      error.message &&
      error.message
        .toString()
        .toLowerCase()
        .includes(partialReason.toLowerCase())
    );
  }

  private throwHttpException(error: any): void {
    if (error instanceof HttpException) {
      this.logException(error as HttpException);
      throw error as HttpException;
    }
    const exception = new HttpException(
      error,
      HttpStatus.INTERNAL_SERVER_ERROR,
      { cause: Error(error) },
    );
    this.logException(exception);
    throw exception;
  }

  private throwForbiddenException(error: any): void {
    const exception = new CustomForbiddenException({
      descriptionOrOptions: error,
      code: '000001',
      guid: v4(),
    });
    this.logException(exception);
    throw exception;
  }

  private logException(exception: HttpException): void {
    // if (!this.logService) {
    //   return;
    // }
    // this.logService.error(this.getErrorLogDto(exception));
  }

  // private getErrorLogDto(exception: HttpException): ErrorLogDto {
  //   return {
  //     label: null,
  //     message: exception.message,
  //     extraContent: null,
  //     statusCode: exception.getStatus(),
  //     exceptionName: exception.name,
  //     stackTrace: exception.stack,
  //   };
  // }
}
