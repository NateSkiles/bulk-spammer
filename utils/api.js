import * as dotenv from 'dotenv'

dotenv.config()

const API_KEY = process.env.API_KEY
const ORG_NAME = process.env.ORG_NAME

export { API_KEY, ORG_NAME }
