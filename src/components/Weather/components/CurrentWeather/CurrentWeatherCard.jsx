import React from 'react'
import style from './CurrentWeatherCard.module.css'
import Temp from './components/Temp'
import Other from './components/Other'
import Wind from './components/Wind'

const CurrentWeatherCard = ({ data, fetchError }) => {

   if (fetchError) {
      return <div className={style.error}>{fetchError.message}</div>
   }

   if (data.length === 0) {
      return null
   }

   return (
      <div className={style.container}>
         <Temp data={data.main} />
         <Other
            humidity={data.main.humidity}
            pressure={data.main.pressure}
            weather={data}
         />
         <Wind data={data.wind} />
      </div>
   )
}

export default CurrentWeatherCard