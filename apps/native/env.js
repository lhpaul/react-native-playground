const z = require('zod');

const path = require('path');
const APP_ENV = process.env.ENV ?? 'dev';
const envPath = path.resolve(__dirname, `.env.${APP_ENV}`);

require('dotenv').config({
  path: envPath,
});