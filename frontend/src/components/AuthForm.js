import { useState } from 'react';

function AuthForm({ name, title, buttonText, onSubmit, children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = e => {
    const { value } = e.target;
    e.target.name === 'email' ? setEmail(value) : setPassword(value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(email, password);
  }

  return (
    <div className="auth">
      <form className="auth-form"
        name={name}
        onSubmit={handleSubmit}>
        <h2 className="auth-form__title">{title}</h2>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email || ""}
          onChange={handleInputChange}
          className="auth-form__input"
          name="email"
          minLength="6"
          maxLength="40"
          required
        />
        <input
          id="password"
          type="password"
          placeholder="Пароль"
          value={password || ""}
          onChange={handleInputChange}
          className="auth-form__input"
          name="password"
          minLength="6"
          maxLength="40"
          required
        />
        <button
          className="auth-form__submit-button"
          type="submit">
          {buttonText}
        </button>
      </form>
      {children}
    </div>
  )
}

export default AuthForm;