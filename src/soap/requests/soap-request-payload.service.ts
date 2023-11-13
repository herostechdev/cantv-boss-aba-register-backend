import * as xmlJsParser from 'xml-js';
import { CommonService } from 'src/system/infrastructure/services/common.service';
import { HttpConstants } from 'src/system/infrastructure/http/http-constants';
import { ISOAPRequestData } from './soap-request-data.interface';
import { ITextNode } from '../text-node.interface';

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
    return {
      'soapenv:Envelope': {
        _attributes: {
          'xmlns:soapenv': HttpConstants.SOAP_ENVELOPE_ATTRIBUTE,
          'xmlns:obt': requestData.functionName,
        },
        'soapenv:Header': this.getHeader(requestData),
        'soapenv:Body': this.getBody(requestData),
      },
    };
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
