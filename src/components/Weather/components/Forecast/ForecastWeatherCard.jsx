import React from 'react'
import DayCard from './components/DayCard'
import style from './ForecastWeatherCard.module.css'

const ForecastWeatherCard = ({ data }) => {
   if (!data) {
      return null
   }
   return (
      <div className={style.container}>
         {Object.keys(data).map((day, index) => {
            return (
               <div className={style.wrapper}>
                  <DayCard key={index} data={data[day]} day={day} />
               </div>
            )
         })}
      </div>
   )
}

export default ForecastWeatherCard