import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import routes from './routes';
import cors from './middlewares/cors';
import error from './middlewares/error';
import apiDocument from '../../api-document.json';

const app = express();

app.use(express.json());
app.use(cors);
app.use(morgan('dev'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocument));
app.use(routes);
app.use(error);

export default app;
