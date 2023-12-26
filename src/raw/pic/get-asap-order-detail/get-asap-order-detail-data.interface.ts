import { IGetASAPOrderDetailRequest } from './get-asap-order-detail-request.interface';
import { ISOAPRequestData } from 'src/soap/requests/soap-request-data.interface';

export type IGetASAPOrderDetailData = ISOAPRequestData<
  IGetASAPOrderDetailRequest,
  void
>;
