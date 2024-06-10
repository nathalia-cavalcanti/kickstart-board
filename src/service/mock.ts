import axios from 'axios';

const API_MOCK_BASE_URL = 'https://66650c11d122c2868e3facc6.mockapi.io'

export const API_MOCK = axios.create({
    baseURL: API_MOCK_BASE_URL,
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