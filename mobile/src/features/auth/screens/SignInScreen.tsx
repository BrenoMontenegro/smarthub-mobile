import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
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

      <Text style={styles.title}>Sign In</Text>

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
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.options}>
        <View style={styles.remember}>
          <View style={styles.checkbox} />
          <Text style={styles.rememberText}>Remember me</Text>
        </View>
        <Text style={styles.forgot}>Forgot Password</Text>
      </View>

      {error ? (
        <ScrollView style={styles.errorBox} nestedScrollEnabled>
          <Text style={styles.errorText} selectable>{error}</Text>
        </ScrollView>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading
          ? <ActivityIndicator color="#333" />
          : <Text style={styles.buttonText}>Login</Text>}
      </TouchableOpacity>

      <Text style={styles.or}>- OR -</Text>
      <Text style={styles.socialText}>Sign in with</Text>

      <View style={styles.socialContainer}>
        <View style={styles.socialButton}>
          <Text style={{ fontWeight: 'bold' }}>f</Text>
        </View>
        <View style={styles.socialButton}>
          <Text style={{ fontWeight: 'bold' }}>G</Text>
        </View>
      </View>

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
    padding: 25,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '500'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 15
  },
  input: {
    flex: 1,
    marginLeft: 10
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  remember: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkbox: {
    width: 14,
    height: 14,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 5
  },
  rememberText: {
    fontSize: 12,
    color: '#555'
  },
  forgot: {
    fontSize: 12,
    color: '#555'
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
    backgroundColor: '#ddd',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#333',
    fontWeight: '500'
  },
  or: {
    textAlign: 'center',
    marginVertical: 15,
    color: '#888'
  },
  socialText: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#666'
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 20
  },
  socialButton: {
    width: 45,
    height: 45,
    backgroundColor: '#eee',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666'
  },
  link: {
    fontWeight: 'bold'
  }
})
