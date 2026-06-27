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
import { styles } from './completeCode.styles'
import { CodeCompleteQuestion } from '../types/codeComplete.types'
import { getCodeCompleteQuestions } from '../services/codeComplete.service'
import { saveQuizResult } from '../../quiz/services/quiz.service'
import { useTheme } from '../../../shared/theme/ThemeContext'

function xpPerQuestion(difficulty: string): number {
  if (difficulty === 'Difícil') return 80
  if (difficulty === 'Médio') return 40
  return 20
}

export function CompleteCodeScreen({ navigation, route }: any) {
  const { language, difficulty, challenge } = route?.params ?? {}
  const insets = useSafeAreaInsets()
  const { colors } = useTheme()

  const [questions, setQuestions] = useState<CodeCompleteQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isChecked, setIsChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [xpEarned, setXpEarned] = useState<number | null>(null)
  const [savingResult, setSavingResult] = useState(false)
  const scrollRef = useRef<ScrollView>(null)

  useEffect(() => {
    loadQuestions()
  }, [])

  useEffect(() => {
    if (isChecked) {
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100)
    }
  }, [isChecked])

  async function loadQuestions() {
    try {
      const data = await getCodeCompleteQuestions(language?.name ?? '', difficulty ?? '')
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

  function handleCheck() {
    if (!selectedOption) return
    const question = questions[currentIndex]
    const correct = selectedOption === question.correctAnswer
    setIsCorrect(correct)
    setIsChecked(true)
    if (correct) {
      setScore(prev => prev + 1)
      playCorrectSound()
    } else {
      playWrongSound()
    }
  }

  function handleNext() {
    setSelectedOption(null)
    setIsChecked(false)
    setIsCorrect(false)
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

  if (!question) {
    return (
      <ResultScreen
        score={score}
        total={questions.length}
        fallbackXp={score * xpPerQuestion(difficulty ?? '')}
        xpEarned={xpEarned}
        savingResult={savingResult}
        onSave={async () => {
          setSavingResult(true)
          try {
            const { xpEarned: earned } = await saveQuizResult('CODE_COMPLETE', score, questions.length, difficulty ?? '')
            setXpEarned(earned)
          } catch {
            setXpEarned(score * xpPerQuestion(difficulty ?? ''))
          } finally {
            setSavingResult(false)
          }
        }}
        onBack={() => navigation.navigate('Home')}
        onPlayAgain={() => navigation.navigate('ExerciseConfig', { activityType: challenge?.type, challenge })}
      />
    )
  }

  const codeSegments = question.code.split('__')

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
        <Text style={[styles.headerTitle, { color: colors.text }]}>Completar Código</Text>
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
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>CONTEXTO</Text>
        <Text style={[styles.contextText, { color: colors.text }]}>{question.title}</Text>
      </View>

      <View style={styles.codeCard}>
        <Text style={styles.codeText}>
          {codeSegments.map((segment, i) => (
            <Text key={i}>
              {segment}
              {i < codeSegments.length - 1 && (
                <Text
                  style={[
                    styles.blankText,
                    isChecked
                      ? isCorrect
                        ? styles.blankCorrect
                        : styles.blankWrong
                      : selectedOption
                      ? styles.blankFilled
                      : styles.blankEmpty,
                  ]}
                >
                  {selectedOption ?? '___'}
                </Text>
              )}
            </Text>
          ))}
        </Text>
      </View>

      <Text style={[styles.availableText, { color: colors.textSecondary }]}>Palavras disponíveis:</Text>

      <View style={styles.optionsContainer}>
        {question.options.map(option => {
          const isSelected = selectedOption === option
          const showCorrect = isChecked && option === question.correctAnswer
          const showWrong = isChecked && isSelected && !isCorrect

          return (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                { backgroundColor: colors.surface, borderColor: colors.border },
                !isChecked && isSelected && styles.optionSelected,
                isChecked && showCorrect && styles.optionCorrect,
                isChecked && showWrong && styles.optionWrong,
              ]}
              onPress={() => {
                if (isChecked) return
                setSelectedOption(prev => (prev === option ? null : option))
              }}
              disabled={isChecked}
            >
              <Text
                style={[
                  styles.optionText,
                  { color: colors.text },
                  (isChecked && showCorrect) || (!isChecked && isSelected)
                    ? styles.optionTextSelected
                    : undefined,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>

      {isChecked && (
        <View style={isCorrect ? styles.feedbackCorrect : styles.feedbackWrong}>
          <View style={styles.feedbackHeader}>
            <Ionicons
              name={isCorrect ? 'checkmark-circle' : 'close-circle'}
              size={24}
              color={isCorrect ? '#27ae60' : '#e74c3c'}
            />
            <Text style={isCorrect ? styles.feedbackCorrectTitle : styles.feedbackTitle}>
              {isCorrect ? 'Correto!' : 'Quase lá!'}
            </Text>
          </View>

          {!isCorrect && (
            <View style={[styles.correctAnswerBox, { backgroundColor: colors.surface }]}>
              <Text style={[styles.correctAnswerLabel, { color: colors.textSecondary }]}>Resposta correta:</Text>
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

      {!isChecked && (
        <TouchableOpacity
          style={[styles.verifyButton, !selectedOption && styles.verifyButtonDisabled]}
          onPress={handleCheck}
          disabled={!selectedOption}
        >
          <Text style={styles.verifyButtonText}>Verificar Resposta</Text>
        </TouchableOpacity>
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
      ? 'Perfeito! Você completou todos os códigos!'
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
