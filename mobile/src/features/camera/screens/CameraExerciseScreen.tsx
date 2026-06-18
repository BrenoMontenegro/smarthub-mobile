import React from 'react'

import {
  View,
  Text,
} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

import { styles } from './camera.styles'
import { BottomNav } from '../../../shared/components/BottomNav'
import { useTheme } from '../../../shared/theme/ThemeContext'

export function CameraExerciseScreen({ navigation }: any) {
  const { colors } = useTheme()

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.content}>
        <Ionicons name="camera-outline" size={64} color={colors.primary} style={{ marginBottom: 20 }} />
        <Text style={[styles.title, { color: colors.text }]}>
          Exercícios com câmera
        </Text>

        <Text style={[styles.description, { color: colors.textSecondary }]}>
          Em breve você poderá resolver desafios
          usando a câmera do celular.
        </Text>
      </View>

      <BottomNav navigation={navigation} currentRoute="CameraExercises" />
    </SafeAreaView>
  )
}
