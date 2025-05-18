import { registerAs } from '@nestjs/config';

export default registerAs('server', () => ({
  authServer: process.env.AUTH_URI ?? 'http://localhost:8080',
}));
