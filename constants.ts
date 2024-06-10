import 'dotenv/config'
export default {
  APP: parseInt(process.env.APP as string) || 3000,
}