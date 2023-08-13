import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { v4 } from 'uuid';
import { CommonConstants } from '../../common.constants';
import { HttpConstants } from '../../http/http-constants';
import {
  IException,
  isException,
} from '../custom-exceptions/exception.interface';
import { IExceptionResponse } from './exception-response.interface';

@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error | IException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const statusCode = this.getStatusCode(exception);
    const exceptionResponse = this.getExceptionResponse(
      exception,
      statusCode,
      request?.url,
    );
    response.status(statusCode).json(exceptionResponse);
  }

  private getStatusCode(exception: Error | IException): number {
    if (exception instanceof HttpException) {
      return exception.getStatus() ?? HttpConstants.DEFAULT_HTTP_EXCEPTION_CODE;
    }
    return HttpConstants.DEFAULT_HTTP_EXCEPTION_CODE;
  }

  private getExceptionResponse(
    exception: Error | IException,
    statusCode: number,
    url: string,
  ): IExceptionResponse {
    return {
      message: this.getMessage(exception),
      code: this.getCode(exception),
      name: exception?.constructor?.name,
      guid: this.getGuid(exception),
      timestamp: new Date().toISOString(),
      httpStatusCode: statusCode,
      path: url,
      stack: this.isProduction ? undefined : exception?.stack,
      innerException: this.getInnerException(exception),
    };
  }

  private getMessage(exception: Error | IException): string {
    const exceptionResponse = this.getResponse(exception);
    if (typeof exceptionResponse === 'string') {
      return exceptionResponse;
    }
    if (typeof exceptionResponse === 'object') {
      const content = exceptionResponse as any;
      if (typeof content?.message === 'string') {
        return content.message;
      }
      if (Array.isArray(content?.message) && content.message.length > 0) {
        return content.message[0];
      }
    }
    return exception?.message;
  }

  private getResponse(exception: Error | IException): string | object {
    if (exception instanceof HttpException) {
      return exception.getResponse();
    }
    return exception;
  }

  private getCode(exception: Error | IException): string {
    if (isException(exception)) {
      return exception.code ?? CommonConstants.UNKNOWN;
    }
    return CommonConstants.UNKNOWN;
  }

  private getGuid(exception: Error | IException): string {
    if (isException(exception)) {
      return exception.guid ?? v4();
    }
    return v4();
  }

  private get isProduction(): boolean {
    return (
      process.env &&
      process.env.env &&
      process.env.env.toUpperCase() === CommonConstants.PRODUCTION
    );
  }

  private getInnerException(exception: Error | IException): IException {
    if (isException(exception)) {
      return exception.innerException;
    }
    return null;
  }
}
