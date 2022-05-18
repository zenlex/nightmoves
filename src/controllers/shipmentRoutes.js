import Router from "express-promise-router";
import shipService from "../services/shipService.js";

const router = new Router();

router.post('/ship', async(req,res,next) => {
	try{
		const newShipment = await shipService.createShipment(req.body);
		console.log('shipform', req.body.shipform);
		if(!req.body.shipform){
			res.json(newShipment);
		}else{
			res.end();
		}
	}catch(e){
		next(e);
	}
});

router.get('/', async(req, res, next) => {
	try{
		const data = await shipService.getAllShipments();
		res.json(data);
	}catch(e){
		next(e);
	}
});

router.delete('/:id', async(req, res, next) => {
	try{
		const {id} = req.params;
		const deleted = await shipService.deleteShipment(id);
		res.json(deleted);
	}catch(e){
		next(e);
	}
});

router.post('/delete', async(req, res, next) => {
	try{
		const id = parseInt(req.body.id);
		await shipService.deleteShipment(id);
		res.redirect('/');
	}catch(e){
		next(e);
	}
});

export default router;