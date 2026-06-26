import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { signUp, getAuthErrorMessage } from '../../../shared/services/auth.service'

export default function SignUpScreen({ navigation }: any) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSignUp() {
    if (!username || !email || !password || !confirmPassword) {
      setError('Preencha todos os campos.')
      return
    }
    if (username.length < 3) {
      setError('Username deve ter no mínimo 3 caracteres.')
      return
    }
    if (password.length < 6) {
      setError('Senha deve ter no mínimo 6 caracteres.')
      return
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }

    setLoading(true)
    setError('')
    try {
      await signUp(username.trim(), email.trim().toLowerCase(), password)
      navigation.navigate('Success')
    } catch (err) {
      setError(getAuthErrorMessage(err, 'Não foi possível criar a conta. Tente novamente.'))
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

      <Text style={styles.title}>Cadastrar</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#aaa" />
        <TextInput
          placeholder="Username"
          style={styles.input}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#aaa" />
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

      <View style={styles.inputContainer}>
        <Ionicons name="key-outline" size={20} color="#aaa" />
        <TextInput
          placeholder="Confirmar Senha"
          secureTextEntry
          style={styles.input}
          onChangeText={setConfirmPassword}
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
        {loading
          ? <ActivityIndicator color="#FFF" />
          : <Text style={styles.buttonText}>Cadastrar</Text>}
      </TouchableOpacity>

      <Text style={styles.footer}>
        Já possui conta?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('SignIn')}>
          Entrar
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
    width: 180,
    height: 180,
    alignSelf: 'center',
    marginBottom: -10,
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 16,
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
  errorText: {
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 13,
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
