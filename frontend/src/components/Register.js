import { Link } from 'react-router-dom';
import AuthForm from './AuthForm.js';

function Register(props) {
  return (
    <AuthForm {...props}>
      <Link
        className="auth__link"
        to="sign-in">
        Уже зарегистрированы? Войти
      </Link>
    </AuthForm>
  )
}

export default Register;