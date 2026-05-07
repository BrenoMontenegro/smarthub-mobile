import { TextInput, StyleSheet } from 'react-native'

export const Input = (props: any) => {
  return <TextInput style={styles.input} {...props} />
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12
  }
})