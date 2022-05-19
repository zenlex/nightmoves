import db from "../db/index.js";
import itemService from "./itemService.js";
import {SHIP_ALL_COLUMNS, SHIP_COLUMNS_NOID, SHIP_TABLE_NAME} from "../constants.js";

export async function createShipment({destination, custname, items}){
	// remove stock from inventory
	for(const idstring in items){
		const id = parseInt(idstring);
		const stock = await itemService.getItem(id);
		if(!stock || stock.qty < items[id]) throw new Error(`insufficient inventory or invalid item for item id: ${id} `);
		const {qty: currQty} = stock;
		const newQty = currQty - items[id];
		await itemService.updateItem({id, qty:newQty});
	}

	// create shipment entry
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

export async function getShipment(id){
	const {rows} = await db.query(`
  SELECT ${SHIP_ALL_COLUMNS} FROM ${SHIP_TABLE_NAME} WHERE id=$1
  `, [id]);
	return rows[0];
}

export async function deleteShipment(id){
	const shipment = await getShipment(id);
	for(const idstring in shipment.items){
		const itemId = parseInt(idstring);
		const stock = await itemService.getItem(itemId);
		const {qty: currQty} = stock;
		const newQty = currQty + shipment.items[itemId];
		await itemService.updateItem({id:itemId, qty:newQty});
	}
	const qtext = `DELETE FROM ${SHIP_TABLE_NAME} WHERE id=$1 RETURNING ${SHIP_ALL_COLUMNS}`; 
	const {rows} = await db.query(qtext, [id]);
	return rows[0];
}

export default {createShipment, getAllShipments, deleteShipment, getShipment};