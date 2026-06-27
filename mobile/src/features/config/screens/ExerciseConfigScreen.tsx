import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { styles } from './exerciseConfig.styles'
import { languages, difficulties } from './exerciseConfig.mock'
import { useTheme } from '../../../shared/theme/ThemeContext'

export function ExerciseConfigScreen({ navigation, route }: any) {
  const { activityType, challenge } = route.params
  const { colors } = useTheme()
  const [selectedLanguage, setSelectedLanguage] = useState<any>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState('')

  function handleStart() {
    if (!selectedLanguage || !selectedDifficulty) return

    if (activityType === 'quiz') {
      navigation.navigate('Quiz', { language: selectedLanguage, difficulty: selectedDifficulty, challenge })
    }
    if (activityType === 'code-complete') {
      navigation.navigate('CompleteCode', { language: selectedLanguage, difficulty: selectedDifficulty, challenge })
    }
    if (activityType === 'acertar-output') {
      navigation.navigate('Output', { language: selectedLanguage, difficulty: selectedDifficulty, challenge })
    }
    if (activityType === 'codigo-embaralhado') {
      navigation.navigate('SortCode', { language: selectedLanguage, difficulty: selectedDifficulty, challenge })
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>{challenge?.title ?? 'Configurar exercício'}</Text>
      </View>

      <Text style={[styles.title, { color: colors.text }]}>Selecione uma linguagem:</Text>

      <View style={styles.cardsContainer}>
        {languages.map(language => (
          <TouchableOpacity
            key={language.id}
            style={[
              styles.card,
              { backgroundColor: colors.card },
              selectedLanguage?.id === language.id && styles.selectedCard,
            ]}
            onPress={() => setSelectedLanguage(language)}
          >
            <View style={styles.iconContainer}>
              <Ionicons name={language.icon} size={36} color="#6C63FF" />
            </View>
            <Text style={[styles.cardTitle, { color: colors.text }]}>{language.name}</Text>
            <Text style={[styles.description, { color: colors.textSecondary }]}>{language.description}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.title, { color: colors.text }]}>Selecione uma dificuldade:</Text>

      <View style={styles.difficultyContainer}>
        {difficulties.map(difficulty => (
          <TouchableOpacity
            key={difficulty}
            style={[
              styles.difficultyButton,
              { backgroundColor: colors.card },
              selectedDifficulty === difficulty && styles.selectedDifficulty,
            ]}
            onPress={() => setSelectedDifficulty(difficulty)}
          >
            <Text style={[
              styles.difficultyText,
              { color: colors.text },
              selectedDifficulty === difficulty && styles.selectedDifficultyText,
            ]}>
              {difficulty}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.startButton, { backgroundColor: colors.primary }]}
        onPress={handleStart}
      >
        <Text style={[styles.startButtonText, { color: '#FFF' }]}>Iniciar</Text>
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
  )
}
