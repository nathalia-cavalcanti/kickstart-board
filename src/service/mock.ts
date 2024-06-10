import axios from 'axios';

export const API_MOCK = axios.create({
    baseURL: process.env.API_MOCK_BASE_URL,
    headers: {'content-type':'application/json'},

    //Remove when use a real API returning empty array with status 200
    validateStatus: (status) => {
        return status === 404 || (status >= 200 && status <= 300)
    },
})

API_MOCK.interceptors.response.use((response) => {
    if (response.status === 404) {
        response.data = []
    }
        return response;
    }
)