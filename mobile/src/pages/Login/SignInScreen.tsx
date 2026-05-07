import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function SignInScreen({ navigation }: any) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Sign In</Text>

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

      {/* Options */}
      <View style={styles.options}>
        <View style={styles.remember}>
          <View style={styles.checkbox} />
          <Text style={styles.rememberText}>Remember me</Text>
        </View>

        <Text style={styles.forgot}>Forgot Password</Text>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Divider */}
      <Text style={styles.or}>- OR -</Text>
      <Text style={styles.socialText}>Sign in with</Text>

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
        Não possui uma conta?{' '}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('SignUp')}
        >
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