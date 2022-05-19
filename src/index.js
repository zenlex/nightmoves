import app from './app.js';
import process from 'node:process';
import { initConfig } from './utils.js';

initConfig();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`server listening on port: ${PORT}`);
});