import React, { useState, useEffect, useRef } from 'react'
import { PopupWithForm } from './PopupWithForm.js'

function AddPlacePopup ({ isOpen, onClose, onAddPlace, isLoading }) {
  const [link, setLink] = useState('')
  const [name, setName] = useState('')

  function handleEditName (e) {
    setName(e.target.value)
  }

  function handleEditlink (e) {
    setLink(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault()
    onAddPlace({
      name: name,
      link: link
    })
  }

  useEffect(() => {
    setLink('')
    setName('')
  }, [isOpen])

  // const nameRef = useRef('')
  // const linkRef = useRef('')

  // useEffect(() => {
  //   if (!isOpen) {
  //     nameRef.current.value = ''
  //     linkRef.current.value = ''
  //   }
  // }, [isOpen])

  // function handleSubmitAdd (e) {
  //   e.preventDefault()
  //   onAddPlace({
  //     name: nameRef.current.value,
  //     link: linkRef.current.value
  //   })
  // }

  return (
    <PopupWithForm
      name='popup-add'
      title='Новое место'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText='Создать'
      isLoading={isLoading}
      loadingText={'Сохранение...'}
    >
      <fieldset className='form__fieldset'>
        <input
          type='text'
          name='name'
          id='image-input'
          className='form__input form__input_information_image'
          placeholder='Название'
          minLength={2}
          maxLength={30}
          value={name}
          onChange={handleEditName}
          // ref={nameRef}
          required
        />
        <span className='form__span-error image-input-error' />
        <input
          type='url'
          name='link'
          id='link-input'
          className='form__input form__input_information_link'
          placeholder='Ссылка на картинку'
          value={link}
          onChange={handleEditlink}
          // ref={linkRef}
          required
        />
        <span className='form__span-error link-input-error' />
      </fieldset>
    </PopupWithForm>
  )
}

export { AddPlacePopup }
