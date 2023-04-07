import * as dotenv from 'dotenv';
import App from './App';

dotenv.config();

(async () => {
  const app = new App();
  await app.run();
})();
