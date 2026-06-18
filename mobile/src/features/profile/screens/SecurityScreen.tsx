import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../../../shared/theme/ThemeContext'
import { changePassword } from '../../../shared/services/user.service'
import { profileScreenStyles as styles } from './profileScreens.styles'

export function SecurityScreen({ navigation }: any) {
  const { colors } = useTheme()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function handleSave() {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Preencha todos os campos.')
      return
    }
    if (newPassword.length < 6) {
      setError('A nova senha deve ter pelo menos 6 caracteres.')
      return
    }
    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')
    try {
      await changePassword({ currentPassword, newPassword })
      setSuccess('Senha alterada com sucesso!')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (e: any) {
      setError(e?.response?.data?.message ?? 'Não foi possível alterar a senha.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = [
    styles.input,
    { borderColor: colors.border, color: colors.text, backgroundColor: colors.surface },
  ]

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Segurança</Text>
      </View>

      <View style={styles.content}>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.infoText, { color: colors.textSecondary, marginBottom: 16 }]}>
            Redefina sua senha de acesso ao SmartHub.
          </Text>

          <Text style={[styles.label, { color: colors.text }]}>Senha atual</Text>
          <TextInput style={inputStyle} value={currentPassword} onChangeText={setCurrentPassword} secureTextEntry />

          <Text style={[styles.label, { color: colors.text }]}>Nova senha</Text>
          <TextInput style={inputStyle} value={newPassword} onChangeText={setNewPassword} secureTextEntry />

          <Text style={[styles.label, { color: colors.text }]}>Confirmar nova senha</Text>
          <TextInput style={inputStyle} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

          {error ? <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text> : null}
          {success ? <Text style={[styles.errorText, { color: colors.success }]}>{success}</Text> : null}

          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: colors.primary }]}
            onPress={handleSave}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.saveButtonText}>Redefinir senha</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}
