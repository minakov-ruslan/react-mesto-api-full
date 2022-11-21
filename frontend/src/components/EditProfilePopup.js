import { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleNameChange = e => {
    setName(e.target.value);
  }

  const handleDescriptionChange = e => {
    setDescription(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="username-input"
        type="text"
        value={name || ""}
        onChange={handleNameChange}
        className="form__input"
        name="name"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="form__input-error username-input-error"></span>
      <input
        id="about-input"
        type="text"
        value={description || ""}
        onChange={handleDescriptionChange}
        className="form__input"
        name="info"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="form__input-error about-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;