import { check } from 'k6';
import http from 'k6/http';

export default function () {
  const url = 'http://localhost:3030/users/login';
  const payload = JSON.stringify({
    email: 'samuelmwaniki17@gmail.com',
    password: 'samm',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
 const res = http.post(url, payload, params);
  check(res,{
    'is status 200': (r) => r.status === 200,
  })
}
