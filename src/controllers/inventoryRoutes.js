/* eslint-disable no-unused-vars */
import process from 'node:process';
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

router.post('/additem', async (req, res) => {
	const  {qty, name, shortdesc, longdesc, city} = req.body;
	const text = `INSERT INTO ${TABLE_NAME} (${COLUMNS_NOID}) VALUES($1, $2, $3, $4, $5) RETURNING ${ALL_COLUMNS}`;
	const values = [qty, name, shortdesc, longdesc, city];
	const {rows} = await db.query(text, values);
	res.json(rows);
});

router.patch('/update/:id', async (req, res) => {
	const {id} = req.params;
	const originalEntry = await db.query(`SELECT * FROM ${TABLE_NAME} WHERE id=${id};`);
	const originalRow = originalEntry.rows[0];
	console.log('originalRow', originalRow);
	//TODO: build correct row taking either original or patch values as appropriate, then run update query
	const updatedRow = {...originalRow};
	for(const key of Object.keys(req.body)){
		// eslint-disable-next-line no-undef
		if(key in updatedRow){
			updatedRow[key] = req.body[key];
		}
	}
	console.log('updatedRow: ', updatedRow);
	let setValues = [];
	for(const [key, val] of Object.entries(updatedRow)){
		setValues.push(`${key}='${val}'`);
	}
	setValues = setValues.join(',');
	console.log(setValues);
	const text = `
  UPDATE ${TABLE_NAME}
  SET ${setValues} 
  WHERE id=${id}
  RETURNING ${ALL_COLUMNS}
  `;

	const {rows} = await db.query(text);
	res.json(rows[0]);
});

router.delete('/delete/:id', async (req, res) => {
	const {id} = req.params;
	console.log('delete item @ id', id);
});




export default router;