import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AuthStack from './src/app/navigation/AuthStack'
import { ThemeProvider } from './src/shared/theme/ThemeContext'

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
