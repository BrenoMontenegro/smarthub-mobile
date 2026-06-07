import { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { mockOutputQuestions } from '../data/mockOutput'
import { styles } from './output.styles'

export function OutputScreen({ navigation }: any) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const question = mockOutputQuestions[currentIndex]

  function handleSelectOption(option: string) {
    setSelectedOption(option)
    setIsCorrect(option === question.correctAnswer)
  }

  function handleNext() {
    setSelectedOption(null)
    setIsCorrect(null)
    setCurrentIndex(prev => prev + 1)
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#6C5CE7" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Acertar o Output</Text>
      </View>

      <Text style={styles.progressText}>
        Questão {currentIndex + 1} de {mockOutputQuestions.length}
      </Text>

      <View style={styles.progressBarBackground}>
        <View style={[
          styles.progressBarFill,
          { width: `${((currentIndex + 1) / mockOutputQuestions.length) * 100}%` }
        ]} />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>DESAFIO</Text>
        <Text style={styles.questionTitle}>{question.title}</Text>
      </View>

      <View style={styles.codeCard}>
        <Text style={styles.codeText}>{question.code}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {question.options.map(option => {
          const isSelected = selectedOption === option
          const isWrong = isSelected && !isCorrect

          return (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                isSelected && isCorrect && styles.optionCorrect,
                isWrong && styles.optionWrong,
              ]}
              onPress={() => handleSelectOption(option)}
              disabled={selectedOption !== null}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          )
        })}
      </View>

      {isCorrect !== null && (
        <View style={isCorrect ? styles.feedbackCorrect : styles.feedbackWrong}>
          <Text style={isCorrect ? styles.feedbackCorrectTitle : styles.feedbackWrongTitle}>
            {isCorrect ? '✅ Correto!' : '❌ Quase lá!'}
          </Text>
          <Text style={styles.feedbackText}>
            {question.explanation}
          </Text>

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Próxima →</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  )
}