import process from 'node:process';

export function logger(msg){
	if(process.NODE_ENV !== 'production'){
		console.log(msg);
	}
}


export default {logger};