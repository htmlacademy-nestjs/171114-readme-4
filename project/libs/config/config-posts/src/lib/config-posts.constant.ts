export const ENV_POSTS_FILE_PATH = 'apps/posts/.env';

export const DEFAULT_ERROR_MESSAGE =  'Environments validation failed. Please check .env file. Error message: '

export const ConfigName = {
  App : 'application',
  Jwt : 'jwt',
  Rabbit : 'rabbit',
} as const;

export const DEFAULT_RABBIT_PORT = 5672
