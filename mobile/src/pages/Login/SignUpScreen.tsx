import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function SignUpScreen({ navigation }: any) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Sign Up</Text>

      {/* Username */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          style={styles.input}
          onChangeText={setUsername}
        />
      </View>

      {/* Email */}
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#aaa" />
        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={setEmail}
        />
      </View>

      {/* Password */}
      <View style={styles.inputContainer}>
        <Ionicons name="key-outline" size={20} color="#aaa" />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          onChangeText={setPassword}
        />
      </View>

      {/* Confirm Password */}
      <View style={styles.inputContainer}>
        <Ionicons name="key-outline" size={20} color="#aaa" />
        <TextInput
          placeholder="Confirmar Senha"
          secureTextEntry
          style={styles.input}
          onChangeText={setConfirmPassword}
        />
      </View>

      {/* Terms */}
      <View style={styles.terms}>
        <View style={styles.checkbox} />
        <Text style={styles.termsText}>
          Aceito os termos de uso e política de privacidade
        </Text>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Divider */}
      <Text style={styles.or}>- OU -</Text>
      <Text style={styles.socialText}>Entre usando</Text>

      {/* Social */}
      <View style={styles.socialContainer}>
        <View style={styles.socialButton}>
          <Text style={{ fontWeight: 'bold' }}>f</Text>
        </View>

        <View style={styles.socialButton}>
          <Text style={{ fontWeight: 'bold' }}>G</Text>
        </View>
      </View>

      {/* Footer */}
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