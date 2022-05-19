import pg from 'pg';
import process from 'node:process';
import { initConfig } from '../utils.js';

initConfig();

const connectionString = process.env.PG_CONNECTION_URL;

const {Pool} = pg;

const pool = new Pool({connectionString});

const query = (text, params) => pool.query(text, params);

export default {query};

