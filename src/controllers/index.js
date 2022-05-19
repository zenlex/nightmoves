import inventoryRouter from './inventoryRoutes.js';
import shipmentsRouter from './shipmentRoutes.js';
import utilRouter from './utilRoutes.js';

export default function(app){
	app.use('/utils', utilRouter);
	app.use('/api/inventory', inventoryRouter);
	app.use('/api/shipments/', shipmentsRouter);
}