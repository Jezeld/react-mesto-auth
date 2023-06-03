import { useRef, useEffect } from 'react'
import { PopupWithForm } from './PopupWithForm'

function EditAvatarPopup ({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = useRef('')

  useEffect(() => {
    if (!isOpen) {
      avatarRef.current.value = ''
    }
  }, [isOpen])

  function handleSubmit (e) {
    e.preventDefault()
    onUpdateAvatar({
      avatar: avatarRef.current.value
    })
  }

  return (
    <PopupWithForm
      name='popup-avatar'
      title='Обновить аватар'
      buttonText='Cохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      loadingText={'Сохранение...'}
    >
      <fieldset className='form__fieldset'>
        <input
          ref={avatarRef}
          type='url'
          name='avatar'
          id='avatar-input'
          className='form__input'
          placeholder='Ссылка на аватар'
          required
        />
        <span className='form__span-error avatar-input-error' />
      </fieldset>
    </PopupWithForm>
  )
}

export { EditAvatarPopup }
