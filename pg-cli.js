//IMPORTS
import pg from 'pg';

//ENV
const connectionString = 'postgres://xwvheyws:6oL9FOrBkJKw5zEckx8cbBku8IgLY35M@heffalump.db.elephantsql.com/xwvheyws';
const { Pool } = pg;

//CONNECT TO DB AND RETURN TEST QUERY
const pool = new Pool({connectionString});
(async () =>  {
	const client = await pool.connect();
	console.log('testing pool query');
	try{
		const res = await client.query('SELECT * FROM tester;');
		console.log(res);
	} finally {
		client.release();
	}
})().catch(err => console.log(err.stack));
