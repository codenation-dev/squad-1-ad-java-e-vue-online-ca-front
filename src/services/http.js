import axios from 'axios';

const client = axios.create({
  baseURL: 'https://squad-1-back.herokuapp.com',
});

export default client;
