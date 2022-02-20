import React from 'react'
import style from './Input.module.css'

const Input = ({ onChange }) => {
   return (
      <input
         className={style.input}
         placeholder='Название города'
         type='text'
         onChange={onChange}
      />
   )
}

export default Input