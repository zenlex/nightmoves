import utilRouter from './utilRoutes.js';
import inventoryRouter from './inventoryRoutes.js';

export default function(app){
	app.use('/utils', utilRouter);
	app.use('/api/inventory', inventoryRouter);
}