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

function xpPerQuestion(difficulty: string): number {
  if (difficulty === 'Difícil') return 80
  if (difficulty === 'Médio') return 40
  return 20
}

export function QuizScreen({ navigation, route }: any) {
  const { language, difficulty } = route?.params ?? {}
  const insets = useSafeAreaInsets()

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
    <SafeAreaView style={styles.safeArea} edges={['top']}>
    <ScrollView
      ref={scrollRef}
      style={styles.container}
      contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 12) + 24 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#6C5CE7" />
        </TouchableOpacity>
        <Text style={styles.title}>Quiz de Programação</Text>
        <Text style={styles.progressText}>
          Questão {currentQuestionIndex + 1} de {questions.length}
        </Text>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` },
            ]}
          />
        </View>
      </View>

      <View style={styles.questionCard}>
        <Text style={styles.questionType}>DESAFIO</Text>
        <Text style={styles.questionTitle}>{question.title}</Text>

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
                  showFeedback && isCorrectOption && styles.optionCorrect,
                  showFeedback && isWrong && styles.optionWrong,
                  !showFeedback && isSelected && styles.optionSelected,
                ]}
                onPress={() => handleSelectOption(option)}
                disabled={showFeedback}
              >
                <Text style={styles.optionText}>{option}</Text>
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
            <View style={styles.correctAnswerBox}>
              <Text style={styles.correctAnswerLabel}>Resposta correta:</Text>
              <Text style={styles.correctAnswerText}>{question.correctAnswer}</Text>
            </View>
          )}

          <Text style={styles.feedbackExplanationLabel}>Explicação:</Text>
          <Text style={styles.feedbackText}>{question.explanation}</Text>

          <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
            <Text style={styles.nextButtonText}>
              {currentQuestionIndex + 1 >= questions.length ? 'Ver resultado' : 'Próxima questão'}
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#6C5CE7" />
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
    <View style={styles.resultContainer}>
      <Ionicons name="trophy" size={72} color="#6C5CE7" style={{ marginBottom: 16 }} />
      <Text style={styles.resultTitle}>Parabéns!</Text>
      <Text style={styles.resultSubtitle}>Você concluiu o quiz</Text>

      <View style={styles.resultScoreCard}>
        <Text style={styles.resultScoreLabel}>Acertos</Text>
        <Text style={styles.resultScoreValue}>{score}/{total}</Text>
      </View>

      {saving ? (
        <ActivityIndicator color="#6C5CE7" style={{ marginVertical: 16 }} />
      ) : (
        <View style={styles.xpCard}>
          <Ionicons name="star" size={24} color="#27ae60" />
          <Text style={styles.xpText}>+{xpEarned ?? expectedXp} XP ganhos</Text>
        </View>
      )}

      <Text style={styles.resultMessage}>
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
