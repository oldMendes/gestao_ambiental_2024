import 'dotenv/config';
import { app } from './app.js';

app.listen(process.env.PORT, () => {
  console.log('HTTP Server Running!🚀', process.env.PORT);
});
