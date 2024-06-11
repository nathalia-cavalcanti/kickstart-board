import axios from 'axios';

export const API_MOCK = axios.create({
    baseURL: process.env.API_MOCK_BASE_URL,
    headers: {'content-type':'application/json'},
})
