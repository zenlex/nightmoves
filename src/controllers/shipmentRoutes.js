import Router from "express-promise-router";
import shipService from "../services/shipService.js";

const router = new Router();

router.post('/ship', async(req,res) => {
	const newShipment = await shipService.createShipment(req.body);
	res.json(newShipment);
});

router.get('/', async(req,res) => {
	console.log('Hello from GET /shipments', req.body);
	const data = await shipService.getAllShipments();
	console.log(data);
	res.json(data);
});

export default router;