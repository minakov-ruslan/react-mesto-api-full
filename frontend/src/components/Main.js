import { useContext } from 'react';
import Card from './Card.js'
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);


  return (
    <main className="content">

      <section className="profile">
        <div className="profile__container">
          <img
            src={currentUser.avatar}
            alt="Аватар"
            className="profile__avatar" />
          <button
            className="profile__edit-avatar-button"
            type="button"
            onClick={onEditAvatar}>
          </button>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            onClick={onEditProfile}>
          </button>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}>
        </button>
      </section>

      <section className="cards">
        <ul className="cards__list">
          {cards.map(card => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))
            .reverse()
          };
        </ul>
      </section>
    </main>
  );
}

export default Main;