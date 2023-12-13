import * as xmlJsParser from 'xml-js';
import { CommonService } from 'src/system/infrastructure/services/common.service';
import { HttpConstants } from 'src/system/infrastructure/http/http-constants';
import { ISOAPRequestData } from './soap-request-data.interface';
import { ITextNode } from '../text-node.interface';
import { SoapTagTypesConstants } from './soap-tag-types.constants';

export abstract class SOAPRequestPayloadService<B, H> extends CommonService {
  get(requestData: ISOAPRequestData<B, H>): string {
    const envelope = this.getEnvelope(requestData);
    return xmlJsParser.js2xml(envelope, this.xmlOptions);
  }

  protected get declaration(): any {
    return {
      _declaration: { _attributes: { version: '1.0', encoding: 'utf-8' } },
    };
  }

  protected getEnvelope(
    requestData: ISOAPRequestData<B, H>,
  ): xmlJsParser.Element | xmlJsParser.ElementCompact {
    switch (requestData.soapTagType) {
      case SoapTagTypesConstants.EXCLUDE_SOAP_ENV:
        return {
          Envelope: {
            _attributes: this.getEnvelopeAttributes(requestData),
            Header: this.getHeader(requestData),
            Body: this.getBody(requestData),
          },
        };
      default:
        return {
          'soapenv:Envelope': {
            _attributes: this.getEnvelopeAttributes(requestData),
            'soapenv:Header': this.getHeader(requestData),
            'soapenv:Body': this.getBody(requestData),
          },
        };
    }
  }

  protected getEnvelopeAttributes(requestData: ISOAPRequestData<B, H>): any {
    let attributes: any = null;
    switch (requestData.soapTagType) {
      case SoapTagTypesConstants.EXCLUDE_SOAP_ENV:
        attributes = {
          xmlns: HttpConstants.SOAP_ENVELOPE_ATTRIBUTE,
        };
        break;
      default:
        attributes = {
          'xmlns:soapenv': HttpConstants.SOAP_ENVELOPE_ATTRIBUTE,
        };
        break;
    }
    if (requestData.includeXmlnsObt) {
      attributes['xmlns:obt'] = requestData.functionName;
    }
    return attributes;
  }

  protected getHeader(
    requestData: ISOAPRequestData<B, H>,
  ): xmlJsParser.Element | xmlJsParser.ElementCompact {
    return null;
  }

  protected getBody(
    requestData: ISOAPRequestData<B, H>,
  ): xmlJsParser.Element | xmlJsParser.ElementCompact {
    return null;
  }

  protected get xmlOptions(): xmlJsParser.Options.JS2XML {
    return { compact: true, ignoreComment: true, spaces: 2 };
  }

  protected getTextNode(text: string): ITextNode {
    return {
      _text: text,
    };
  }
}
