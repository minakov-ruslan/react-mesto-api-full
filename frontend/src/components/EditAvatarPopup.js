import { useEffect, useRef } from 'react';
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const avatarRef = useRef('');

  const handleSubmit = e => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect (() => {
   if (avatarRef && avatarRef.current) {
     avatarRef.current.value = '';
   }
  }, [isOpen]);

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="avatar-input"
        type="url"
        placeholder="Ссылка на картинку"
        className="form__input"
        name="avatar"
        ref={avatarRef}
        required
      />
      <span className="form__input-error avatar-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;