import 'dotenv/config';
import App from './app';
import ApiV1Router from './routes/v1';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([ApiV1Router]);

process.on('SIGINT', () => {
  console.info('SIGINT signal received.');
  console.log('Closing http server.');
  app.close();
  process.exit(1);
});

app.listen();
