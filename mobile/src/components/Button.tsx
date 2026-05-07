import { TouchableOpacity, Text, StyleSheet } from 'react-native'

export const Button = ({ title, onPress }: any) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#6C63FF',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10
  },
  text: {
    color: '#fff',
    fontWeight: 'bold'
  }
})

