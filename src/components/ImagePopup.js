import React from 'react'
import '../index.css'

function ImagePopup ({ isOpen, onClose, card }) {
  return (
    <div className={`popup popup-image ${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container-img'>
        <button
          type='button'
          className='popup__close'
          onClick={onClose}
          aria-label='Закрыть картинку'
        ></button>
        <img src={card.link} alt={card.name} className='popup__img' />
        <h2 className='popup__heading'>{card.name}</h2>
      </div>
    </div>
  )
}

export { ImagePopup }
