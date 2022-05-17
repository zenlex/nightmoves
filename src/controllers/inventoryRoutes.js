import Router from "express-promise-router";
import db from "../db/index.js";

const router = new Router();

router.get('/', async (req, res) => {
	const {rows} = await db.query(`SELECT name, note FROM tester;`);
	console.log('rows from get all route', rows);
	res.json(rows);
});

router.post('/additem', async (req, res) => {
	console.log('adding item request body', req.body);
	const  {name, note} = req.body;
  
	const text = `INSERT INTO tester (name, note) VALUES($1, $2) RETURNING name, note`;
	const values = [name, note];
	const {rows} = await db.query(text, values);
	res.json(rows);
});

router.patch('/update/:id', async (req, res) => {
	const {id} = req.params;
	console.log('delete item @ id', id);

});




export default router;