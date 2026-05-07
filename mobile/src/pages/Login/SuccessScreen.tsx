import { View, Text } from 'react-native'
import { Button } from '../components/Button'

export default function SuccessScreen({ navigation }: any) {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>
        Conta criada com sucesso!
      </Text>

      <Button
        title="Ir para login"
        onPress={() => navigation.navigate('SignIn')}
      />
    </View>
  )
}