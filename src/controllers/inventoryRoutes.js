import Router from "express-promise-router";
import itemService from '../services/itemService.js';

const router = new Router();
router.get('/', async (req, res) => {
	const rows = await itemService.getAllItems();
	res.json(rows); 
});

router.get('/:id', async (req, res) => {
	const {id} = req.params;
	const item = await itemService.getItem(id);
	res.json(item); 
});

router.post('/create', async (req, res) => {
	const newItem = await itemService.createItem(req.body);
	if(req.body.createform){
		res.redirect('/');
	}else{
		res.json(newItem);
	}
});

//API Call Update Item
router.patch('/update', async (req, res) => {
	const updatedRow = await itemService.updateItem(req.body);
	res.json(updatedRow);
});

//HTML Form Update Item
router.post('/update', async (req, res) => {
	await itemService.updateItem(req.body);
	res.redirect('/');
});

//API Delete Item
router.delete('/delete/:id', async (req, res) => {
	const {id} = req.params;
	const deletedRow = await itemService.deleteItem(id);
	res.json(deletedRow);
});

//FORM Delete Item
router.post('/delete', async (req, res) => {
	const {id} = req.body;
	await itemService.deleteItem(id);
	res.redirect('/');
});

export default router;