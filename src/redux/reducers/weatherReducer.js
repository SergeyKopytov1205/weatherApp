import { getWeatherFromCoords, getWeatherFromCityName, getForecastFromCityName, getForecastFromCoords } from '../../api'

const SET_WEATHER_INITIAL_CITY = 'SET_WEATHER_INITIAL_CITY'
const SET_ISLOADING_WEATHER_INITIAL_CITY = 'SET_ISLOADING_WEATHER_INITIAL_CITY'
const SET_FETCH_ERROR_WEATHER_INITIAL_CITY = 'SET_FETCH_ERROR_WEATHER_INITIAL_CITY'

const SET_WEATHER_CURRENT_CITIES = 'SET_WEATHER_CURRENT_CITIES'
const SET_ISLOADING_WEATHER_CURRENT_CITIES = 'SET_ISLOADING_WEATHER_CURRENT_CITIES'
const SET_FETCH_ERROR_WEATHER_CURRENT_CITIES = 'SET_FETCH_ERROR_WEATHER_CURRENT_CITIES'

const REMOVE_WEATHER_CURRENT_CITY = 'REMOVE_WEATHER_CURRENT_CITY'

const initialState = {
   weatherInitialCity: {
      currentWeather: [],
      forecast: [],
      isLoading: null,
      fetchError: null
   },
   weatherCurrentCities: {
      // 'requestCity': {
      //    currentWeather: {},
      //    forecast: {},
      //    isLoading: null,
      //    fetchError: null
      // }
   }
}

export default function weatherReducer(state = initialState, action) {
   switch (action.type) {
      case SET_WEATHER_INITIAL_CITY:
         return { ...state, weatherInitialCity: { ...state.weatherInitialCity, currentWeather: action.payload.currentWeather, forecast: action.payload.forecast, fetchError: null, isLoading: false } }
      case SET_ISLOADING_WEATHER_INITIAL_CITY:
         return { ...state, weatherInitialCity: { ...state.weatherInitialCity, isLoading: action.payload } }
      case SET_FETCH_ERROR_WEATHER_INITIAL_CITY:
         return { ...state, weatherInitialCity: { ...state.weatherInitialCity, fetchError: action.payload, isLoading: false } }

      case SET_WEATHER_CURRENT_CITIES:
         return { ...state, weatherCurrentCities: { ...state.weatherCurrentCities, [action.payload.city]: { ...state.weatherCurrentCities[action.payload.city], currentWeather: action.payload.currentWeather, forecast: action.payload.forecast, fetchError: null, isLoading: false } } }
      case SET_ISLOADING_WEATHER_CURRENT_CITIES:
         return { ...state, weatherCurrentCities: { ...state.weatherCurrentCities, [action.payload.city]: { ...state.weatherCurrentCities[action.payload.city], isLoading: action.payload.bool, currentWeather: [], forecast: [], fetchError: null } } }
      case SET_FETCH_ERROR_WEATHER_CURRENT_CITIES:
         return { ...state, weatherCurrentCities: { ...state.weatherCurrentCities, [action.payload.city]: { ...state.weatherCurrentCities[action.payload.city], isLoading: false, fetchError: action.payload.data, currentWeather: [], forecast: [] } } }

      case REMOVE_WEATHER_CURRENT_CITY:
         let object = {}
         for (const city in state.weatherCurrentCities) {
            if (city !== action.payload) object = { ...object, [city]: state.weatherCurrentCities[city] }
         }
         return { ...state, weatherCurrentCities: object }
      default:
         return state
   }
}

export const setWeatherInitialCityAC = (currentWeather, forecast) => ({ type: SET_WEATHER_INITIAL_CITY, payload: { currentWeather, forecast } })
export const setIsLoadingWeatherInitialCityAC = (bool) => ({ type: SET_ISLOADING_WEATHER_INITIAL_CITY, payload: bool })
export const setFetchErrorWeatherInitialCityAC = (data) => ({ type: SET_FETCH_ERROR_WEATHER_INITIAL_CITY, payload: data })

export const setWeatherCurrentCitiesAC = (currentWeather, forecast, city) => ({ type: SET_WEATHER_CURRENT_CITIES, payload: { currentWeather, forecast, city } })
export const setIsLoadingWeatherCurrentCitiesAC = (bool, city) => ({ type: SET_ISLOADING_WEATHER_CURRENT_CITIES, payload: { bool, city } })
export const setFetchErrorWeatherCurrentCitiesAC = (data, city) => ({ type: SET_FETCH_ERROR_WEATHER_CURRENT_CITIES, payload: { data, city } })

export const removeWeatherCurrentCityAC = (city) => ({ type: REMOVE_WEATHER_CURRENT_CITY, payload: city })

export const getWeatherWithGeolocation = (coords) => {
   return async (dispatch) => {
      try {
         dispatch(setIsLoadingWeatherInitialCityAC(true))
         const currentWeather = await getWeatherFromCoords(coords)
         const forecast = await getForecastFromCoords(coords)
         dispatch(setWeatherInitialCityAC(currentWeather, forecast))
      } catch (error) {
         debugger
         dispatch(setFetchErrorWeatherInitialCityAC(error))
      }
   }
}

export const getWeatherInitialCity = (cityName) => {
   return async (dispatch) => {
      try {
         dispatch(setIsLoadingWeatherInitialCityAC(true))
         const currentWeather = await getWeatherFromCityName(cityName)
         const forecast = await getForecastFromCityName(cityName)
         dispatch(setWeatherInitialCityAC(currentWeather, forecast))
      } catch (error) {
         dispatch(setFetchErrorWeatherInitialCityAC(error))
      }
   }
}

export const getWeatherCurrentCity = (cityName) => {
   return async (dispatch) => {
      try {
         dispatch(setIsLoadingWeatherCurrentCitiesAC(true, cityName))
         const currentWeather = await getWeatherFromCityName(cityName)
         const forecast = await getForecastFromCityName(cityName)
         dispatch(setWeatherCurrentCitiesAC(currentWeather, forecast, cityName))
      } catch (error) {
         dispatch(setFetchErrorWeatherCurrentCitiesAC(error, cityName))
      }
   }
}

export const removeWeatherCurrentCity = (cityName) => {
   return async (dispatch) => {
      dispatch(removeWeatherCurrentCityAC(cityName))
   }
}