import { registerAs } from '@nestjs/config';

export default registerAs('integrations', () => ({
  getASAPOrderDetailUrl: process.env.PIC_GET_ASAP_ORDER_DETAIL_URL,
  getDHCPDataUrl: process.env.BOSS_GET_DHCP_DATA_URL,
}));
