import { registerAs } from '@nestjs/config';

export default registerAs('pic', () => ({
  getASAPOrderDetailUrl: process.env.PIC_GET_ASAP_ORDER_DETAIL_URL,
}));
