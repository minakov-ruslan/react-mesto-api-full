import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const placeNameRef = useRef('');
  const placeLinkRef = useRef('');

  const handleSubmit = e => {
    e.preventDefault();
    onAddPlace({
      name: placeNameRef.current.value,
      link: placeLinkRef.current.value
    });
  }

  useEffect(() => {
    if (placeNameRef && placeNameRef.current) {
      placeNameRef.current.value = '';
      placeLinkRef.current.value = '';
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="title-input"
        type="text"
        placeholder="Название"
        className="form__input"
        name="name"
        minLength="2"
        maxLength="30"
        ref={placeNameRef}
        required
      />
      <span className="form__input-error title-input-error"></span>
      <input
        id="link-input"
        type="url"
        placeholder="Ссылка на картинку"
        className="form__input"
        name="link"
        ref={placeLinkRef}
        required
      />
      <span className="form__input-error link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;