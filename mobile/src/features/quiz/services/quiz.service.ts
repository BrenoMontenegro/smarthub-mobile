import api from '../../../shared/config/api'
import { Question } from '../types/quiz.types'

const toBackendLanguage = (name: string): string =>
  ({ Python: 'PYTHON', JavaScript: 'JAVASCRIPT', Java: 'JAVA', SQL: 'SQL' } as Record<string, string>)[name] ?? name.toUpperCase()

const toBackendDifficulty = (d: string): string =>
  ({ 'Fácil': 'FACIL', 'Médio': 'MEDIO', 'Difícil': 'DIFICIL' } as Record<string, string>)[d] ?? d.toUpperCase()

const QUIZ_QUESTION_COUNT = 6

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export async function saveQuizResult(
  challengeType: string,
  score: number,
  totalQuestions: number,
): Promise<{ xpEarned: number }> {
  const { data } = await api.post('/quiz/results', { challengeType, score, totalQuestions })
  return { xpEarned: data.xpEarned ?? 0 }
}

export async function getQuizQuestions(languageName: string, difficulty: string): Promise<Question[]> {
  const { data } = await api.get('/questions', {
    params: {
      type: 'QUIZ',
      language: toBackendLanguage(languageName),
      difficulty: toBackendDifficulty(difficulty),
    },
  })
  const questions: Question[] = (data as any[]).map((q): Question => ({
    id: q.id,
    title: q.title,
    code: q.code,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
  }))
  return shuffleArray(questions).slice(0, QUIZ_QUESTION_COUNT)
}
