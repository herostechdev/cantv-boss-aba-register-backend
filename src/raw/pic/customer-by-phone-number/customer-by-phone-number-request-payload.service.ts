import { Injectable } from '@nestjs/common';
import * as xmlJsParser from 'xml-js';
import { SOAPRequestPayloadService } from 'src/soap/requests/soap-request-payload.service';
import { ICustomerByPhoneNumberRequestBody } from './customer-by-phone-number-request-body.interface';
import { ICustomerByPhoneNumberRequestData } from './customer-by-phone-number-request-data.interface';

@Injectable()
export class CustomerByPhoneNumberRequestPayloadService extends SOAPRequestPayloadService<
  ICustomerByPhoneNumberRequestBody,
  void
> {
  protected getBody(
    requestData: ICustomerByPhoneNumberRequestData,
  ): xmlJsParser.Element | xmlJsParser.ElementCompact {
    return {
      consultaAbonadoActivoNumeroTelefono: {
        in0: requestData.body,
      },
    };
  }
}
