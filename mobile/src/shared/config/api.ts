import axios from 'axios'
import Constants from 'expo-constants'
import { storage } from '../utils/storage'

function getBaseUrl(): string {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL
  }
  const debuggerHost = Constants.expoGoConfig?.debuggerHost?.split(':')[0]
  if (debuggerHost) {
    return `http://${debuggerHost}:8080/api`
  }
  return 'http://localhost:8080/api'
}

export const getApiBaseUrl = getBaseUrl
const BASE_URL = getBaseUrl()

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
})

api.interceptors.request.use(async (config) => {
  const isAuthRoute = config.url?.startsWith('/auth/')
  if (!isAuthRoute) {
    const token = await storage.getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await storage.clearAll()
    }
    return Promise.reject(error)
  }
)

export default api
