import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
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
      
      <Text style={styles.title}>Sign Up</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          style={styles.input}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      </View>

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

      <View style={styles.inputContainer}>
        <Ionicons name="key-outline" size={20} color="#aaa" />
        <TextInput
          placeholder="Confirmar Senha"
          secureTextEntry
          style={styles.input}
          onChangeText={setConfirmPassword}
        />
      </View>

      <View style={styles.terms}>
        <View style={styles.checkbox} />
        <Text style={styles.termsText}>
          Aceito os termos de uso e política de privacidade
        </Text>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSignUp}
        disabled={loading}
      >
        {loading
          ? <ActivityIndicator color="#333" />
          : <Text style={styles.buttonText}>Cadastrar</Text>}
      </TouchableOpacity>

      <Text style={styles.or}>- OU -</Text>
      <Text style={styles.socialText}>Entre usando</Text>

      <View style={styles.socialContainer}>
        <View style={styles.socialButton}>
          <Text style={{ fontWeight: 'bold' }}>f</Text>
        </View>

        <View style={styles.socialButton}>
          <Text style={{ fontWeight: 'bold' }}>G</Text>
        </View>
      </View>

      <Text style={styles.footer}>
        Já possui conta?{' '}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('SignIn')}
        >
          Entrar
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

  terms: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },

  checkbox: {
    width: 14,
    height: 14,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8
  },

  termsText: {
    fontSize: 11,
    color: '#555',
    flex: 1
  },

  errorText: {
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 13
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
