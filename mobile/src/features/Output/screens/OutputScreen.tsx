import { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { styles } from './output.styles'
import { OutputQuestion } from '../types/output.types'
import { getOutputQuestions } from '../services/output.service'

const TIMER_SECONDS = 30

export function OutputScreen({ navigation, route }: any) {
  const { language, difficulty } = route?.params ?? {}

  const [questions, setQuestions] = useState<OutputQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS)
  const timerRef = useRef<any>(null)

  useEffect(() => {
    loadQuestions()
  }, [])

  async function loadQuestions() {
    try {
      const data = await getOutputQuestions(language?.name ?? '', difficulty ?? '')
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
    if (correct) setScore(prev => prev + 1)
  }

  function handleNext() {
    setSelectedOption(null)
    setIsCorrect(null)
    setCurrentIndex(prev => prev + 1)
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
    const total = questions.length
    const message = score === total
      ? 'Perfeito! Você acertou tudo!'
      : score >= total / 2
      ? 'Bom trabalho! Continue praticando.'
      : 'Continue tentando, você vai melhorar!'

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5', padding: 32 }}>
        <Ionicons name="trophy" size={64} color="#6C5CE7" style={{ marginBottom: 16 }} />
        <Text style={{ fontSize: 24, fontWeight: '700', color: '#111', marginBottom: 8 }}>Resultado</Text>
        <Text style={{ fontSize: 40, fontWeight: '700', color: '#6C5CE7', marginBottom: 8 }}>{score}/{total}</Text>
        <Text style={{ fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 32 }}>{message}</Text>
        <TouchableOpacity
          style={{ backgroundColor: '#6C5CE7', paddingVertical: 14, paddingHorizontal: 32, borderRadius: 12 }}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: '#FFF', fontWeight: '700', fontSize: 16 }}>Voltar</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#6C5CE7" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Acertar o Output</Text>
        <Text style={[styles.timer, timeLeft <= 10 && styles.timerWarning]}>
          {timeLeft}s
        </Text>
      </View>

      <Text style={styles.progressText}>
        Questão {currentIndex + 1} de {questions.length}
      </Text>

      <View style={styles.progressBarBackground}>
        <View style={[
          styles.progressBarFill,
          { width: `${((currentIndex + 1) / questions.length) * 100}%` }
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
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Ionicons
              name={
                selectedOption === '__timeout__'
                  ? 'timer-outline'
                  : isCorrect
                  ? 'checkmark-circle'
                  : 'close-circle'
              }
              size={24}
              color={selectedOption === '__timeout__' ? '#e67e22' : isCorrect ? '#27ae60' : '#e74c3c'}
            />
            <Text style={isCorrect ? styles.feedbackCorrectTitle : styles.feedbackWrongTitle}>
              {selectedOption === '__timeout__'
                ? 'Tempo esgotado!'
                : isCorrect ? 'Correto!' : 'Quase lá!'}
            </Text>
          </View>
          <Text style={styles.feedbackText}>{question.explanation}</Text>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Próxima</Text>
            <Ionicons name="arrow-forward" size={16} color="#1E1E1E" />
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  )
}
