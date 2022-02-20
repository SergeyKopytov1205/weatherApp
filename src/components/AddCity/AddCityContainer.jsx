import React, { useState } from 'react'
import Input from '../Shareble/Input'
import Button from '../Shareble/Button'
import Title from '../Shareble/Title'
import AddCity from './AddCity'

const AddCityContainer = ({ action }) => {
   const [isEdit, setIsEdit] = useState(false)
   const [cityNameValue, setCityNameValue] = useState('')

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

   if (isEdit) {
      return (
         <AddCity >
            <Input onChange={handlerSetCityNameValue} />
            <Button action={addCityHandler} type={'button_add'} icon={'add-circle'} />
         </AddCity>
      )
   }

   return (
      <AddCity>
         <Title title={'Добавить город'} />
         <Button action={onIsEdit} type={'button_big'} icon={'add-outline'} />
      </AddCity>
   )
}

export default AddCityContainer