import React, { useState } from 'react'

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native'

import { styles } from './exerciseConfig.styles'

import {
  languages,
  difficulties,
} from './exerciseConfig.mock'

export function ExerciseConfigScreen({
  navigation,
  route,
}: any) {
  const { activityType, challenge } = route.params

  const [selectedLanguage, setSelectedLanguage] = useState<any>(null)

  const [selectedDifficulty, setSelectedDifficulty] =
    useState('')

  function handleStart() {
    if (!selectedLanguage || !selectedDifficulty) {
      return
    }

    if (activityType === 'quiz') {
      navigation.navigate('Quiz', {
        language: selectedLanguage,
        difficulty: selectedDifficulty,
        challenge,
      })
    }

    if (activityType === 'code-complete') {
      navigation.navigate('CompleteCode', {
        language: selectedLanguage,
        difficulty: selectedDifficulty,
        challenge,
      })
    }

    if (activityType === 'acertar-output') {
      navigation.navigate('Output', {
        language: selectedLanguage,
        difficulty: selectedDifficulty,
        challenge,
      })
    }
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <Text style={styles.title}>
        Selecione uma linguagem:
      </Text>

      <View style={styles.cardsContainer}>
        {languages.map(language => (
          <TouchableOpacity
            key={language.id}
            style={[
              styles.card,

              selectedLanguage?.id === language.id &&
                styles.selectedCard,
            ]}
            onPress={() =>
              setSelectedLanguage(language)
            }
          >
            <Text style={styles.icon}>
              {language.icon}
            </Text>

            <Text style={styles.cardTitle}>
              {language.name}
            </Text>

            <Text style={styles.description}>
              {language.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.title}>
        Selecione uma dificuldade:
      </Text>

      <View style={styles.difficultyContainer}>
        {difficulties.map(difficulty => (
          <TouchableOpacity
            key={difficulty}
            style={[
              styles.difficultyButton,

              selectedDifficulty === difficulty &&
                styles.selectedDifficulty,
            ]}
            onPress={() =>
              setSelectedDifficulty(difficulty)
            }
          >
            <Text
              style={[
                styles.difficultyText,

                selectedDifficulty === difficulty &&
                  styles.selectedDifficultyText,
              ]}
            >
              {difficulty}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.startButton}
        onPress={handleStart}
      >
        <Text style={styles.startButtonText}>
          Iniciar
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}