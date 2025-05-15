import { registerAs } from '@nestjs/config';

export default registerAs('mongodb', () => ({
  mongoURI: process.env.MONGO_URI ?? 'mongodb://test:test@localhost:27017',
}));
