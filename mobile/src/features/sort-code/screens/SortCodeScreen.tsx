import { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { mockSortCodeQuestions } from '../data/mockSortCode'
import { styles } from './sortCode.styles'

export function SortCodeScreen({ navigation }: any) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [orderedLines, setOrderedLines] = useState<string[]>([])
  const [availableLines, setAvailableLines] = useState<string[]>(
    mockSortCodeQuestions[0].availableLines
  )
  const [isChecked, setIsChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)

  const question = mockSortCodeQuestions[currentIndex]

  function handleAddLine(line: string) {
    setOrderedLines(prev => [...prev, line])
    setAvailableLines(prev => prev.filter(l => l !== line))
  }

  function handleRemoveLine(line: string) {
    setAvailableLines(prev => [...prev, line])
    setOrderedLines(prev => prev.filter(l => l !== line))
  }

  function handleCheck() {
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
    if (mockSortCodeQuestions[next]) {
      setAvailableLines(mockSortCodeQuestions[next].availableLines)
    }
  }

  if (!question) {
    const total = mockSortCodeQuestions.length
    const emoji = score === total ? '🎉' : score >= total / 2 ? '👍' : '💪'
    const message = score === total
      ? 'Perfeito! Você acertou tudo!'
      : score >= total / 2
      ? 'Bom trabalho! Continue praticando.'
      : 'Continue tentando, você vai melhorar!'

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5', padding: 32 }}>
        <Text style={{ fontSize: 48, marginBottom: 16 }}>{emoji}</Text>
        <Text style={{ fontSize: 24, fontWeight: '700', color: '#111', marginBottom: 8 }}>
          Resultado
        </Text>
        <Text style={{ fontSize: 40, fontWeight: '700', color: '#6C5CE7', marginBottom: 8 }}>
          {score}/{total}
        </Text>
        <Text style={{ fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 32 }}>
          {message}
        </Text>
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
        <Text style={styles.headerTitle}>Código Embaralhado</Text>
      </View>

      <Text style={styles.progressText}>
        Desafio {currentIndex + 1} de {mockSortCodeQuestions.length}
      </Text>

      <View style={styles.progressBarBackground}>
        <View style={[
          styles.progressBarFill,
          { width: `${((currentIndex + 1) / mockSortCodeQuestions.length) * 100}%` }
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
          <Text style={isCorrect ? styles.feedbackCorrectTitle : styles.feedbackWrongTitle}>
            {isCorrect ? '✅ Correto!' : '❌ Ordem incorreta!'}
          </Text>
          {!isCorrect && (
            <Text style={styles.feedbackText}>
              A ordem correta seria:{'\n'}
              {question.correctOrder.map((line, i) => `${i + 1}. ${line}`).join('\n')}
            </Text>
          )}
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Próximo →</Text>
          </TouchableOpacity>
        </View>
      )}

      {!isChecked && (
        <TouchableOpacity
          style={[styles.checkButton, orderedLines.length !== question.correctOrder.length && styles.checkButtonDisabled]}
          onPress={handleCheck}
          disabled={orderedLines.length !== question.correctOrder.length}
        >
          <Text style={styles.checkButtonText}>Verificar ordem</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  )
}