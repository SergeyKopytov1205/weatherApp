import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import citiesReducer from './reducers/citiesReducer'
import weatherReducer from './reducers/weatherReducer'


const rootReducer = combineReducers({
   cities: citiesReducer,
   weather: weatherReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))