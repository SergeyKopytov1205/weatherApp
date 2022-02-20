import React from 'react'
import style from './WeatherCard.module.css'

const WeatherCard = ({ children }) => {
   return (
      <div className={style.container}>
         {children}
      </div>
   )
}

export default WeatherCard