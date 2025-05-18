import { registerAs } from '@nestjs/config';

export default registerAs('server', () => ({
  AUTH_SERVER_URI: process.env.AUTH_SERVER_URI,
  EVENT_SERVER_URI: process.env.EVENT_SERVER_URI,
}));
