import React, { useCallback, useState } from 'react'

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

import { styles } from './profile.style'
import { getUserProfile, UserProfile } from '../../../shared/services/user.service'
import { signOut } from '../../../shared/services/auth.service'
import { BottomNav } from '../../../shared/components/BottomNav'
import { useTheme } from '../../../shared/theme/ThemeContext'

interface ProfileOption {
  label: string
  icon: keyof typeof Ionicons.glyphMap
  onPress: () => void
  danger?: boolean
}

export function ProfileScreen({ navigation }: any) {
  const { colors } = useTheme()
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useFocusEffect(
    useCallback(() => {
      setLoading(true)
      getUserProfile()
        .then(setUserProfile)
        .catch(() => {})
        .finally(() => setLoading(false))
    }, []),
  )

  async function handleLogout() {
    await signOut()
    navigation.replace('SignIn')
  }

  const accountOptions: ProfileOption[] = [
    {
      label: 'Editar informações do perfil',
      icon: 'create-outline',
      onPress: () => navigation.navigate('EditProfile', { profile: userProfile }),
    },
    {
      label: 'Linguagem e idioma',
      icon: 'language-outline',
      onPress: () => navigation.navigate('LanguageSettings'),
    },
  ]

  const settingsOptions: ProfileOption[] = [
    {
      label: 'Segurança',
      icon: 'shield-checkmark-outline',
      onPress: () => navigation.navigate('Security'),
    },
    {
      label: 'Tema',
      icon: 'color-palette-outline',
      onPress: () => navigation.navigate('ThemeSettings'),
    },
  ]

  const supportOptions: ProfileOption[] = [
    {
      label: 'Ajuda e suporte',
      icon: 'help-circle-outline',
      onPress: () => navigation.navigate('Info', { type: 'HelpSupport' }),
    },
    {
      label: 'Entre em contato conosco',
      icon: 'mail-outline',
      onPress: () => navigation.navigate('Info', { type: 'Contact' }),
    },
    {
      label: 'Políticas e privacidade',
      icon: 'document-text-outline',
      onPress: () => navigation.navigate('Info', { type: 'Privacy' }),
    },
    {
      label: 'Sair da conta',
      icon: 'log-out-outline',
      onPress: handleLogout,
      danger: true,
    },
  ]

  function renderCard(options: ProfileOption[]) {
    return (
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={option.label}
            style={[
              styles.option,
              index < options.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
            ]}
            onPress={option.onPress}
          >
            <View style={styles.optionRow}>
              <Ionicons
                name={option.icon}
                size={20}
                color={option.danger ? colors.error : colors.primary}
              />
              <Text
                style={[
                  styles.optionText,
                  { color: option.danger ? colors.error : colors.text },
                  option.danger && styles.logoutText,
                ]}
              >
                {option.label}
              </Text>
            </View>
            {!option.danger && (
              <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    )
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Perfil</Text>
        </View>

        <View style={styles.profileContainer}>
          <View style={[styles.avatarInitial, { backgroundColor: colors.avatarBg }]}>
            <Ionicons name="person" size={48} color={colors.avatarIcon} />
          </View>

          {loading ? (
            <ActivityIndicator color={colors.primary} style={{ marginVertical: 12 }} />
          ) : (
            <>
              <Text style={[styles.username, { color: colors.text }]}>
                {userProfile?.username ?? '—'}
              </Text>
              <Text style={[styles.email, { color: colors.textSecondary }]}>
                {userProfile?.email ?? '—'}
              </Text>
            </>
          )}
        </View>

        {renderCard(accountOptions)}
        {renderCard(settingsOptions)}
        {renderCard(supportOptions)}
      </ScrollView>

      <BottomNav navigation={navigation} currentRoute="Profile" />
    </SafeAreaView>
  )
}
