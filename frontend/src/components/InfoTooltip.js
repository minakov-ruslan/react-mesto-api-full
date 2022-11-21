function InfoTooltip({ isOpen, onClose, registerInfo }) {
  return (
    <section className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <img
          src={registerInfo.icon}
          className="popup__icon"
          alt="Иконка"
        />
        <h2 className="popup__title">{registerInfo.text}</h2>
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}>
        </button>
      </div>
    </section>
  )
}

export default InfoTooltip;