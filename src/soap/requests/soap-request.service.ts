import { AxiosRequestConfig } from 'axios';
import { CommonService } from 'src/system/infrastructure/services/common.service';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { HttpConstants } from 'src/system/infrastructure/http/http-constants';
import { ISOAPCommonResponse } from './soap-common-response.interface';

export abstract class SOAPRequestService<
  RESPONSE extends ISOAPCommonResponse,
> extends CommonService {
  protected getAxiosRequestConfig(soapAction: string): AxiosRequestConfig {
    return {
      headers: this.getheaders(soapAction),
    };
  }

  protected getheaders(soapAction: string): any {
    return {
      'Content-Type': HttpConstants.APPLICATION_XML,
      SOAPAction: soapAction,
    };
  }

  protected validateResponse(
    response: RESPONSE,
    errorMessage: string,
    okErrorCode = '000',
  ) {
    okErrorCode = okErrorCode ?? '000';
    if (
      !response ||
      !response.ERROR_MESSAGE ||
      response.ERROR_CODE !== okErrorCode
    )
      throw new CustomBadRequestException({
        code: response.ERROR_CODE,
        descriptionOrOptions: errorMessage,
        guid: 'bb8e0f0a-accd-45aa-9d31-a566373bcbdf',
      });
  }

  protected getString(source: any, attributeName: string): string {
    if (source.hasOwnProperty(attributeName)) {
      return source[attributeName]?._text ?? null;
    }
    return null;
  }
}
