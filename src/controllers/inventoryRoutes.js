/* eslint-disable no-unused-vars */
import Router from "express-promise-router";
import db from "../db/index.js";

const TABLE_NAME = 'inventory';
const ALL_COLUMNS =['id', 'qty', 'name', 'shortdesc', 'longdesc', 'city'].join(',');
const COLUMNS_NOID = ['qty', 'name', 'shortdesc', 'longdesc', 'city'].join(',');

const router = new Router();
router.get('/', async (req, res) => {
	const {rows} = await db.query(`SELECT ${ALL_COLUMNS} FROM ${TABLE_NAME}`);
	res.json(rows); 
});

router.get('/:id', async (req, res) => {
	const {id} = req.params;
	const {rows} = await db.query(`SELECT ${ALL_COLUMNS} FROM ${TABLE_NAME} WHERE id=$1`, [id]);
	res.json(rows); 
});

router.post('/create', async (req, res) => {
	const  {qty, name, shortdesc, longdesc, city} = req.body;
	const text = `INSERT INTO ${TABLE_NAME} (${COLUMNS_NOID}) VALUES($1, $2, $3, $4, $5) RETURNING ${ALL_COLUMNS}`;
	const values = [qty, name, shortdesc, longdesc, city];
	const {rows} = await db.query(text, values);
	res.redirect('/');
});

router.post('/update', async (req, res) => {
	const {id} = req.body;
	//retrieve current item 
	const originalEntry = await db.query(`SELECT * FROM ${TABLE_NAME} WHERE id=$1;`, [id]);
	const originalRow = originalEntry.rows[0];

	let columns = [];
	let values = [];
	for(const key of Object.keys(req.body)){
		if(key in originalRow){
			columns.push(key);
			values.push(req.body[key]);
		}
	}
	//map column names to sql variables
	const columnNames = columns.map((colName, i) =>
		`${colName}=$${i + 1}`
	).join(', ');

	//format SQL query
	const queryText = `
  UPDATE ${TABLE_NAME}
  SET ${columnNames} 
  WHERE id=${id}
  RETURNING ${ALL_COLUMNS}
  `;

	//store and return updated row
	const {rows} = await db.query(queryText, values);
	res.redirect('/');
});

router.post('/delete', async (req, res) => {
	const {id} = req.body;
	const response = await db.query(`DELETE FROM ${TABLE_NAME} WHERE id=$1 RETURNING ${ALL_COLUMNS}`, [id]);
	res.redirect('/');
});

export default router;