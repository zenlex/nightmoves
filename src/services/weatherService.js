import dotenv from 'dotenv';
import process from 'node:process';
import axios from 'axios';

if(process.NODE_ENV !== 'production'){
	dotenv.config();
}

export default async function getWeather(city){
	const apikey = process.env.OPENWEATHER_API_KEY;
	const geocodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apikey}`;
	const {data} = await axios.get(geocodeURL);
	const {lon, lat} = data[0];
	const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=imperial`;
	const {data:weather} = await axios.get(weatherURL); 
	const weatherReport = `${weather.main.temp} F, ${weather.weather[0].description}, Wind: ${weather.wind.speed} WindDir: ${weather.wind.deg}deg`;
	return weatherReport;
}