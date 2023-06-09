import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { logger, errorlogger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', error => {
  errorlogger.error(error);
  process.exit(1);
});

let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info(`Database connected successfully`);

    server = app.listen(config.port, () => {
      logger.info(`Application app listening on port on ${config.port}`);
    });
  } catch (err) {
    errorlogger.error(`Failed to connect database`, err);
  }

  process.on('unhandledRejection', error => {
    console.log('Unhandled Rejection is detected, we are closing our server');
    if (server) {
      server.close(() => {
        errorlogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
bootstrap();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});

//This is comment
