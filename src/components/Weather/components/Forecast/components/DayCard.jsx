import React from 'react'
import Hour from './components/Hour'
import style from './DayCard.module.css'

const DayCard = ({ data, day }) => {

   return (
      <div className={style.container}>
         <div className={style.title}>{day}</div>
         {data.map((hour, index) => {
            return <Hour key={index} data={hour} />
         })}
      </div>
   )
}

export default DayCard