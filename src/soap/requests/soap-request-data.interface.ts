import { SoapTagTypesConstants } from './soap-tag-types.constants';

export interface ISOAPRequestData<BODY, HEADER> {
  soapTagType: SoapTagTypesConstants;
  functionName?: string;
  includeXmlnsObt?: boolean;
  header?: HEADER;
  body?: BODY;
}
