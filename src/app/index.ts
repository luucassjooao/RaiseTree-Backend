import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';

import routes from './routes';
import cors from './middlewares/cors';
import error from './middlewares/error';

const app = express();

app.use(express.json());
app.use(cors);
app.use(morgan('dev'));
app.use(routes);
app.use(error);

export default app;
