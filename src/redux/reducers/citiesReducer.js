const SET_COORDS = 'SET_COORDS'
const SET_INITIAL_CITY = 'SET_INITIAL_CITY'
const SET_CURRENT_CITIES = 'SET_CURRENT_CITIES'
const ADD_CURRENT_CITY = 'ADD_CURRENT_CITY'
const REMOVE_CURRENT_CITY = 'REMOVE_CURRENT_CITY'
const SET_ISLOADING_COORDS = 'SET_ISLOADING_COORDS'
const SET_FETCH_ERROR_COORDS = 'SET_FETCH_ERROR_COORDS'

const initialState = {
   coords: null,
   initialCity: null,
   currentCities: [],
   isLoading: null,
   isErrorCoords: null
}

export default function citiesReducer(state = initialState, action) {
   switch (action.type) {
      case SET_COORDS:
         return { ...state, coords: action.payload, isLoading: false, isErrorCoords: null }
      case SET_INITIAL_CITY:
         return { ...state, initialCity: action.payload, isLoading: false, isErrorCoords: true }
      case ADD_CURRENT_CITY:
         return { ...state, currentCities: [...state.currentCities, action.payload] }
      case REMOVE_CURRENT_CITY:
         return { ...state, currentCities: state.currentCities.filter(cityName => cityName !== action.payload) }
      case SET_CURRENT_CITIES:
         return { ...state, currentCities: action.payload }
      case SET_ISLOADING_COORDS:
         return { ...state, isLoading: action.payload }
      case SET_FETCH_ERROR_COORDS:
         return { ...state, isErrorCoords: action.payload }
      default:
         return state
   }
}

export const setCoordsAC = (data) => ({ type: SET_COORDS, payload: data })
export const setInitialCityAC = (data) => ({ type: SET_INITIAL_CITY, payload: data })
export const setCurrentCitiesAC = (data) => ({ type: SET_CURRENT_CITIES, payload: data })
export const addCurrentCityAC = (data) => ({ type: ADD_CURRENT_CITY, payload: data })
export const removeCurrentCityAC = (data) => ({ type: REMOVE_CURRENT_CITY, payload: data })
export const setIsLoadingCoordsAC = (bool) => ({ type: SET_ISLOADING_COORDS, payload: bool })
export const setFetchErrorCoordsAC = (bool) => ({ type: SET_FETCH_ERROR_COORDS, payload: bool })

export const getLocation = () => {
   return async (dispatch) => {
      dispatch(setIsLoadingCoordsAC(true))
      const geo = navigator.geolocation
      if (!geo) {
         const city = JSON.parse(localStorage.getItem('initialCity'))
         if (city) dispatch(setInitialCityAC(city))
         dispatch(setFetchErrorCoordsAC(true))
         dispatch(setIsLoadingCoordsAC(false))
         return
      }
      geo.getCurrentPosition(
         resolve => {
            dispatch(setCoordsAC({ lat: resolve.coords.latitude, lon: resolve.coords.longitude }))
            dispatch(setIsLoadingCoordsAC(false))
            dispatch(setFetchErrorCoordsAC(false))
            return
         },
         reject => {
            const city = JSON.parse(localStorage.getItem('initialCity'))
            if (city) dispatch(setInitialCityAC(city))
            dispatch(setFetchErrorCoordsAC(true))
            dispatch(setIsLoadingCoordsAC(false))
            return
         }
      )
   }
}

export const addInitialCity = (cityName) => {
   return async (dispatch) => {
      dispatch(setInitialCityAC(cityName))
      localStorage.setItem('initialCity', JSON.stringify(cityName))
   }
}

export const addCurrentCity = (cityName) => {
   return async (dispatch) => {
      dispatch(addCurrentCityAC(cityName))
      let savedCurrentCities = JSON.parse(localStorage.getItem('currentCities'))
      if (savedCurrentCities) {
         savedCurrentCities.push(cityName)
         localStorage.setItem('currentCities', JSON.stringify(savedCurrentCities))
         return
      }
      localStorage.setItem('currentCities', JSON.stringify([cityName]))
   }
}

export const removeCurrentCity = (cityName) => {
   return async (dispatch) => {
      dispatch(removeCurrentCityAC(cityName))
      const savedCurrentCities = JSON.parse(localStorage.getItem('currentCities'))
      const newCurrentCities = savedCurrentCities.filter(item => item !== cityName)
      localStorage.setItem('currentCities', JSON.stringify(newCurrentCities))
   }
}

export const getCurrentCities = () => {
   return async (dispatch) => {
      const cities = localStorage.getItem('currentCities')
      if (cities) dispatch(setCurrentCitiesAC(JSON.parse(cities)))
   }
}
