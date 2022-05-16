import pg from 'pg';
import express from 'express';
import dotenv from 'dotenv';
import process from 'node:process';

if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

const app = express();

const client = new pg.Client();
await client.connect();

const res = await client.query('SELECT $1::text as message', ['Hello world!']);
console.log(res.rows[0].message);
await client.end();

app.get('/ping', (req, res) => {
	console.log('somebody pinged here');
	res.send('Pong');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`server listening on port: ${PORT}`);
});