import React from 'react'
import style from './Hour.module.css'
import { getTime } from '../../../../../../utils/utils'

const Hour = ({ data }) => {

   return (
      <div className={style.container}>
         <div className={style.time}>{getTime(data.dt_txt)}</div>
         <div className={style.weather}>
            <div className={style.temp}>{Math.trunc(data.main.temp)}&deg;</div>
            <div className={style.pic}>
               <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt={data.weather[0].description} />
            </div>
         </div>
      </div>
   )
}

export default Hour