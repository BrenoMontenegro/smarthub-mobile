import AsyncStorage from '@react-native-async-storage/async-storage'

const TOKEN_KEY = '@smarthub:token'
const USERNAME_KEY = '@smarthub:username'

export const storage = {
  saveToken: (token: string) => AsyncStorage.setItem(TOKEN_KEY, token),
  getToken: () => AsyncStorage.getItem(TOKEN_KEY),
  clearToken: () => AsyncStorage.removeItem(TOKEN_KEY),
  saveUsername: (username: string) => AsyncStorage.setItem(USERNAME_KEY, username),
  getUsername: () => AsyncStorage.getItem(USERNAME_KEY),
  clearAll: () => AsyncStorage.multiRemove([TOKEN_KEY, USERNAME_KEY]),
}
