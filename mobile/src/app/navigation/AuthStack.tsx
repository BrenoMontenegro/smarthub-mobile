import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignInScreen from '../../features/auth/screens/SignInScreen'
import SignUpScreen from '../../features/auth/screens/SignUpScreen'
import SuccessScreen from '../../features/auth/screens/SuccessScreen'
import { HomeScreen } from '../../features/home/screens/HomeScreen'
import { QuizScreen } from '../../features/quiz/screens/QuizScreen'
import { CompleteCodeScreen } from '../../features/code-complete/screens/CompleteCodeScreen'
import { ProfileScreen } from '../../features/profile/screens/ProfileScreen'
import { CameraExerciseScreen } from '../../features/camera/screens/CameraExerciseScreen'

const Stack = createNativeStackNavigator()

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Success" component={SuccessScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
      <Stack.Screen name="CompleteCode" component={CompleteCodeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="CameraExercises" component={CameraExerciseScreen} />
    </Stack.Navigator>
  )
}