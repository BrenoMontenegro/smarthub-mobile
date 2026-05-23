import { Question } from '../types/quiz.types'

export const mockQuestions: Question[] = [
  {
    id: 1,
    title: 'Qual será o resultado da execução do código abaixo?',
    code: `def calc(x):
    return x * 2 if x > 3 else x + 1

print(calc(3))`,
    options: ['6', '4', '3', '7'],
    correctAnswer: '4',
    explanation:
      'Como x = 3 não é maior que 3, o operador ternário usa o ramo else.'
  }
]