import pg from 'pg';
import dotenv from 'dotenv';
import process from 'node:process';
dotenv.config();

const connectionString = process.env.PG_CONNECTION_URL;

const {Pool} = pg;

const pool = new Pool({connectionString});

const query = (text, params) => pool.query(text, params);

export default {query};

