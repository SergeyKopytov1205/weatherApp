import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getWeatherWithGeolocation, getWeatherInitialCity, getWeatherCurrentCity, removeWeatherCurrentCity } from './redux/reducers/weatherReducer'
import { getCurrentCities, getLocation, addInitialCity, addCurrentCity, removeCurrentCity } from './redux/reducers/citiesReducer'

import style from './App.module.css'
import WeatherCard from './components/Weather/WeatherCard'
import CurrentWeatherCard from './components/Weather/components/CurrentWeather/CurrentWeatherCard'
import CityContainer from './components/Weather/components/City/CityContainer'
import ForecastWeatherCard from './components/Weather/components/Forecast/ForecastWeatherCard'

import { getFilteredObject } from './utils/utils'
import AddCityContainer from './components/AddCity/AddCityContainer'

function App() {
  const stateCities = useSelector(state => state.cities)
  const stateWeather = useSelector(state => state.weather)
  console.log(stateCities, stateWeather);
  const dispatch = useDispatch()

  //получение координат и городов из localStorage
  useEffect(() => {
    dispatch(getLocation())
    dispatch(getCurrentCities())
  }, [dispatch])

  //запрос погоды города по умолчанию или по координатам
  useEffect(() => {
    if (stateCities.coords) {
      dispatch(getWeatherWithGeolocation(stateCities.coords))
      return
    }
    if (stateCities.initialCity) {
      dispatch(getWeatherInitialCity(stateCities.initialCity))
    }
  }, [dispatch, stateCities.coords, stateCities.initialCity])

  //запрос погоды выбранных городов
  useEffect(() => {
    if (stateCities.currentCities.length > 0) {
      stateCities.currentCities.forEach(city => {
        dispatch(getWeatherCurrentCity(city))
      })
    }
  }, [dispatch, stateCities.currentCities])

  //добавление города по умолчанию
  function addInitialCityHandler(value) {
    dispatch(addInitialCity(value))
  }

  //добавление выбранного города
  function handlerSubmitCurrentCities(value) {
    dispatch(addCurrentCity(value))
  }

  //удалить выбранный город по названию
  function getCityNameOnClick(name) {
    dispatch(removeCurrentCity(name))
    dispatch(removeWeatherCurrentCity(name))
  }

  return (
    <div className={style.container}>
      <WeatherCard >
        <CityContainer
          coords={stateCities.coords}
          isLoading={stateCities.isLoading}
          isErrorCoords={stateCities.isErrorCoords}
          city={stateCities.initialCity}
          cityName={stateWeather.weatherInitialCity.currentWeather.name}
          action={addInitialCityHandler}
        />
        <CurrentWeatherCard
          data={stateWeather.weatherInitialCity.currentWeather}
          fetchError={stateWeather.weatherInitialCity.fetchError}
        />
        <ForecastWeatherCard
          data={getFilteredObject(stateWeather.weatherInitialCity.forecast.list, 'dt_txt')}
        />
      </WeatherCard>
      {Object.keys(stateWeather.weatherCurrentCities).map((city, index) => {
        return (
          <WeatherCard key={index} >
            <CityContainer
              isCurrentCity={true}
              city={city}
              cityName={stateWeather.weatherCurrentCities[city].currentWeather.name}
              action={getCityNameOnClick}
            />
            <CurrentWeatherCard
              data={stateWeather.weatherCurrentCities[city].currentWeather}
              fetchError={stateWeather.weatherCurrentCities[city].fetchError}
            />
            <ForecastWeatherCard
              data={getFilteredObject(stateWeather.weatherCurrentCities[city].forecast.list, 'dt_txt')}
            />
          </WeatherCard>
        )
      })}
      <AddCityContainer action={handlerSubmitCurrentCities} />
    </div>
  )
}

export default App
