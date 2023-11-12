import { IPICCommonResponse } from '../pic-common-response.interface';

export interface ICRMCustomerResponse extends IPICCommonResponse {
  CUST_ID?: string;
  CTV_ID_PDR_KENAN?: string;
  CTV_ID_JRQ_KENAN?: string;
  BUSINESS_UNIT?: string;
  FIRST_NAME?: string;
  BO_NAME?: string;
  BO_NAME_AC?: string;
  LAST_NAME?: string;
  PHONE?: string;
  CTV_PHONE_T1?: string;
  PHONE1?: string;
  CTV_PHONE_T2?: string;
  PHONE2?: string;
  CTV_PHONE_T3?: string;
  PHONE30?: string;
  CTV_PHONE_T4?: string;
  EMAIL_ADDR?: string;
  COUNTRY?: string;
  STATE?: string;
  CITY?: string;
  CTV_MUNICIPIO?: string;
  CTV_CIUDAD?: string;
  ADDRESS1_AC?: string;
  ADDRESS1?: string;
  ADDRESS2?: string;
  ADDRESS3?: string;
  COUNTY?: string;
}
