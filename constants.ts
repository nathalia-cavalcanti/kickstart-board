import 'dotenv/config'
export default {
    APP: parseInt(process.env.APP as string) || 3000,
    SECRET_ACCESS_KEY_AWS: process.env.VUE_APP_SECRET_ACCESS_KEY_AWS,
    ACCESS_KEY_ID_AWS: process.env.VUE_APP_ACCESS_KEY_ID_AWS,   
    API_MOCK_BASE_URL: process.env.VUE_APP_API_MOCK_BASE_URL
}