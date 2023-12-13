import { SoapTagTypesConstants } from './soap-tag-types.constants';

export interface ISOAPRequestData<B, H> {
  soapTagType: SoapTagTypesConstants;
  functionName?: string;
  includeXmlnsObt?: boolean;
  header?: H;
  body?: B;
}
