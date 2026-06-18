import React, { useState } from 'react'

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import { styles } from './completeCode.styles'

export function CompleteCodeScreen({
  navigation,
}: any) {
  const [selectedAnswer, setSelectedAnswer] =
    useState<string | null>(null)
  
  const [isCorrect, setIsCorrect] =
    useState<boolean | null>(null)

  const correctAnswer = '0'

  const options = ['===', '=>', '2', '0', '&&']

  function handleCheckAnswer() {
    if (!selectedAnswer) return

    const correct = 
      selectedAnswer === correctAnswer

    setIsCorrect(correct)
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color="#5B3FD8"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Completar Código
        </Text>
      </View>

      <Text style={styles.progressText}>
        Questão 3 de 6
      </Text>

      <View style={styles.progressBarBackground}>
        <View style={styles.progressBarFill} />
      </View>

      <Text style={styles.categoryText}>
        JavaScript - Básico
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          CONTEXTO
        </Text>

        <Text style={styles.contextText}>
          Complete a função que recebe uma lista
          de números e retorna somente os pares.
        </Text>
      </View>

      <View style={styles.codeCard}>
        <Text style={styles.codeText}>
{`function filtrarPares(lista) {
  return lista.filter(n =>
    return n % 2 === __
  )
}`}
        </Text>
      </View>

      <Text style={styles.availableText}>
        Palavras disponíveis:
      </Text>

      <View style={styles.optionsContainer}>
        {options.map(option => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              selectedAnswer === option &&
                styles.optionSelected,
            ]}
            onPress={() =>
              setSelectedAnswer(option)
            }
          >
            <Text style={styles.optionText}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {isCorrect !== null && (
        <View
          style={
            isCorrect
              ? styles.feedbackCorrect
              : styles.feedbackWrong
          }
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Ionicons
              name={isCorrect ? 'checkmark-circle' : 'close-circle'}
              size={24}
              color={isCorrect ? '#27ae60' : '#e74c3c'}
            />
            <Text
              style={
                isCorrect
                  ? styles.feedbackCorrectTitle
                  : styles.feedbackTitle
              }
            >
              {isCorrect
                ? 'Resposta correta!'
                : 'Quase lá!'}
            </Text>
          </View>

          <Text style={styles.feedbackText}>
            {isCorrect
              ? 'Muito bem! A expressão correta é n % 2 === 0.'
              : 'A expressão correta é n % 2 === 0.'}
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.verifyButton}
        onPress={handleCheckAnswer}
      >
        <Text style={styles.verifyButtonText}>
          Verificar Resposta
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}