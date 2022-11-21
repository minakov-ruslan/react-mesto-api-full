import logo from '../images/header-logo.svg';
import { Link, Route, Switch } from 'react-router-dom';

function Header({ loggedIn, email, onSignOut }) {
  return (
    <header className="header">
      <img
        src={logo}
        alt="Логотип Mesto Russia"
        className="header__logo"
      />
      {
        loggedIn ?
          <>
            <div className="header__container">
              <p className="header__email">{email}</p>
              <button className="header__button" onClick={onSignOut}>Выйти</button>
            </div>
          </> :
          <Switch>
            <Route path="/sign-in">
              <Link
                className="header__link"
                to="sign-up">
                Регистрация
              </Link>
            </Route>
            <Route path="/sign-up">
              <Link
                className="header__link"
                to="sign-in">
                Войти
              </Link>
            </Route>
          </Switch>
      }
    </header>
  );
}

export default Header;