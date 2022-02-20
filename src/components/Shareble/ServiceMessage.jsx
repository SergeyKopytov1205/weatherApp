import React, { useEffect, useState } from "react";
import style from './ServiceMessage.module.css'

const ServiceMessage = ({ isLoading, isError, isData }) => {

   const [message, setMessage] = useState('')
   const [activeClass, setActiveClass] = useState('')

   useEffect(() => {
      if (isLoading) {
         setMessage('Загрузка данных геолокации')
         setActiveClass('message_load')
      }
      if ( isError && !isData) {
         setMessage('Доступ к геолокации отсутствует, город по умолчанию не назначен. Введите город по умолчанию')
         setActiveClass('message_error')
         return
      }
      if (isLoading === false && !isError) {
         setMessage('Данные по геолокации')
         setActiveClass('message_success')
         return
      }
      if (isError && isLoading === false) {
         setMessage('Доступ к геолокации отсутствует, данные города по умолчанию')
         setActiveClass('')
         return
      }


   }, [isLoading, isError, isData])

   return (
      <div className={`${style.message} ${style[activeClass]}`}>
         {message}
      </div>
   )
}

export default ServiceMessage