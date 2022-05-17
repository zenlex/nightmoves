import express from 'express';
import mountRoutes from './controllers/index.js';

const app = express();
app.use(express.json());
mountRoutes(app);

export default app;