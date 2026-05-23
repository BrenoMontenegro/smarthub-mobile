import { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { mockQuestions } from '../data/mockQuestions'
import { styles } from './quiz.styles'

export function QuizScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const question = mockQuestions[currentQuestionIndex]

  function handleSelectOption(option: string) {
    setSelectedOption(option)

    const correct = option === question.correctAnswer
    setIsCorrect(correct)
  }

  function handleNextQuestion() {
    setSelectedOption(null)
    setIsCorrect(null)
    setCurrentQuestionIndex(prev => prev + 1)
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Quiz de Programação
        </Text>

        <Text style={styles.progressText}>
          Questão {currentQuestionIndex + 1} de {mockQuestions.length}
        </Text>

        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${
                  ((currentQuestionIndex + 1) /
                    mockQuestions.length) *
                  100
                }%`,
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.questionCard}>
        <Text style={styles.questionType}>
          DESAFIO
        </Text>

        <Text style={styles.questionTitle}>
          {question.title}
        </Text>

        <View style={styles.codeContainer}>
          <Text style={styles.codeText}>
            {question.code}
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          {question.options.map(option => {
            const isSelected =
              selectedOption === option

            const isWrong =
              isSelected && !isCorrect

            return (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,

                  isSelected &&
                    isCorrect &&
                    styles.optionSelected,

                  isWrong &&
                    styles.optionWrong,
                ]}
                onPress={() =>
                  handleSelectOption(option)
                }
                disabled={selectedOption !== null}
              >
                <Text style={styles.optionText}>
                  {option}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>

      {isCorrect !== null && (
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackTitle}>
            {isCorrect
              ? '✅ Correto!'
              : '❌ Resposta incorreta'}
          </Text>

          <Text style={styles.feedbackText}>
            {question.explanation}
          </Text>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNextQuestion}
          >
            <Text style={styles.nextButtonText}>
              Próxima Questão
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  )
}