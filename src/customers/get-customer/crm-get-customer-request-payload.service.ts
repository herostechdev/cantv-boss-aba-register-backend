import { Injectable } from '@nestjs/common';
import * as xmlJsParser from 'xml-js';
import { ICRMGetCustomerRequestBody } from './crm-get-customer-request-body.interface';
import { ICRMGetCustomerRequestData } from './crm-get-customer-request-data.interface';
import { SOAPRequestPayloadService } from 'src/soap/requests/soap-request-payload.service';

@Injectable()
export class CRMGetCustomerRequestPayloadService extends SOAPRequestPayloadService<
  ICRMGetCustomerRequestBody,
  void
> {
  protected getBody(
    requestData: ICRMGetCustomerRequestData,
  ): xmlJsParser.Element | xmlJsParser.ElementCompact {
    return {
      ConsultarCliente: {
        in0: requestData.body,
      },
    };
  }
}
