import { registerAs } from '@nestjs/config';

export default registerAs('throttler', () => ({
  ttl: process.env.THROTTLER_TTL,
  limit: process.env.THROTTLER_LIMIT,
}));
