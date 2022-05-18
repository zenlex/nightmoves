import express from 'express';
import mountRoutes from './controllers/index.js';
import { requestLogger } from './middleware.js';
import path from 'path';
import {fileURLToPath} from 'url';
import serveFavicon from 'serve-favicon';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(requestLogger);
app.use(serveFavicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
mountRoutes(app);
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

export default app;