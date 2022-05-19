import getWeather from "../services/weatherService.js";
import itemService from '../services/itemService.js';
import Router from "express-promise-router";

const router = new Router();

// GET ALL ITEMS
router.get('/', async (req, res, next) => {
	try{
		const rows = await itemService.getAllItems();
		let weatherMemo = {};
		for(const row of rows){
			if(row.city in weatherMemo){
				row.weather = weatherMemo[row.city];
			}else{
				const weather = await getWeather(row.city);
				weatherMemo[row.city] = weather;
				row.weather = weather;
			}
		}
		res.json(rows); 
	}catch(e){
		next(e);
	}
});

// GET SINGLE ITEM BY ID
router.get('/:id', async (req, res, next) => {
	const {id} = req.params;
	try{
		const item = await itemService.getItem(id);
		res.json(item); 
	}catch(e){
		next(e);
	}
});

// CREATE NEW ITEM
router.post('/create', async (req, res, next) => {
	try{
		const newItem = await itemService.createItem(req.body);
		if(req.body.createform){
			res.redirect('/');
		}else{
			res.json(newItem);
		}
	}catch(e){
		next(e);
	}
});

// UPDATE ITEM VIA API
router.patch('/update', async (req, res, next) => {
	try{
		const updatedRow = await itemService.updateItem(req.body);
		res.json(updatedRow);
	}catch(e){
		next(e);
	}
});

// UPDATE ITEM VIA FORM
router.post('/update', async (req, res, next) => {
	try{
		await itemService.updateItem(req.body);
		res.redirect('/');
	}catch(e){
		next(e);
	}
});

// DELETE ITEM VIA API
router.delete('/delete/:id', async (req, res, next) => {
	try{
		const {id} = req.params;
		const deletedRow = await itemService.deleteItem(id);
		res.json(deletedRow);
	}catch(e){
		next(e);
	}
});

// DELETE ITEM VIA FORM
router.post('/delete', async (req, res, next) => {
	try{
		const {id} = req.body;
		await itemService.deleteItem(id);
		res.redirect('/');
	}catch(e){
		next(e);
	}
});

export default router;