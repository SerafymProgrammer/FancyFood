export const auth_request = data => {
  return fetch('http://localhost:3001/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  }).then(res => res.json());
};
