import React from 'react'
import style from './City.module.css'

const City = ({ children }) => {

   return (
      <div className={style.container}>
         {children}
      </div>
   )
}

export default City