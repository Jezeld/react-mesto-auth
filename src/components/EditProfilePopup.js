import { PopupWithForm } from './PopupWithForm.js'
import { useState, useEffect, useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function EditProfilePopup ({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser, isOpen])

  function handleSubmit (e) {
    e.preventDefault()
    onUpdateUser({
      name,
      about: description
    })
  }

  function handleUserName (e) {
    setName(e.target.value)
  }

  function handleUserAbout (e) {
    setDescription(e.target.value)
  }

  return (
    <PopupWithForm
      name='popup-edit'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      buttonText='Cохранить'
      loadingText={'Сохранение...'}
    >
      <fieldset className='form__fieldset'>
        <input
          type='text'
          name='name'
          id='name-input'
          className='form__input form__input_information_name'
          placeholder='Имя'
          minLength={2}
          maxLength={40}
          onChange={handleUserName}
          value={name || ''}
          required
        />
        <span className='form__span-error name-input-error' />
        <input
          type='text'
          name='about'
          id='job-input'
          className='form__input form__input_information_job'
          placeholder='О себе'
          minLength={2}
          maxLength={200}
          value={description || ''}
          onChange={handleUserAbout}
          required
        />
        <span className='form__span-error job-input-error' />
      </fieldset>
    </PopupWithForm>
  )
}

export { EditProfilePopup }
