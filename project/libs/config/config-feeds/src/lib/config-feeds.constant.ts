export const ENV_FEEDS_FILE_PATH = 'apps/feeds/.env';

export const ConfigName = {
  MongoDb: 'mongo',
  App : 'application',
  Jwt : 'jwt',
  Rabbit : 'rabbit',
} as const;

export const DEFAULT_ERROR_MESSAGE =  'Environments validation failed. Please check .env file. Error message: '
