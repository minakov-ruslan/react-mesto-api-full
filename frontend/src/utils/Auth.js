const baseUrl = 'https://api.mesto.minakov.nomoredomains.icu';
const request = ({ url, method = 'POST', data }) => {
  return fetch(`${baseUrl}${url}`, {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    ...!!data && { body: JSON.stringify(data) }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export const registration = (email, password) => {
  return request({
    url: '/signup',
    data: { email, password }
  });
}

export const authorization = (email, password) => {
  return request({
    url: '/signin',
    data: { email, password }
  });
}

export const getContent = () => {
  return request({
    url: '/users/me',
    method: 'GET',
  });
}

export const signOut = () => {
  return request({
    url: '/signout',
    method: 'GET',
  });
}