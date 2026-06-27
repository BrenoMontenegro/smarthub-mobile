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
import { styles } from './sortCode.styles'
import { SortCodeQuestion } from '../types/sortCode.types'
import { getSortCodeQuestions } from '../services/sortCode.service'
import { saveQuizResult } from '../../quiz/services/quiz.service'
import { useTheme } from '../../../shared/theme/ThemeContext'

function xpPerQuestion(difficulty: string): number {
  if (difficulty === 'Difícil') return 80
  if (difficulty === 'Médio') return 40
  return 20
}

export function SortCodeScreen({ navigation, route }: any) {
  const { language, difficulty, challenge } = route?.params ?? {}
  const insets = useSafeAreaInsets()
  const { colors } = useTheme()

  const [questions, setQuestions] = useState<SortCodeQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [orderedLines, setOrderedLines] = useState<string[]>([])
  const [availableLines, setAvailableLines] = useState<string[]>([])
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
      const data = await getSortCodeQuestions(language?.name ?? '', difficulty ?? '')
      setQuestions(data)
      if (data.length > 0) {
        setAvailableLines(data[0].availableLines)
      }
    } catch {
      setError('Não foi possível carregar as questões.')
    } finally {
      setLoading(false)
    }
  }

  function handleAddLine(line: string) {
    setOrderedLines(prev => [...prev, line])
    setAvailableLines(prev => prev.filter(l => l !== line))
  }

  function handleRemoveLine(line: string) {
    setAvailableLines(prev => [...prev, line])
    setOrderedLines(prev => prev.filter(l => l !== line))
  }

  function handleCheck() {
    const question = questions[currentIndex]
    const correct = JSON.stringify(orderedLines) === JSON.stringify(question.correctOrder)
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
    const next = currentIndex + 1
    setCurrentIndex(next)
    setIsChecked(false)
    setIsCorrect(false)
    setOrderedLines([])
    if (questions[next]) {
      setAvailableLines(questions[next].availableLines)
    }
    scrollRef.current?.scrollTo({ y: 0, animated: false })
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background, padding: 32 }}>
        <Text style={{ fontSize: 16, color: colors.textSecondary, textAlign: 'center', marginBottom: 24 }}>{error}</Text>
        <TouchableOpacity
          style={{ backgroundColor: colors.primary, paddingVertical: 14, paddingHorizontal: 32, borderRadius: 12 }}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: '#FFF', fontWeight: '700' }}>Voltar</Text>
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
            const { xpEarned: earned } = await saveQuizResult('SORT_CODE', score, questions.length, difficulty ?? '')
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
        <Text style={[styles.headerTitle, { color: colors.text }]}>Código Embaralhado</Text>
      </View>

      <Text style={[styles.progressText, { color: colors.textSecondary }]}>
        Desafio {currentIndex + 1} de {questions.length}
      </Text>

      <View style={[styles.progressBarBackground, { backgroundColor: colors.border }]}>
        <View style={[
          styles.progressBarFill,
          { width: `${((currentIndex + 1) / questions.length) * 100}%` }
        ]} />
      </View>

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>OBJETIVO</Text>
        <Text style={[styles.questionTitle, { color: colors.text }]}>{question.objective}</Text>
      </View>

      <Text style={[styles.label, { color: colors.textSecondary }]}>Sua ordem:</Text>

      <View style={[styles.orderedContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {orderedLines.length === 0 && (
          <Text style={[styles.placeholder, { color: colors.textSecondary }]}>Toque nas linhas abaixo para ordenar</Text>
        )}
        {orderedLines.map((line, index) => (
          <TouchableOpacity
            key={index}
            style={styles.orderedLine}
            onPress={() => !isChecked && handleRemoveLine(line)}
          >
            <View style={styles.lineNumber}>
              <Text style={styles.lineNumberText}>{index + 1}</Text>
            </View>
            <Text style={styles.lineText}>{line}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.label, { color: colors.textSecondary }]}>Linhas disponíveis:</Text>

      <View style={styles.availableContainer}>
        {availableLines.map((line, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.availableLine, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => !isChecked && handleAddLine(line)}
          >
            <Text style={[styles.availableLineText, { color: colors.text }]}>{line}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {isChecked && (
        <View style={isCorrect ? styles.feedbackCorrect : styles.feedbackWrong}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Ionicons
              name={isCorrect ? 'checkmark-circle' : 'close-circle'}
              size={24}
              color={isCorrect ? '#27ae60' : '#e74c3c'}
            />
            <Text style={isCorrect ? styles.feedbackCorrectTitle : styles.feedbackWrongTitle}>
              {isCorrect ? 'Correto!' : 'Ordem incorreta!'}
            </Text>
          </View>

          {!isCorrect && (
            <View style={{ marginBottom: 12 }}>
              <Text style={[styles.feedbackText, { fontWeight: '700', marginBottom: 4 }]}>
                Ordem correta:
              </Text>
              <Text style={styles.feedbackText}>
                {question.correctOrder.map((line, i) => `${i + 1}. ${line}`).join('\n')}
              </Text>
            </View>
          )}

          {question.explanation ? (
            <View style={{ marginBottom: 12 }}>
              <Text style={[styles.feedbackText, { fontWeight: '700', marginBottom: 4 }]}>
                Explicação:
              </Text>
              <Text style={styles.feedbackText}>{question.explanation}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={[styles.nextButton, { flexDirection: 'row', justifyContent: 'center', gap: 8, backgroundColor: colors.card }]}
            onPress={handleNext}
          >
            <Text style={[styles.nextButtonText, { color: colors.text }]}>
              {currentIndex + 1 >= questions.length ? 'Ver resultado' : 'Próximo'}
            </Text>
            <Ionicons name="arrow-forward" size={16} color={colors.text} />
          </TouchableOpacity>
        </View>
      )}

      {!isChecked && (
        <TouchableOpacity
          style={[
            styles.checkButton,
            orderedLines.length !== question.correctOrder.length && styles.checkButtonDisabled
          ]}
          onPress={handleCheck}
          disabled={orderedLines.length !== question.correctOrder.length}
        >
          <Text style={styles.checkButtonText}>Verificar ordem</Text>
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
      ? 'Perfeito! Você acertou tudo!'
      : score >= total / 2
      ? 'Bom trabalho! Continue praticando.'
      : 'Continue tentando, você vai melhorar!'

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background, padding: 32 }}>
      <Ionicons name="trophy" size={64} color={colors.primary} style={{ marginBottom: 16 }} />
      <Text style={{ fontSize: 24, fontWeight: '700', color: colors.text, marginBottom: 4 }}>Parabéns!</Text>
      <Text style={{ fontSize: 16, color: colors.textSecondary, marginBottom: 24 }}>Você concluiu o desafio</Text>

      <View style={{
        backgroundColor: colors.card, borderRadius: 16, padding: 20,
        alignItems: 'center', width: '100%', marginBottom: 16,
      }}>
        <Text style={{ fontSize: 14, color: colors.textSecondary, marginBottom: 4 }}>Acertos</Text>
        <Text style={{ fontSize: 40, fontWeight: '700', color: colors.primary }}>{score}/{total}</Text>
      </View>

      {savingResult ? (
        <ActivityIndicator color={colors.primary} style={{ marginVertical: 16 }} />
      ) : (
        <View style={{
          flexDirection: 'row', alignItems: 'center', gap: 8,
          backgroundColor: '#EFFFF0', paddingHorizontal: 20, paddingVertical: 12,
          borderRadius: 12, marginBottom: 16,
        }}>
          <Ionicons name="star" size={24} color="#27ae60" />
          <Text style={{ fontSize: 20, fontWeight: '700', color: '#27ae60' }}>
            +{xpEarned ?? expectedXp} XP ganhos
          </Text>
        </View>
      )}

      <Text style={{ fontSize: 15, color: colors.textSecondary, textAlign: 'center', marginBottom: 32, lineHeight: 22 }}>
        {message}
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: colors.primary, paddingVertical: 14, paddingHorizontal: 32,
          borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 8,
        }}
        onPress={onPlayAgain}
      >
        <Ionicons name="refresh-outline" size={20} color="#FFF" />
        <Text style={{ color: '#FFF', fontWeight: '700', fontSize: 16 }}>Jogar de novo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: colors.surface, paddingVertical: 14, paddingHorizontal: 32,
          borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12,
        }}
        onPress={onBack}
      >
        <Ionicons name="home-outline" size={20} color={colors.primary} />
        <Text style={{ color: colors.primary, fontWeight: '700', fontSize: 16 }}>Voltar ao início</Text>
      </TouchableOpacity>
    </View>
  )
}
