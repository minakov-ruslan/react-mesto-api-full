import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ loggedIn, children }) {
  return (
    <Route>
      {loggedIn ? children : <Redirect to="/sign-in" />}
    </Route>
  )
}

export default ProtectedRoute;