import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTheme } from '../../../shared/theme/ThemeContext'
import { profileScreenStyles as styles } from './profileScreens.styles'

const LANGUAGE_KEY = '@smarthub:appLanguage'

const languages = [
  { id: 'pt', label: 'Português (Brasil)', description: 'Interface do aplicativo em português' },
  { id: 'en', label: 'English', description: 'App interface in English' },
]

export function LanguageSettingsScreen({ navigation }: any) {
  const { colors } = useTheme()
  const [selected, setSelected] = useState('pt')

  useEffect(() => {
    AsyncStorage.getItem(LANGUAGE_KEY).then(saved => {
      if (saved) setSelected(saved)
    })
  }, [])

  async function handleSelect(id: string) {
    setSelected(id)
    await AsyncStorage.setItem(LANGUAGE_KEY, id)
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Linguagem e idioma</Text>
      </View>

      <View style={styles.content}>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.infoText, { color: colors.textSecondary, marginBottom: 16 }]}>
            Escolha o idioma preferido para a interface do SmartHub.
          </Text>

          {languages.map(lang => (
            <TouchableOpacity
              key={lang.id}
              style={[styles.optionRow, { borderBottomColor: colors.border }]}
              onPress={() => handleSelect(lang.id)}
            >
              <View style={{ flex: 1 }}>
                <Text style={[styles.optionLabel, { color: colors.text }]}>{lang.label}</Text>
                <Text style={[styles.optionDescription, { color: colors.textSecondary }]}>
                  {lang.description}
                </Text>
              </View>
              {selected === lang.id && (
                <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  )
}
