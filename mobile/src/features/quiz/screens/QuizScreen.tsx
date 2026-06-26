import { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { playCorrectSound, playWrongSound } from '../../../shared/utils/sound'
import { Ionicons } from '@expo/vector-icons'
import { styles } from './quiz.styles'
import { Question } from '../types/quiz.types'
import { getQuizQuestions, saveQuizResult } from '../services/quiz.service'
import { useTheme } from '../../../shared/theme/ThemeContext'

function xpPerQuestion(difficulty: string): number {
  if (difficulty === 'Difícil') return 80
  if (difficulty === 'Médio') return 40
  return 20
}

export function QuizScreen({ navigation, route }: any) {
  const { language, difficulty } = route?.params ?? {}
  const insets = useSafeAreaInsets()
  const { colors } = useTheme()

  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [xpEarned, setXpEarned] = useState<number | null>(null)
  const scrollRef = useRef<ScrollView>(null)

  useEffect(() => {
    loadQuestions()
  }, [])

  useEffect(() => {
    if (isCorrect !== null) {
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100)
    }
  }, [isCorrect])

  async function loadQuestions() {
    try {
      const data = await getQuizQuestions(language?.name ?? '', difficulty ?? '')
      if (data.length === 0) {
        setError('Nenhuma questão encontrada para essa combinação.')
        return
      }
      setQuestions(data)
    } catch {
      setError('Não foi possível carregar as questões.')
    } finally {
      setLoading(false)
    }
  }

  function handleSelectOption(option: string) {
    const question = questions[currentQuestionIndex]
    const correct = option === question.correctAnswer
    setSelectedOption(option)
    setIsCorrect(correct)
    if (correct) {
      setScore(prev => prev + 1)
      playCorrectSound()
    } else {
      playWrongSound()
    }
  }

  function handleNextQuestion() {
    setSelectedOption(null)
    setIsCorrect(null)
    setCurrentQuestionIndex(prev => prev + 1)
    scrollRef.current?.scrollTo({ y: 0, animated: false })
  }

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }

  if (error) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background, padding: 32 }]}>
        <Ionicons name="alert-circle-outline" size={48} color={colors.textSecondary} style={{ marginBottom: 16 }} />
        <Text style={[styles.errorText, { color: colors.textSecondary }]}>{error}</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.primaryButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const question = questions[currentQuestionIndex]

  if (!question) {
    return (
      <ResultScreen
        score={score}
        total={questions.length}
        difficulty={difficulty ?? ''}
        xpEarned={xpEarned}
        onXpEarned={setXpEarned}
        onBack={() => navigation.navigate('Home')}
      />
    )
  }

  const showFeedback = isCorrect !== null

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top']}>
    <ScrollView
      ref={scrollRef}
      style={styles.container}
      contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 12) + 24 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Quiz de Programação</Text>
        <Text style={[styles.progressText, { color: colors.textSecondary }]}>
          Questão {currentQuestionIndex + 1} de {questions.length}
        </Text>
        <View style={[styles.progressBarContainer, { backgroundColor: colors.border }]}>
          <View
            style={[
              styles.progressBar,
              { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` },
            ]}
          />
        </View>
      </View>

      <View style={[styles.questionCard, { backgroundColor: colors.card }]}>
        <Text style={[styles.questionType, { color: colors.textSecondary }]}>DESAFIO</Text>
        <Text style={[styles.questionTitle, { color: colors.text }]}>{question.title}</Text>

        {question.code ? (
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>{question.code}</Text>
          </View>
        ) : null}

        <View style={styles.optionsContainer}>
          {question.options.map(option => {
            const isSelected = selectedOption === option
            const isCorrectOption = option === question.correctAnswer
            const isWrong = isSelected && !isCorrect

            return (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  { backgroundColor: colors.card, borderColor: colors.border },
                  showFeedback && isCorrectOption && styles.optionCorrect,
                  showFeedback && isWrong && styles.optionWrong,
                  !showFeedback && isSelected && styles.optionSelected,
                ]}
                onPress={() => handleSelectOption(option)}
                disabled={showFeedback}
              >
                <Text style={[styles.optionText, { color: colors.text }]}>{option}</Text>
                {showFeedback && isCorrectOption && (
                  <Ionicons name="checkmark-circle" size={22} color="#58CC02" style={styles.optionIcon} />
                )}
                {showFeedback && isWrong && (
                  <Ionicons name="close-circle" size={22} color="#FF4D4D" style={styles.optionIcon} />
                )}
              </TouchableOpacity>
            )
          })}
        </View>
      </View>

      {showFeedback && (
        <View style={[styles.feedbackContainer, isCorrect ? styles.feedbackCorrect : styles.feedbackWrong]}>
          <View style={styles.feedbackHeader}>
            <Ionicons
              name={isCorrect ? 'checkmark-circle' : 'close-circle'}
              size={28}
              color={isCorrect ? '#27ae60' : '#e74c3c'}
            />
            <Text style={[styles.feedbackTitle, { color: isCorrect ? '#27ae60' : '#e74c3c' }]}>
              {isCorrect ? 'Correto!' : 'Resposta incorreta'}
            </Text>
          </View>

          {!isCorrect && (
            <View style={[styles.correctAnswerBox, { backgroundColor: colors.surface }]}>
              <Text style={[styles.correctAnswerLabel, { color: colors.textSecondary }]}>Resposta correta:</Text>
              <Text style={[styles.correctAnswerText, { color: colors.text }]}>{question.correctAnswer}</Text>
            </View>
          )}

          <Text style={[styles.feedbackExplanationLabel, { color: colors.textSecondary }]}>Explicação:</Text>
          <Text style={[styles.feedbackText, { color: colors.textSecondary }]}>{question.explanation}</Text>

          <TouchableOpacity
            style={[styles.nextButton, { backgroundColor: colors.card, borderColor: colors.primary }]}
            onPress={handleNextQuestion}
          >
            <Text style={[styles.nextButtonText, { color: colors.primary }]}>
              {currentQuestionIndex + 1 >= questions.length ? 'Ver resultado' : 'Próxima questão'}
            </Text>
            <Ionicons name="arrow-forward" size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
    </SafeAreaView>
  )
}

function ResultScreen({
  score,
  total,
  difficulty,
  xpEarned,
  onXpEarned,
  onBack,
}: {
  score: number
  total: number
  difficulty: string
  xpEarned: number | null
  onXpEarned: (xp: number) => void
  onBack: () => void
}) {
  const { colors } = useTheme()
  const [saving, setSaving] = useState(false)
  const expectedXp = score * xpPerQuestion(difficulty)

  useEffect(() => {
    if (xpEarned !== null) return
    setSaving(true)
    saveQuizResult('QUIZ', score, total, difficulty)
      .then(({ xpEarned: earned }) => onXpEarned(earned))
      .catch(() => onXpEarned(expectedXp))
      .finally(() => setSaving(false))
  }, [])

  return (
    <View style={[styles.resultContainer, { backgroundColor: colors.background }]}>
      <Ionicons name="trophy" size={72} color={colors.primary} style={{ marginBottom: 16 }} />
      <Text style={[styles.resultTitle, { color: colors.text }]}>Parabéns!</Text>
      <Text style={[styles.resultSubtitle, { color: colors.textSecondary }]}>Você concluiu o quiz</Text>

      <View style={[styles.resultScoreCard, { backgroundColor: colors.card }]}>
        <Text style={[styles.resultScoreLabel, { color: colors.textSecondary }]}>Acertos</Text>
        <Text style={[styles.resultScoreValue, { color: colors.primary }]}>{score}/{total}</Text>
      </View>

      {saving ? (
        <ActivityIndicator color={colors.primary} style={{ marginVertical: 16 }} />
      ) : (
        <View style={styles.xpCard}>
          <Ionicons name="star" size={24} color="#27ae60" />
          <Text style={styles.xpText}>+{xpEarned ?? expectedXp} XP ganhos</Text>
        </View>
      )}

      <Text style={[styles.resultMessage, { color: colors.textSecondary }]}>
        {score === total
          ? 'Perfeito! Você acertou todas as questões.'
          : score >= total / 2
          ? 'Bom trabalho! Continue praticando para evoluir.'
          : 'Continue tentando — cada quiz te deixa mais preparado.'}
      </Text>

      <TouchableOpacity style={styles.primaryButton} onPress={onBack}>
        <Ionicons name="home-outline" size={20} color="#FFF" />
        <Text style={styles.primaryButtonText}>Voltar ao início</Text>
      </TouchableOpacity>
    </View>
  )
}
