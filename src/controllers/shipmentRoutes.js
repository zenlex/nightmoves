import Router from "express-promise-router";
import shipService from "../services/shipService.js";

const router = new Router();

router.post('/ship', async(req,res,next) => {
	try{
		const newShipment = await shipService.createShipment(req.body);
		res.json(newShipment);
	}catch(e){
		next(e);
	}
});

router.get('/', async(req,res) => {
	const data = await shipService.getAllShipments();
	res.json(data);
});

export default router;