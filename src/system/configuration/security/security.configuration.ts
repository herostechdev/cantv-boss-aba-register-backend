import { registerAs } from '@nestjs/config';

export default registerAs('security', () => ({
  jwtSecret: process.env.JWT_SECRET,
  jwtTokenExpiresIn: process.env.JWT_TOKEN_EPIRES_IN,
  saltRounds: process.env.SECURITY_SALT_ROUNDS,
  cipherPassword: process.env.SECURITY_CIPHER_PASSWORD,
  key: process.env.SECURITY_KEY,
  iv: process.env.SECURITY_IV,
}));
