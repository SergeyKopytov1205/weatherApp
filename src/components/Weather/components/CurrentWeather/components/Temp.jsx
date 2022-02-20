import React from 'react'
import style from './Temp.module.css'

const Temp = ({ data }) => {

   return (
      <div className={style.container}>
         <div className={style.main}>{Math.trunc(data.temp)}&deg;</div>
         <div className={style.range}>
            <div>Max: {data.temp_max}</div>
            <div>Min: {data.temp_min}</div>
         </div>
         <div className={style.feels}>По ощущениям: <span>{Math.trunc(data.feels_like)}&deg;</span> </div>
      </div>
   )
}

export default Temp