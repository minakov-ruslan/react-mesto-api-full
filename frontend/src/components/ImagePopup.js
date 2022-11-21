function ImagePopup({ card, onClose }) {
  return (
    <section className={`popup popup_overlaid popup_type_zoom-image ${card && "popup_opened"}`}>
      <div className="popup__gallery">
        <img
          className="popup__image"
          src={card?.link}
          alt={card?.name}
        />
        <p className="popup__caption">{card?.name}</p>
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}>
        </button>
      </div>
    </section>
  )
}

export default ImagePopup;