import Router from 'express-promise-router';

import db from '../db/index.js';

const router = new Router();

router.get('/dbtest', async (req, res, next) => {
	console.log('db test query requested');
	try{
		const { rows } = await db.query('SELECT NOW()');
		console.log({rows});
		res.send(rows);

	}catch(err){
		console.log(err);
		next(err);
	}
});

router.get('/ping', (req, res) => {
	console.log('somebody pinged here');
	res.send('Pong');
});

export default router;