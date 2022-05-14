import axios from 'axios';
import { BASE_URL } from '../../config';

export async function ListGet() {
    return axios.get(`${BASE_URL + 'users'}`)
}
