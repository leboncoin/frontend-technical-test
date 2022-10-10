import axios from 'axios';
import { baseURL } from '../constants';

const fetcher = axios.create({
    baseURL,
});

export default fetcher;
