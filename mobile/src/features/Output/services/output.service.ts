import api from '../../../shared/config/api'
import { OutputQuestion } from '../types/output.types'

const toBackendLanguage = (name: string): string =>
  ({ Python: 'PYTHON', JavaScript: 'JAVASCRIPT', Java: 'JAVA', SQL: 'SQL' } as Record<string, string>)[name] ?? name.toUpperCase()

const toBackendDifficulty = (d: string): string =>
  ({ 'Fácil': 'FACIL', 'Médio': 'MEDIO', 'Difícil': 'DIFICIL' } as Record<string, string>)[d] ?? d.toUpperCase()

const OUTPUT_QUESTION_COUNT = 10

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export async function getOutputQuestions(languageName: string, difficulty: string): Promise<OutputQuestion[]> {
  const { data } = await api.get('/questions', {
    params: {
      type: 'OUTPUT',
      language: toBackendLanguage(languageName),
      difficulty: toBackendDifficulty(difficulty),
    },
  })
  const questions = data.map((q: any): OutputQuestion => ({
    id: q.id,
    title: q.title,
    code: q.code ?? '',
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
  }))
  return shuffleArray(questions).slice(0, OUTPUT_QUESTION_COUNT)
}
