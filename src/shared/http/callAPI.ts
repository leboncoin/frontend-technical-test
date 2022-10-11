import axios from 'axios';
import { baseURL } from '../constants';

const callAPI = axios.create({
    baseURL,
});

export default callAPI;
