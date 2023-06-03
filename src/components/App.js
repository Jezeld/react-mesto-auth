import React, { useEffect, useState } from 'react'
import '../index.css'
import { api } from '../utils/Api'
import Header from './Header'
import Footer from './Footer'
import { PopupWithForm } from './PopupWithForm.js'
import { EditProfilePopup } from './EditProfilePopup.js'
import { ImagePopup } from './ImagePopup.js'
import { Main } from './Main.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { EditAvatarPopup } from './EditAvatarPopup.js'
import { AddPlacePopup } from './AddPlacePopup.js'
import { ConfirmDeletePopup } from './ConfirmDeletePopup.js'

function App () {
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [selectedCard, setSelectedCard] = useState({})
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isFullImagePopupOpen, setFullImagePopupOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [deleteCard, setDeleteCard] = useState({})
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false)

  useEffect(() => {
    Promise.all([api.getInfo(), api.getInitialCards()])
      .then(([dataUser, resCard]) => {
        setCurrentUser(dataUser)
        setCards(resCard)
      })
      .catch(error => console.log(`Ошибка: ${error}`))
  }, [])

  function handleCardLike (card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id)
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLike(card._id, isLiked)
      .then(newCard => {
        setCards(state => state.map(c => (c._id === card._id ? newCard : c)))
      })
      .catch(error => console.log(`Ошибка: ${error}`))
  }

  const handleUpdateUser = info => {
    setIsLoading(true)
    api
      .changeUserInfo(info)
      .then(newData => {
        setCurrentUser(newData)
        closeAllPopups()
      })
      .catch(error => console.log(`Ошибка: ${error}`))
      .finally(() => setIsLoading(false))
  }

  const handleUpdateAvatar = avatar => {
    setIsLoading(true)
    api
      .changeAvatar(avatar)
      .then(newAvatar => {
        setCurrentUser(newAvatar)
        closeAllPopups()
      })
      .catch(error => console.log(`Ошибка: ${error}`))
      .finally(() => setIsLoading(false))
  }

  const handleAddPlaceSubmit = card => {
    setIsLoading(true)
    api
      .addNewCard(card)
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(error => console.log(`Ошибка: ${error}`))
      .finally(() => setIsLoading(false))
  }

  const handleCardDelete = card => {
    setIsLoading(true)
    api
      .deleteCard(card._id)
      .then(newCard => {
        const newCards = cards.filter(c => (c._id === card._id ? '' : newCard))
        setCards(newCards)
        closeAllPopups()
      })
      .catch(error => console.log(`Ошибка: ${error}`))
      .finally(() => setIsLoading(false))
  }

  const handleTrashClick = card => {
    setDeleteCard(card)
    setIsConfirmDeletePopupOpen(true)
  }

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true)
  }

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true)
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick (card) {
    setSelectedCard(card)
    setFullImagePopupOpen(true)
  }

  function closeAllPopups () {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard({})
    setFullImagePopupOpen(false)
    setIsConfirmDeletePopupOpen(false)
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header />
        <Main
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onCardLike={handleCardLike}
          onCardDelete={handleTrashClick}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isFullImagePopupOpen}
          onClose={closeAllPopups}
        />
        <ConfirmDeletePopup
          card={deleteCard}
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onSubmit={handleCardDelete}
        />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
