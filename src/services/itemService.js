import db from "../db/index.js";
import { INV_TABLE_NAME, INV_ALL_COLUMNS, INV_COLUMNS_NOID } from "../constants.js";

export async function updateItem(reqBody){
	const {id} = reqBody;
	//retrieve current item 
	const originalEntry = await db.query(`SELECT * FROM ${INV_TABLE_NAME} WHERE id=$1;`, [id]);
	const originalRow = originalEntry.rows[0];
	let columns = [];
	let values = [];
	for(const key of Object.keys(reqBody)){
		if(key !== 'id' && key in originalRow && reqBody[key] !== ''){
			columns.push(key);
			values.push(reqBody[key]);
		}
	}
	//map column names to sql variables
	const columnNames = columns.map((colName, i) =>
		`${colName}=$${i + 1}`
	).join(', ');

	//format SQL query
	const queryText = `
  UPDATE ${INV_TABLE_NAME}
  SET ${columnNames} 
  WHERE id=${id}
  RETURNING ${INV_ALL_COLUMNS}
  `;
	//store and return updated row
	const {rows} = await db.query(queryText, values);
	return rows[0];
}

export async function deleteItem(id){
	const response = await db.query(`DELETE FROM ${INV_TABLE_NAME} WHERE id=$1 RETURNING ${INV_ALL_COLUMNS}`, [id]);
	return response.rows[0];
}

export async function getAllItems(){
	const {rows} = await db.query(`SELECT ${INV_ALL_COLUMNS} FROM ${INV_TABLE_NAME}`);
	return rows;
}

export async function getItem(id){
	const {rows} = await db.query(`SELECT ${INV_ALL_COLUMNS} FROM ${INV_TABLE_NAME} WHERE id=$1`, [id]);
	return rows[0];
}

export async function createItem(reqBody){
	const  {qty, name, shortdesc, longdesc, city} = reqBody;
	const text = `INSERT INTO ${INV_TABLE_NAME} (${INV_COLUMNS_NOID}) VALUES($1, $2, $3, $4, $5) RETURNING ${INV_ALL_COLUMNS}`;
	const values = [qty, name, shortdesc, longdesc, city];
	const {rows} = await db.query(text, values);
	return rows;
}

export default {updateItem, deleteItem, getAllItems, getItem, createItem};