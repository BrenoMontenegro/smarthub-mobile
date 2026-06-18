import api, { getApiBaseUrl } from '../config/api'
import { storage } from '../utils/storage'
import axios from 'axios'

export const signIn = async (email: string, password: string) => {
  const { data } = await api.post('/auth/login', { email, password })
  await storage.saveToken(data.token)
  await storage.saveUsername(data.username)
  return { id: data.userId, name: data.username }
}

export const signUp = async (username: string, email: string, password: string) => {
  await storage.clearAll()
  const { data } = await api.post('/auth/register', { username, email, password })
  await storage.saveToken(data.token)
  await storage.saveUsername(data.username)
  return { id: data.userId, name: data.username }
}

export const signOut = async () => {
  await storage.clearAll()
}

export function getAuthErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message
    if (typeof message === 'string' && message.length > 0) {
      return message
    }
    if (!error.response) {
      if (error.code === 'ECONNABORTED') {
        return 'Tempo esgotado ao conectar ao servidor.'
      }
      return 'Não foi possível conectar ao servidor. Verifique se o Docker está rodando e se o IP em api.ts está correto.'
    }
    if (error.response.status === 401) {
      return 'Email ou senha inválidos.'
    }
    if (error.response.status === 409) {
      return 'Email ou username já está em uso.'
    }
  }
  if (error instanceof Error && error.name === 'AsyncStorageError') {
    return 'Erro ao salvar dados no dispositivo (AsyncStorage). Reinicie o Expo com --clear.'
  }
  return fallback
}

export function formatAuthErrorDebug(error: unknown): string {
  const lines: string[] = [`API: ${getApiBaseUrl()}`]

  if (axios.isAxiosError(error)) {
    lines.push(`code: ${error.code ?? 'n/a'}`)
    lines.push(`message: ${error.message}`)

    if (error.config) {
      const method = error.config.method?.toUpperCase() ?? 'POST'
      const path = error.config.url ?? '/auth/login'
      lines.push(`request: ${method} ${error.config.baseURL ?? ''}${path}`)
    }

    if (error.response) {
      lines.push(`status: ${error.response.status}`)
      lines.push(`data: ${JSON.stringify(error.response.data)}`)
    } else {
      lines.push('response: sem resposta do servidor (rede/firewall?)')
    }
  } else if (error instanceof Error) {
    lines.push(`name: ${error.name}`)
    lines.push(`message: ${error.message}`)
    if (error.stack) {
      lines.push(`stack: ${error.stack}`)
    }
  } else {
    lines.push(`raw: ${String(error)}`)
  }

  return lines.join('\n')
}
