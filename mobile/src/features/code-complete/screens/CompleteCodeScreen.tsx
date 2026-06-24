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
import { styles } from './completeCode.styles'
import { CodeCompleteQuestion } from '../types/codeComplete.types'
import { getCodeCompleteQuestions } from '../services/codeComplete.service'
import { saveQuizResult } from '../../quiz/services/quiz.service'

function xpPerQuestion(difficulty: string): number {
  if (difficulty === 'Difícil') return 80
  if (difficulty === 'Médio') return 40
  return 20
}

export function CompleteCodeScreen({ navigation, route }: any) {
  const { language, difficulty } = route?.params ?? {}
  const insets = useSafeAreaInsets()

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
    if (correct) setScore(prev => prev + 1)
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
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6C5CE7" />
      </View>
    )
  }

  if (error) {
    return (
      <View style={[styles.centered, { padding: 32 }]}>
        <Ionicons name="alert-circle-outline" size={48} color="#666" style={{ marginBottom: 16 }} />
        <Text style={styles.errorText}>{error}</Text>
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
      />
    )
  }

  const codeSegments = question.code.split('__')

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
          <Ionicons name="chevron-back" size={24} color="#5B3FD8" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Completar Código</Text>
      </View>

      <Text style={styles.progressText}>
        Questão {currentIndex + 1} de {questions.length}
      </Text>

      <View style={styles.progressBarBackground}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${((currentIndex + 1) / questions.length) * 100}%` },
          ]}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>CONTEXTO</Text>
        <Text style={styles.contextText}>{question.title}</Text>
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

      <Text style={styles.availableText}>Palavras disponíveis:</Text>

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
            <View style={styles.correctAnswerBox}>
              <Text style={styles.correctAnswerLabel}>Resposta correta:</Text>
              <Text style={styles.correctAnswerValue}>{question.correctAnswer}</Text>
            </View>
          )}

          <Text style={styles.explanationLabel}>Explicação:</Text>
          <Text style={styles.feedbackText}>{question.explanation}</Text>

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentIndex + 1 >= questions.length ? 'Ver resultado' : 'Próxima questão'}
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#5B3FD8" />
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
      ? 'Perfeito! Você completou todos os códigos!'
      : score >= total / 2
      ? 'Bom trabalho! Continue praticando.'
      : 'Continue tentando, você vai melhorar!'

  return (
    <View style={styles.resultContainer}>
      <Ionicons name="trophy" size={64} color="#6C5CE7" style={{ marginBottom: 16 }} />
      <Text style={styles.resultTitle}>Parabéns!</Text>
      <Text style={styles.resultSubtitle}>Você concluiu o módulo</Text>

      <View style={styles.resultScoreCard}>
        <Text style={styles.resultScoreLabel}>Acertos</Text>
        <Text style={styles.resultScoreValue}>{score}/{total}</Text>
      </View>

      {savingResult ? (
        <ActivityIndicator color="#6C5CE7" style={{ marginVertical: 16 }} />
      ) : (
        <View style={styles.xpCard}>
          <Ionicons name="star" size={24} color="#27ae60" />
          <Text style={styles.xpText}>+{xpEarned ?? expectedXp} XP ganhos</Text>
        </View>
      )}

      <Text style={styles.resultMessage}>{message}</Text>

      <TouchableOpacity style={styles.primaryButton} onPress={onBack}>
        <Ionicons name="home-outline" size={20} color="#FFF" />
        <Text style={styles.primaryButtonText}>Voltar ao início</Text>
      </TouchableOpacity>
    </View>
  )
}
