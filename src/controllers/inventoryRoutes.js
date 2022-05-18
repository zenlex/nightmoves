import Router from "express-promise-router";
import itemService from '../services/itemService.js';

const router = new Router();
router.get('/', async (req, res, next) => {
	try{
		const rows = await itemService.getAllItems();
		res.json(rows); 
	}catch(e){
		next(e);
	}
});

router.get('/:id', async (req, res, next) => {
	const {id} = req.params;
	try{
		const item = await itemService.getItem(id);
		res.json(item); 
	}catch(e){
		next(e);
	}
});

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

//API Call Update Item
router.patch('/update', async (req, res, next) => {
	try{
		const updatedRow = await itemService.updateItem(req.body);
		res.json(updatedRow);
	}catch(e){
		next(e);
	}
});

//HTML Form Update Item
router.post('/update', async (req, res, next) => {
	try{
		await itemService.updateItem(req.body);
		res.redirect('/');
	}catch(e){
		next(e);
	}
});

//API Delete Item
router.delete('/delete/:id', async (req, res, next) => {
	try{
		const {id} = req.params;
		const deletedRow = await itemService.deleteItem(id);
		res.json(deletedRow);
	}catch(e){
		next(e);
	}
});

//FORM Delete Item
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