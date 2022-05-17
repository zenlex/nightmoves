// import dotenv from 'dotenv';
import process from 'node:process';
import app from './app.js';

if (process.env.NODE_ENV !== 'production') {
	// dotenv.config();
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`server listening on port: ${PORT}`);
});