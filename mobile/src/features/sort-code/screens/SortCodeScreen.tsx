import { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { styles } from './sortCode.styles'
import { SortCodeQuestion } from '../types/sortCode.types'
import { getSortCodeQuestions } from '../services/sortCode.service'
import { saveQuizResult } from '../../quiz/services/quiz.service'

function xpPerQuestion(difficulty: string): number {
  if (difficulty === 'Difícil') return 80
  if (difficulty === 'Médio') return 40
  return 20
}

export function SortCodeScreen({ navigation, route }: any) {
  const { language, difficulty } = route?.params ?? {}
  const insets = useSafeAreaInsets()

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
    if (correct) setScore(prev => prev + 1)
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6C5CE7" />
      </View>
    )
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 }}>
        <Text style={{ fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 24 }}>{error}</Text>
        <TouchableOpacity
          style={{ backgroundColor: '#6C5CE7', paddingVertical: 14, paddingHorizontal: 32, borderRadius: 12 }}
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
      />
    )
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
    <ScrollView
      ref={scrollRef}
      style={styles.container}
      contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 12) + 24 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#6C5CE7" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Código Embaralhado</Text>
      </View>

      <Text style={styles.progressText}>
        Desafio {currentIndex + 1} de {questions.length}
      </Text>

      <View style={styles.progressBarBackground}>
        <View style={[
          styles.progressBarFill,
          { width: `${((currentIndex + 1) / questions.length) * 100}%` }
        ]} />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>OBJETIVO</Text>
        <Text style={styles.questionTitle}>{question.objective}</Text>
      </View>

      <Text style={styles.label}>Sua ordem:</Text>

      <View style={styles.orderedContainer}>
        {orderedLines.length === 0 && (
          <Text style={styles.placeholder}>Toque nas linhas abaixo para ordenar</Text>
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

      <Text style={styles.label}>Linhas disponíveis:</Text>

      <View style={styles.availableContainer}>
        {availableLines.map((line, index) => (
          <TouchableOpacity
            key={index}
            style={styles.availableLine}
            onPress={() => !isChecked && handleAddLine(line)}
          >
            <Text style={styles.availableLineText}>{line}</Text>
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
            style={[styles.nextButton, { flexDirection: 'row', justifyContent: 'center', gap: 8 }]}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>
              {currentIndex + 1 >= questions.length ? 'Ver resultado' : 'Próximo'}
            </Text>
            <Ionicons name="arrow-forward" size={16} color="#1E1E1E" />
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
}: {
  score: number
  total: number
  fallbackXp: number
  xpEarned: number | null
  savingResult: boolean
  onSave: () => void
  onBack: () => void
}) {
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5', padding: 32 }}>
      <Ionicons name="trophy" size={64} color="#6C5CE7" style={{ marginBottom: 16 }} />
      <Text style={{ fontSize: 24, fontWeight: '700', color: '#111', marginBottom: 4 }}>Parabéns!</Text>
      <Text style={{ fontSize: 16, color: '#666', marginBottom: 24 }}>Você concluiu o desafio</Text>

      <View style={{
        backgroundColor: '#FFF', borderRadius: 16, padding: 20,
        alignItems: 'center', width: '100%', marginBottom: 16, elevation: 2,
      }}>
        <Text style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>Acertos</Text>
        <Text style={{ fontSize: 40, fontWeight: '700', color: '#6C5CE7' }}>{score}/{total}</Text>
      </View>

      {savingResult ? (
        <ActivityIndicator color="#6C5CE7" style={{ marginVertical: 16 }} />
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

      <Text style={{ fontSize: 15, color: '#666', textAlign: 'center', marginBottom: 32, lineHeight: 22 }}>
        {message}
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: '#6C5CE7', paddingVertical: 14, paddingHorizontal: 32,
          borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 8,
        }}
        onPress={onBack}
      >
        <Ionicons name="home-outline" size={20} color="#FFF" />
        <Text style={{ color: '#FFF', fontWeight: '700', fontSize: 16 }}>Voltar ao início</Text>
      </TouchableOpacity>
    </View>
  )
}
