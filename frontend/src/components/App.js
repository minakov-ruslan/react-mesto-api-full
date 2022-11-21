import { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import ImagePopup from './ImagePopup.js'
import api from '../utils/Api.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import InfoTooltip from './InfoTooltip.js';
import Register from './Register.js';
import Login from './Login.js';
import ProtectedRoute from './ProtectedRoute.js';
import { authorization, registration, getContent, signOut } from '../utils/Auth.js';

import iconYes from '../images/iconYes.png';
import iconNo from '../images/iconNo.png';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(null);
  const [email, setEmail] = useState('');
  const [registerInfo, setRegisterInfo] = useState({ icon: null, text: null });

  const history = useHistory();

  const handleEditProfileClick = () => setEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setEditAvatarPopupOpen(true);
  const handleCardClick = (card) => setSelectedCard(card);


  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard(null);
  };

  const handleUpdateUser = (userInfo) => {
    api.setUserInfo(userInfo)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  };

  const handleUpdateAvatar = (userInfo) => {
    api.setUserAvatar(userInfo)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  const handleAddPlaceSubmit = (cardInfo) => {
    api.addCard(cardInfo)
      .then(newCard => {
        setCards([ ...cards, newCard]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  const handleCardLike = card => {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCards(state => state.map(c => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  };

  const handleCardDelete = card => {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(item => item !== card))
      })
      .catch(err => console.log(err));
  }

  const handleRegister = (email, password) => {
    registration(email, password)
      .then(() => {
        setRegisterInfo({ icon: iconYes, text: "Вы успешно зарегистрировались!" });
        setInfoTooltipOpen(true);
        setTimeout(() => {
          history.push("/sign-in");
          setInfoTooltipOpen(false);
        }, 3000);
      })
      .catch(err => {
        console.log(err);
        setRegisterInfo({ icon: iconNo, text: "Что-то пошло не так! Попробуйте ещё раз." });
        setInfoTooltipOpen(true);
      });
  }

  const handleLogin = (email, password) => {
    authorization(email, password)
      .then(res => {
        if (res) {
          setLoggedIn(true);
          setEmail(email);
          history.push("/");
        }
      })
      .catch(err => {
        console.log(err);
        setRegisterInfo({ icon: iconNo, text: "Что-то пошло не так! Попробуйте ещё раз." });
        setInfoTooltipOpen(true);
      });
  }

  const handleSignOut = () => {
    signOut()
      .then(res => {
        console.log('exit');
        if (res) {
          setLoggedIn(false);
          history.push("/sign-in")
        }
      });
  }

  useEffect(() => {
    getContent()
      .then(res => {
        if (res) {
          setEmail(res.email);
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch(err => console.log(err));
  }, [history]);

  useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
        .then(data => {
          setCurrentUser(data);
        })
        .catch(err => console.log(err));
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      api.getInitialCards()
        .then(data => {
          setCards(data)
        })
        .catch(err => console.log(err));
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__size">

          <Header
            loggedIn={loggedIn}
            email={email}
            onSignOut={handleSignOut} />

          <Switch>
            <Route path="/sign-up">
              <Register
                name="register"
                title="Регистрация"
                buttonText="Зарегистрироваться"
                onSubmit={handleRegister} />
            </Route>
            <Route path="/sign-in">
              <Login
                name="login"
                title="Вход"
                buttonText="Войти"
                onSubmit={handleLogin} />
            </Route>
            <ProtectedRoute exact path="/" loggedIn={loggedIn}>
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
              <Footer />
            </ProtectedRoute>
          </Switch>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            registerInfo={registerInfo} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
