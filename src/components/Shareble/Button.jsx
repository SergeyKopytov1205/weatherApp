import React from 'react'
import style from './Button.module.css'

const Button = ({ type, icon, action }) => {
   return (
      <button
         className={`${style.button} ${style[type]}`}
         onClick={action}
      >
         <ion-icon name={icon}></ion-icon>
      </button>
   )
}

export default Button