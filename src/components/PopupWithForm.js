function PopupWithForm ({
  title,
  name,
  children,
  isOpen,
  onClose,
  onSubmit,
  buttonText,
  isLoading
}) {
  return (
    <div className={`popup ${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <button
          type='button'
          className='popup__close'
          onClick={onClose}
        ></button>
        <form
          className='form form_type_${name}'
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          <h2 className='form__title'>{title}</h2>
          {children}
          <button
            className='form__button-submit'
            //  className='form__button-submit form__button-submit_disabled'
            type='submit'
          >
            {isLoading ? 'Сохранение...' : buttonText}
          </button>
        </form>
      </div>
    </div>
  )
}

export { PopupWithForm }
