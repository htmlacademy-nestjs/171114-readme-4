import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface NotifyConfig {
  environment: string;
  port: number;
  db: {
    host: string;
    port: number;
    user: string;
    name: string;
    password: string;
  },
  rabbit: {
    host: string;
    password: string;
    user: string;
    queueNews: string;
    queueSubscriber: string;
    exchangeNews: string;
    exchangeSubscriber: string;
    port: number;
  },
  mail: {
    host: string;
    port: number;
    user: string;
    password: string;
    from: string;
  },
}

export default registerAs('application', (): NotifyConfig => {
  const config: NotifyConfig = {
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10),
    db: {
      host: process.env.MONGO_HOST,
      port: parseInt(process.env.MONGO_PORT, 10),
      name: process.env.MONGO_DB,
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD,
    },
    rabbit: {
      host: process.env.RABBIT_HOST,
      password: process.env.RABBIT_PASSWORD,
      port: parseInt(process.env.RABBIT_PORT, 10),
      user: process.env.RABBIT_USER,
      queueNews: process.env.RABBIT_NEWS_QUEUE,
      queueSubscriber: process.env.RABBIT_SUBSCRIBER_QUEUE,
      exchangeNews: process.env.RABBIT_NEWS_EXCHANGE,
      exchangeSubscriber: process.env.RABBIT_SUBSCRIBER_EXCHANGE,
    },
    mail: {
      host: process.env.MAIL_SMTP_HOST,
      port: parseInt(process.env.MAIL_SMTP_PORT, 10),
      user: process.env.MAIL_USER_NAME,
      password: process.env.MAIL_USER_PASSWORD,
      from: process.env.MAIL_FROM,
    }
  };

  const validationSchema = Joi.object<NotifyConfig>({
    environment: Joi.string()
      .valid('development', 'production', 'stage'),
    port: Joi.number()
      .port(),
    db: Joi.object({
      host: Joi.string().valid().hostname(),
      port: Joi.number().port(),
      name: Joi.string().required(),
      user: Joi.string().required(),
      password: Joi.string().required(),
    }),
    rabbit: Joi.object({
      host: Joi.string().valid().hostname().required(),
      password: Joi.string().required(),
      port: Joi.number().port(),
      user: Joi.string().required(),
      queueNews: Joi.string().required(),
      queueSubscriber: Joi.string().required(),
      exchangeNews: Joi.string().required(),
      exchangeSubscriber: Joi.string().required(),
    }),
    mail: Joi.object({
      host: Joi.string().valid().hostname().required(),
      port: Joi.number().port(),
      user: Joi.string().required(),
      password: Joi.string().required(),
      from: Joi.string().required(),
    })
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[Notify Config]: Environments validation failed. Please check .env file.
       Error message: ${error.message}`,
    );
  }

  return config;
});
