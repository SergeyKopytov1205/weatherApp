import React from 'react'
import style from './AddCity.module.css'

const AddCity = ({ children }) => {
   return (
      <div className={style.container}>
         {children}
      </div>
   )
}

export default AddCity