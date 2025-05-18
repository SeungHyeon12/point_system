import { registerAs } from '@nestjs/config';

export default registerAs('server', () => ({
  AUTH_SERVER_URI: process.env.AUTH_SURVER_URI ?? 'http://localhost:8080',
  EVENT_SERVER_URI: process.env.EVENT_SERVER_URI ?? 'http://localhost:8081',
}));
