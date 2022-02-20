import * as axios from 'axios'

const apiKey = 'a1fdd1cea919330f06ba4ab89ee349e9'

const instance = axios.default.create({
   baseURL: 'https://api.openweathermap.org/data/2.5'
})

export async function getWeatherFromCoords(coords) {
   const response = await instance.get(`weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric&lang=ru`)
   return response.data
}

export async function getWeatherFromCityName(cityName) {
   const response = await instance.get(`weather?q=${cityName}&appid=${apiKey}&units=metric&lang=ru`)
   return response.data
}

export async function getForecastFromCoords(coords) {
   const response = await instance.get(`forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric&lang=ru`)
   return response.data
}

export async function getForecastFromCityName(cityName) {
   const response = await instance.get(`forecast?q=${cityName}&appid=${apiKey}&units=metric&lang=ru`)
   return response.data
}