import axios from 'axios';

export default axios.create({
  // baseURL: 'https://api.mvmehra.store/api/',
  // baseURL: 'http://jodibanao.co.in/api/',
  baseURL: 'https://www.jodibanao.in/api/',
  headers: {
    'Content-Type': 'application/json'
  }
});
