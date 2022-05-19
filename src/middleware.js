import process from 'node:process';

export function requestLogger(req, res, next){
	if(process.env.NODE_ENV !== 'production'){
		console.log(`REQ: ${req.method} ${req.url} Body: ${JSON.stringify(req.body, null, 2)}`);
	}
	next();
}

export default {requestLogger};