import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000',
  validateStatus: (status) => status >= 200 && status < 300,
});

export { client };
