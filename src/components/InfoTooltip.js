import React from 'react'
import { UsePopupClose } from './UsePopupClose'
import error from '../images/error.svg'
import success from '../images/sucсess.svg'

function InfoTooltip ({ isConfirmStatus, isOpen, onClose }) {
  UsePopupClose(isOpen, onClose)
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <button
          type='button'
          className='popup__close'
          onClick={onClose}
        ></button>
        <div className='popup__tooltip-container'>
          <div
            className='popup__tooltip-sucсess'
            style={{ backgroundImage: `url(${isConfirmStatus ? success : error})` }}
          ></div>
          <h2 className='popup__title'>
          {isConfirmStatus
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте еще раз.'}
          </h2>
        </div>
      </div>
    </div>
  )
}

export { InfoTooltip }
