import React from 'react'
import style from './Wind.module.css'

const Wind = ({ data }) => {

   if (!data) {
      return (
         <div>xxx</div>
      )
   }

   return (
      <div className={style.container}>
         <div className={style.compas}>
            <span style={{ transform: `translate(-50%, -50%) rotate(${data.deg}deg)` }}></span>
         </div>
         <div className={style.desc}>{Math.trunc(data.speed)} м/с</div>
      </div >
   )
}

export default Wind