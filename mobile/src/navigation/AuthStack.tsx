import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignInScreen from '../pages/Login/SignInScreen'
import SignUpScreen from '../pages/Login/SignUpScreen'
import SuccessScreen from '../pages/Login/SuccessScreen'
import { HomeScreen } from '../pages/Home/HomeScreen'

const Stack = createNativeStackNavigator()

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Success" component={SuccessScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  )
}