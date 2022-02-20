import React, { useState, useEffect } from 'react'
import City from './City'
import Title from '../../../Shareble/Title'
import Button from '../../../Shareble/Button'
import Input from '../../../Shareble/Input'
import ServiceMessage from '../../../Shareble/ServiceMessage'

const CityContainer = (props) => {
   const { isLoading, cityName, action, isCurrentCity, city, isErrorCoords } = props
   const [isEdit, setIsEdit] = useState(false)
   const [cityNameValue, setCityNameValue] = useState('')

   //открыть ввод города по умолчанию при выключенной геолокации и отсутствии initialCity в localStorage
   useEffect(() => {
      if (isErrorCoords && !city) {
         setIsEdit(true)
      }
   }, [isErrorCoords, city])

   function handlerSetCityNameValue(e) {
      setCityNameValue(e.target.value)
   }

   function onIsEdit() {
      setIsEdit(true)
   }

   function addCityHandler() {
      if (cityNameValue.length > 0) {
         action(cityNameValue)
         setCityNameValue('')
      }
      setIsEdit(false)
   }

   function removeCurrentCity() {
      action(city)
   }

   if (isCurrentCity) {
      return (
         <>
            <ServiceMessage isLoading={isLoading} isError={isErrorCoords} isData={city} />
            <City>
               <Title title={cityName || city} />
               <Button action={removeCurrentCity} type={'button_remove'} icon={'close-outline'} />
            </City>
         </>

      )
   }

   if (isEdit) {
      return (
         <>
            <ServiceMessage isLoading={isLoading} isError={isErrorCoords} isData={city} />
            <City >
               <Input onChange={handlerSetCityNameValue} />
               <Button action={addCityHandler} type={'button_add'} icon={'add-circle'} />
            </City>
         </>

      )
   }

   return (
      <>
         <ServiceMessage isLoading={isLoading} isError={isErrorCoords} isData={city} />
         <City>
            <Title title={cityName || city} />
            <Button action={onIsEdit} type={'button_edit'} icon={'pencil-outline'} />
         </City>
      </>

   )
}

export default CityContainer