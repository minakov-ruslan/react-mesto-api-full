function PopupWithForm({ name, title, buttonText, isOpen, onClose, children, onSubmit }) {
  return (
    <section className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <form className="form"
          name={name}
          onSubmit={onSubmit}>
          <h2 className="form__title">{title}</h2>
          {children}
          <button
            className="form__submit-button"
            type="submit">
            {buttonText}
          </button>
        </form>
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}>
        </button>
      </div>
    </section>
  )
}

export default PopupWithForm;