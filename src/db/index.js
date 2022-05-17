import pg from 'pg';

const { Pool } = pg;

const connectionString = 'postgres://xwvheyws:6oL9FOrBkJKw5zEckx8cbBku8IgLY35M@heffalump.db.elephantsql.com/xwvheyws';

const pool = new Pool({connectionString});
(async () =>  {
	const client = await pool.connect();
	console.log('testing pool query');
	try{
		const res = await client.query('SELECT * FROM tester;');
		console.log(res.rows);
	} finally {
		client.release();
	}
})().catch(err => console.log(err.stack));

const query = (text, params) => pool.query(text, params);

export default {query};

