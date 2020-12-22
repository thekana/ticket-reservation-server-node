import 'dotenv/config';
import App from './app';
import ApiV1Router from './routes/v1';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([ApiV1Router]);

app.listen();
