import process from 'node:process';
import dotenv from 'dotenv';

export const initConfig = () => {
	if(process.env.NODE_ENV !== 'production'){
		dotenv.config();
	}
};

export function logger(msg){
	if(process.env.NODE_ENV !== 'production'){
		console.log(msg);
	}
}


export default {logger, initConfig};