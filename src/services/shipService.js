import db from "../db/index.js";
import {SHIP_ALL_COLUMNS, SHIP_COLUMNS_NOID, SHIP_TABLE_NAME} from "../constants.js";
import itemService from "./itemService.js";

export async function createShipment({destination, custname, items}){
	//remove stock from inventory
	for(const idstring in items){
		const id = parseInt(idstring);
		const stock = await itemService.getItem(id);
		if(!stock || stock.qty < items[id]) throw new Error(`insufficient inventory or invalid item for item id: ${id} `);
		const {qty: currQty} = stock;
		const newQty = currQty - items[id];
		await itemService.updateItem({id, qty:newQty});
	}
	const qtext = `INSERT INTO ${SHIP_TABLE_NAME} (${SHIP_COLUMNS_NOID}) VALUES ($1, $2, $3, $4) RETURNING ${SHIP_ALL_COLUMNS}`;
	const timestamp = new Date();
	const values = [destination, custname, items, timestamp];
	const {rows} = await db.query(qtext, values);
	return rows[0];
}

export async function getAllShipments(){
	const {rows} = await db.query(`
    SELECT ${SHIP_ALL_COLUMNS} FROM ${SHIP_TABLE_NAME}
  `);
	return rows;
}

export default {createShipment, getAllShipments};