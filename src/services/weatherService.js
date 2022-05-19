import axios from 'axios';
import process from 'node:process';
import { initConfig } from '../utils.js';
initConfig();

export default async function getWeather(city){
	const apikey = process.env.OPENWEATHER_API_KEY;
	const geocodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apikey}`;
	const {data} = await axios.get(geocodeURL);
	if(!data[0] || !data[0].lon || !data[0].lat) return `City weather not found for ${city}`;
	const {lon, lat} = data[0];
	const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=imperial`;
	const {data:weather} = await axios.get(weatherURL); 
	const weatherReport = `${weather.main.temp} F, ${weather.weather[0].description}, Wind: ${weather.wind.speed} WindDir: ${weather.wind.deg}deg`;
	return weatherReport;
}