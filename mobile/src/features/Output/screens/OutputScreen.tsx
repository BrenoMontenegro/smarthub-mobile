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
import { styles } from './output.styles'
import { OutputQuestion } from '../types/output.types'
import { getOutputQuestions } from '../services/output.service'
import { saveQuizResult } from '../../quiz/services/quiz.service'
import { useTheme } from '../../../shared/theme/ThemeContext'

const TIMER_SECONDS = 30

export function OutputScreen({ navigation, route }: any) {
  const { language, difficulty, challenge } = route?.params ?? {}
  const insets = useSafeAreaInsets()
  const { colors } = useTheme()

  const [questions, setQuestions] = useState<OutputQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS)
  const [xpEarned, setXpEarned] = useState<number | null>(null)
  const [savingResult, setSavingResult] = useState(false)
  const timerRef = useRef<any>(null)
  const scrollRef = useRef<ScrollView>(null)

  useEffect(() => {
    loadQuestions()
  }, [])

  useEffect(() => {
    if (selectedOption !== null) {
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100)
    }
  }, [selectedOption])

  async function loadQuestions() {
    try {
      const data = await getOutputQuestions(language?.name ?? '', difficulty ?? '')
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

  useEffect(() => {
    if (loading || questions.length === 0 || selectedOption !== null) return

    setTimeLeft(TIMER_SECONDS)

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          setIsCorrect(false)
          setSelectedOption('__timeout__')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timerRef.current)
  }, [currentIndex, loading])

  useEffect(() => {
    if (selectedOption !== null) {
      clearInterval(timerRef.current)
    }
  }, [selectedOption])

  function handleSelectOption(option: string) {
    const question = questions[currentIndex]
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

  function handleNext() {
    setSelectedOption(null)
    setIsCorrect(null)
    setCurrentIndex(prev => prev + 1)
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

  const question = questions[currentIndex]

  function xpPerQ(): number {
    if (difficulty === 'Difícil') return 80
    if (difficulty === 'Médio') return 40
    return 20
  }

  if (!question) {
    return (
      <ResultScreen
        score={score}
        total={questions.length}
        fallbackXp={score * xpPerQ()}
        xpEarned={xpEarned}
        savingResult={savingResult}
        onSave={async () => {
          setSavingResult(true)
          try {
            const { xpEarned: earned } = await saveQuizResult('OUTPUT', score, questions.length, difficulty ?? '')
            setXpEarned(earned)
          } catch {
            setXpEarned(score * xpPerQ())
          } finally {
            setSavingResult(false)
          }
        }}
        onBack={() => navigation.navigate('Home')}
        onPlayAgain={() => navigation.navigate('ExerciseConfig', { activityType: challenge?.type, challenge })}
      />
    )
  }

  const showFeedback = selectedOption !== null
  const timedOut = selectedOption === '__timeout__'

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top']}>
    <ScrollView
      ref={scrollRef}
      style={styles.container}
      contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 12) + 24 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Acertar o Output</Text>
        <View style={[styles.timerBadge, timeLeft <= 10 && styles.timerBadgeWarning]}>
          <Ionicons
            name="timer-outline"
            size={14}
            color={timeLeft <= 10 ? '#e74c3c' : colors.primary}
          />
          <Text style={[styles.timer, timeLeft <= 10 && styles.timerWarning]}>
            {timeLeft}s
          </Text>
        </View>
      </View>

      <Text style={[styles.progressText, { color: colors.textSecondary }]}>
        Questão {currentIndex + 1} de {questions.length}
      </Text>

      <View style={[styles.progressBarBackground, { backgroundColor: colors.border }]}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${((currentIndex + 1) / questions.length) * 100}%` },
          ]}
        />
      </View>

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>DESAFIO</Text>
        <Text style={[styles.questionTitle, { color: colors.text }]}>{question.title}</Text>
      </View>

      <View style={styles.codeCard}>
        <Text style={styles.codeText}>{question.code}</Text>
      </View>

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
              <Text style={[
                styles.optionText,
                { color: colors.text },
                showFeedback && isCorrectOption && styles.optionTextCorrect,
                showFeedback && isWrong && styles.optionTextWrong,
              ]}>
                {option}
              </Text>
              {showFeedback && isCorrectOption && (
                <Ionicons name="checkmark-circle" size={20} color="#2ECC71" />
              )}
              {showFeedback && isWrong && (
                <Ionicons name="close-circle" size={20} color="#FF4D4D" />
              )}
            </TouchableOpacity>
          )
        })}
      </View>

      {showFeedback && (
        <View style={isCorrect ? styles.feedbackCorrect : styles.feedbackWrong}>
          <View style={styles.feedbackHeader}>
            <Ionicons
              name={timedOut ? 'timer-outline' : isCorrect ? 'checkmark-circle' : 'close-circle'}
              size={24}
              color={timedOut ? '#e67e22' : isCorrect ? '#27ae60' : '#e74c3c'}
            />
            <Text style={isCorrect ? styles.feedbackCorrectTitle : styles.feedbackWrongTitle}>
              {timedOut ? 'Tempo esgotado!' : isCorrect ? 'Correto!' : 'Quase lá!'}
            </Text>
          </View>

          {!isCorrect && !timedOut && (
            <View style={[styles.correctAnswerBox, { backgroundColor: colors.surface }]}>
              <Text style={[styles.correctAnswerLabel, { color: colors.textSecondary }]}>Resposta correta:</Text>
              <Text style={styles.correctAnswerValue}>{question.correctAnswer}</Text>
            </View>
          )}

          {timedOut && (
            <View style={[styles.correctAnswerBox, { backgroundColor: colors.surface }]}>
              <Text style={[styles.correctAnswerLabel, { color: colors.textSecondary }]}>A resposta era:</Text>
              <Text style={styles.correctAnswerValue}>{question.correctAnswer}</Text>
            </View>
          )}

          <Text style={[styles.explanationLabel, { color: colors.textSecondary }]}>Explicação:</Text>
          <Text style={[styles.feedbackText, { color: colors.textSecondary }]}>{question.explanation}</Text>

          <TouchableOpacity
            style={[styles.nextButton, { backgroundColor: colors.card, borderColor: colors.primary }]}
            onPress={handleNext}
          >
            <Text style={[styles.nextButtonText, { color: colors.primary }]}>
              {currentIndex + 1 >= questions.length ? 'Ver resultado' : 'Próxima questão'}
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
  fallbackXp,
  xpEarned,
  savingResult,
  onSave,
  onBack,
  onPlayAgain,
}: {
  score: number
  total: number
  fallbackXp: number
  xpEarned: number | null
  savingResult: boolean
  onSave: () => void
  onBack: () => void
  onPlayAgain: () => void
}) {
  const { colors } = useTheme()
  const expectedXp = fallbackXp

  useEffect(() => {
    if (xpEarned === null && !savingResult) {
      onSave()
    }
  }, [])

  const message =
    score === total
      ? 'Perfeito! Você acertou tudo!'
      : score >= total / 2
      ? 'Bom trabalho! Continue praticando.'
      : 'Continue tentando, você vai melhorar!'

  return (
    <View style={[styles.resultContainer, { backgroundColor: colors.background }]}>
      <Ionicons name="trophy" size={64} color={colors.primary} style={{ marginBottom: 16 }} />
      <Text style={[styles.resultTitle, { color: colors.text }]}>Parabéns!</Text>
      <Text style={[styles.resultSubtitle, { color: colors.textSecondary }]}>Você concluiu o módulo</Text>

      <View style={[styles.resultScoreCard, { backgroundColor: colors.card }]}>
        <Text style={[styles.resultScoreLabel, { color: colors.textSecondary }]}>Acertos</Text>
        <Text style={[styles.resultScoreValue, { color: colors.primary }]}>{score}/{total}</Text>
      </View>

      {savingResult ? (
        <ActivityIndicator color={colors.primary} style={{ marginVertical: 16 }} />
      ) : (
        <View style={styles.xpCard}>
          <Ionicons name="star" size={24} color="#27ae60" />
          <Text style={styles.xpText}>+{xpEarned ?? expectedXp} XP ganhos</Text>
        </View>
      )}

      <Text style={[styles.resultMessage, { color: colors.textSecondary }]}>{message}</Text>

      <TouchableOpacity style={styles.primaryButton} onPress={onPlayAgain}>
        <Ionicons name="refresh-outline" size={20} color="#FFF" />
        <Text style={styles.primaryButtonText}>Jogar de novo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.primaryButton, { backgroundColor: colors.surface, marginTop: 12 }]} onPress={onBack}>
        <Ionicons name="home-outline" size={20} color={colors.primary} />
        <Text style={[styles.primaryButtonText, { color: colors.primary }]}>Voltar ao início</Text>
      </TouchableOpacity>
    </View>
  )
}
