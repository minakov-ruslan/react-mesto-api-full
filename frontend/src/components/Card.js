import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(i => i === currentUser._id);

  const cardDeleteButtonClassName = (`card__delete-button ${!isOwn && "card__delete-button_inactive"}`);
  const cardLikeButtonClassName = (`card__like-button ${isLiked && "card__like-button_active"}`);

  const handleClick = () => onCardClick(card);
  const handleLikeClick = () => onCardLike(card);
  const handleDeleteClick = () => onCardDelete(card);

  return (
    <li className="card">
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteClick}>
      </button>
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="card__container">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}>
          </button>
          <span className="card__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;