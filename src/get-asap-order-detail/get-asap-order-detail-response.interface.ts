import { ISOAPCommonResponse } from 'src/soap/requests/soap-common-response.interface';

export interface IGetASAPOrderDetailResponse extends ISOAPCommonResponse {
  CTVNUMORDAS: string;
  CTVDTSOLAS: string;
  CTVDTACTIVAAS: string;
  CTVCODFACAS: string;
  CTVSTATUSAS: string;
  CTVDIRINSAS: string;
  CTVCNTSRVAS: string;
  CTVSERVAS: string;
  CTVNUMACTAS: string;
  CTVNUMNUEAS: string;
  CTVCODINVAL: string;
  CTVMARCAAS: string;
  CTVNOTENTAS: string;
  CTVCOLORAS: string;
  CTVNUMQTYAS: string;
  CTVSERIALAS: string;
  CTVQTYEQPAS: string;
  CTVMODELOAS: string;
  CTVCONTRATOAS: string;
  CTVDESCRAS: string;
  CTVEQPRETAS: string;
  CTVEQPINTAS: string;
  CTVREGDOCAS: string;
  CTVOBSAS: string;
  CTVTPPROMAS: string;
}
