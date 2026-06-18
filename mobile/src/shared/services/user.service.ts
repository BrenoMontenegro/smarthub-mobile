import api from '../config/api'

export interface UserProfile {
  userId: string
  username: string
  email: string
  totalXp: number
  level: number
  streakDays: number
}

export async function getUserProfile(): Promise<UserProfile> {
  const { data } = await api.get('/users/me')
  return {
    userId: data.userId,
    username: data.username,
    email: data.email,
    totalXp: data.totalXp,
    level: data.level,
    streakDays: data.streakDays ?? 0,
  }
}

export async function updateUserProfile(payload: {
  username: string
  email: string
}): Promise<UserProfile> {
  const { data } = await api.put('/users/me', payload)
  return {
    userId: data.userId,
    username: data.username,
    email: data.email,
    totalXp: data.totalXp,
    level: data.level,
    streakDays: data.streakDays ?? 0,
  }
}

export async function changePassword(payload: {
  currentPassword: string
  newPassword: string
}): Promise<void> {
  await api.put('/users/me/password', payload)
}
