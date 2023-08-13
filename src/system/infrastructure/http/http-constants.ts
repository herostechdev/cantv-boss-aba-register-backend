import { StringHelper } from '../helpers/string.helper';

export class HttpConstants {
  static ACCEPT = 'Accept';
  static AUTHENTICATION = 'Authentication';
  static APPLICATION_GRAPHQL = 'application/graphql';
  static APPLICATION_GZIP = 'application/gzip';
  static APPLICATION_JSON = 'application/json';
  static APPLICATION_OGG = 'application/ogg';
  static APPLICATION_PDF = 'application/pdf';
  static APPLICATION_XML = 'application/xml';
  static APPLICATION_ZIP = 'application/zip';
  static APPLICATION_VERSION = 'app-version';
  static BEARER = 'Bearer';
  static CONTENT_TYPE = 'Content-Type';
  public static DEFAULT_HTTP_EXCEPTION_CODE = 500;
  static SOAP_BODY = 'soap:Body';
  static SOAP_ENVELOPE = 'soap:Envelope';
  static SOAP_ENVELOPE_ATTRIBUTE = 'http://schemas.xmlsoap.org/soap/envelope/';
  static SOAP_INDENT = ' '.repeat(4);
  static SOAP_MICROSOFT_WEB_SERVICES_ATTRIBUTE =
    'http://microsoft.com/webservices/';
  static SOAP_TEXT = '_text';
  static SOAP_W3_ORG_SCHEMA_INSTANCE_ATTRIBUTE =
    'http://www.w3.org/2001/XMLSchema-instance';
  static SOAP_W3_ORG_XML_SCHEMA_ATTRIBUTE = 'http://www.w3.org/2001/XMLSchema';
  static TEXT_CSS = 'text/css';
  static TEXT_CSV = 'text/csv';
  static TEXT_HTML = 'text/html';
  static TEXT_PLAIN = 'text/plain';
  static TEXT_VCARD = 'text/vcard';
  static TEXT_XML = 'text/xml';
  static USER_AGENT = 'User-Agent';
  static XMLNS_XSI = 'xmlns:xsi';
  static XMLNS_XSD = 'xmlns:xsd';
  static XMLNS_SOAP = 'xmlns:soap';
}
