export type ThemeMode = 'light' | 'dark'

export interface ThemeColors {
  background: string
  surface: string
  text: string
  textSecondary: string
  primary: string
  primaryLight: string
  headerBg: string
  headerText: string
  headerSubtext: string
  card: string
  border: string
  bottomNav: string
  bottomNavBorder: string
  bottomNavInactive: string
  success: string
  error: string
  avatarBg: string
  avatarIcon: string
}

export const lightColors: ThemeColors = {
  background: '#F5F5F5',
  surface: '#FFFFFF',
  text: '#111111',
  textSecondary: '#666666',
  primary: '#6C5CE7',
  primaryLight: '#8477F7',
  headerBg: '#6C5CE7',
  headerText: '#FFFFFF',
  headerSubtext: '#DDD6FF',
  card: '#FFFFFF',
  border: '#E0E0E0',
  bottomNav: '#111827',
  bottomNavBorder: '#1F2937',
  bottomNavInactive: '#9CA3AF',
  success: '#27ae60',
  error: '#e74c3c',
  avatarBg: '#DDD6FF',
  avatarIcon: '#6C5CE7',
}

export const darkColors: ThemeColors = {
  background: '#121212',
  surface: '#1E1E1E',
  text: '#F5F5F5',
  textSecondary: '#AAAAAA',
  primary: '#8B7CF6',
  primaryLight: '#6C5CE7',
  headerBg: '#2D2B55',
  headerText: '#FFFFFF',
  headerSubtext: '#B4ABFF',
  card: '#1E1E1E',
  border: '#333333',
  bottomNav: '#0D0D0D',
  bottomNavBorder: '#2A2A2A',
  bottomNavInactive: '#6B7280',
  success: '#4ade80',
  error: '#f87171',
  avatarBg: '#3D3B6E',
  avatarIcon: '#B4ABFF',
}
