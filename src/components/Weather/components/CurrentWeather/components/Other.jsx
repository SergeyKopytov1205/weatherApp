import React from 'react'
import style from './Other.module.css'

const Other = ({ weather, humidity, pressure }) => {
   return (
      <div className={style.container}>
         <div className={style.weather}>
            <div className={style.icon}>
               <img width='120' height='124' src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
            </div>
            <div className={style.desc}>{weather.weather[0].description}</div>
         </div>
         <div className={style.params}>
            <div>Влажность: <span>{humidity}%</span> </div>
            <div>Давление: <span>{Math.floor(pressure / 1.333)}</span> мм. рт.ст </div>
         </div>
      </div>
   )
}

export default Other