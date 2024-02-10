import { registerAs } from '@nestjs/config';

export default registerAs('integrations', () => ({
  getASAPOrderDetailUrl: process.env.PIC_GET_ASAP_ORDER_DETAIL_URL,
  getASAPOrderDetailStatusCode:
    process.env.PIC_ASAP_ORDER_DETAIL_VALID_STATUS_CODE,
  getDHCPDataUrl: process.env.BOSS_GET_DHCP_DATA_URL,
  customerByPhoneNumberUrl: process.env.PIC_CUSTOMER_BY_PHONE_NUMBER_URL,
  cu594GetCustomerUrl: process.env.PIC_CU594_GET_CUSTOMER,
}));
