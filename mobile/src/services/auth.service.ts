export const signIn = async (email: string, password: string) => {
  await new Promise(r => setTimeout(r, 1000))

  if (email === 'teste@email.com' && password === '123456') {
    return { id: '1', name: 'Breno' }
  }

  throw new Error('Credenciais inválidas')
}

export const signUp = async () => {
  await new Promise(r => setTimeout(r, 1000))
  return true
}