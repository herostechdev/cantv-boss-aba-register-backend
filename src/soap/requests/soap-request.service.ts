import { AxiosRequestConfig } from 'axios';
import { CommonService } from 'src/system/infrastructure/services/common.service';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { HttpConstants } from 'src/system/infrastructure/http/http-constants';
import { ISOAPCommonResponse } from './soap-common-response.interface';
import { PICConstants } from 'src/boss/pic.constants';
import { BossConstants } from 'src/boss/boss.constants';
import { WLogHelper } from 'src/system/infrastructure/winston-logger/wlog.helper';

export abstract class SoapRequestService<
  RESPONSE extends ISOAPCommonResponse,
> extends CommonService {
  protected readonly wlog = new WLogHelper();

  protected getAxiosRequestConfig(soapAction: string): AxiosRequestConfig {
    return {
      headers: this.getheaders(soapAction),
      timeout: Number(process.env.APP_HTTP_TIMEOUT),
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
    okErrorCode = PICConstants.PIC_OK_DEFAULT_ERROR_CODE,
  ) {
    okErrorCode = okErrorCode ?? PICConstants.PIC_OK_DEFAULT_ERROR_CODE;
    if (
      !response ||
      !response.ERROR_CODE ||
      response.ERROR_CODE !== okErrorCode
    )
      throw new CustomBadRequestException({
        // code: response[errorCodeField],
        // descriptionOrOptions: response[errorCodeField] ?? errorMessage,
        code: response.ERROR_CODE,
        descriptionOrOptions: response.ERROR_MESSAGE ?? errorMessage,
        guid: 'bb8e0f0a-accd-45aa-9d31-a566373bcbdf',
        command: BossConstants.UNKNOWN,
      });
  }

  protected getString(source: any, attributeName: string): string {
    if (source.hasOwnProperty(attributeName)) {
      return source[attributeName]?._text ?? null;
    }
    return null;
  }
}
