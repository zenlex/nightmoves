import pg from 'pg';
import dotenv from 'dotenv';
import process from 'node:process';
dotenv.config();

const { Pool } = pg;

const connectionString = process.env.PG_CONNECTION_URL;

const pool = new Pool({connectionString});
// INITIALIZATION TEST
// (async () =>  {
// 	const client = await pool.connect();
// 	console.log('testing pool query');
// 	try{
// 		const res = await client.query('SELECT * FROM tester;');
// 		console.log(res.rows);
// 	} finally {
// 		client.release();
// 	}
// })().catch(err => console.log(err.stack));

const query = (text, params) => pool.query(text, params);

export default {query};

