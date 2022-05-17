import express from 'express';
import mountRoutes from './controllers/index.js';
import { requestLogger } from './middleware.js';

const app = express();
app.use(express.json());
app.use(requestLogger);

mountRoutes(app);

export default app;