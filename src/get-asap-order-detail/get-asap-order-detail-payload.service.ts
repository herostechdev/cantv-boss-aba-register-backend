import { Injectable } from '@nestjs/common';
import { SOAPRequestPayloadService } from 'src/soap/requests/soap-request-payload.service';
import * as xmlJsParser from 'xml-js';
import { IGetASAPOrderDetailRequest } from './get-asap-order-detail-request.interface';
import { IGetASAPOrderDetailData } from './get-asap-order-detail-data.interface';

@Injectable()
export class GetASAPOrderDetailPayloadService extends SOAPRequestPayloadService<
  IGetASAPOrderDetailRequest,
  void
> {
  protected getBody(
    requestData: IGetASAPOrderDetailData,
  ): xmlJsParser.Element | xmlJsParser.ElementCompact {
    return {
      consultarDetalleOrdenesAsap: {
        in0: {
          CTVIDSRVORD: requestData.body.orderId,
        },
      },
    };
  }
}
