import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Image } from 'react-native'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { signIn, getAuthErrorMessage, formatAuthErrorDebug } from '../../../shared/services/auth.service'

export default function SignInScreen({ navigation }: any) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin() {
    if (!email || !password) {
      setError('Preencha email e senha.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await signIn(email, password)
      navigation.navigate('Home')
    } catch (err) {
      console.error('[SignIn] erro:', err)
      const message = getAuthErrorMessage(err, 'Email ou senha inválidos.')
      const debug = formatAuthErrorDebug(err)
      setError(`${message}\n\n--- DEBUG ---\n${debug}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>

      <Image
        source={require('../../../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Login</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#aaa" />
        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="key-outline" size={20} color="#aaa" />
        <TextInput
          placeholder="Senha"
          secureTextEntry
          style={styles.input}
          onChangeText={setPassword}
        />
      </View>

      {error ? (
        <ScrollView style={styles.errorBox} nestedScrollEnabled>
          <Text style={styles.errorText} selectable>{error}</Text>
        </ScrollView>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading
          ? <ActivityIndicator color="#FFF" />
          : <Text style={styles.buttonText}>Entrar</Text>}
      </TouchableOpacity>

      <Text style={styles.footer}>
        Não possui uma conta?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
          Cadastre-se
        </Text>
      </Text>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 8,
    backgroundColor: '#fff',
  },
  logo: {
    width: 280,
    height: 280,
    alignSelf: 'center',
    marginBottom: -20,
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '700',
    color: '#1E1E1E',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  errorBox: {
    maxHeight: 160,
    marginBottom: 10,
    backgroundColor: '#fff5f5',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#f5c6c6',
  },
  errorText: {
    color: '#c0392b',
    fontSize: 11,
    fontFamily: 'monospace',
    lineHeight: 16,
  },
  button: {
    backgroundColor: '#6C5CE7',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },
  footer: {
    textAlign: 'center',
    fontSize: 13,
    color: '#666',
  },
  link: {
    fontWeight: '700',
    color: '#6C5CE7',
  },
})
