import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../../../shared/theme/ThemeContext'
import { profileScreenStyles as styles } from './profileScreens.styles'

export function ThemeSettingsScreen({ navigation }: any) {
  const { colors, mode, setMode } = useTheme()

  const options: { id: 'light' | 'dark'; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { id: 'light', label: 'Claro', icon: 'sunny-outline' },
    { id: 'dark', label: 'Escuro', icon: 'moon-outline' },
  ]

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Tema</Text>
      </View>

      <View style={styles.content}>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.infoText, { color: colors.textSecondary, marginBottom: 16 }]}>
            Escolha a aparência do aplicativo.
          </Text>

          {options.map(option => (
            <TouchableOpacity
              key={option.id}
              style={[styles.optionRow, { borderBottomColor: colors.border }]}
              onPress={() => setMode(option.id)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <Ionicons name={option.icon} size={24} color={colors.primary} />
                <Text style={[styles.optionLabel, { color: colors.text }]}>{option.label}</Text>
              </View>
              {mode === option.id && (
                <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  )
}
