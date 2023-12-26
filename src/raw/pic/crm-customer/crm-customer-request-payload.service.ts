import { Injectable } from '@nestjs/common';
import * as xmlJsParser from 'xml-js';
import { ICRMCustomerRequestBody } from './crm-customer-request-body.interface';
import { ICRMCustomerRequestData } from './crm-customer-request-data.interface';
import { SOAPRequestPayloadService } from 'src/soap/requests/soap-request-payload.service';

@Injectable()
export class CRMCustomerRequestPayloadService extends SOAPRequestPayloadService<
  ICRMCustomerRequestBody,
  void
> {
  protected getBody(
    requestData: ICRMCustomerRequestData,
  ): xmlJsParser.Element | xmlJsParser.ElementCompact {
    return {
      ConsultarCliente: {
        in0: requestData.body,
      },
    };
  }
}
