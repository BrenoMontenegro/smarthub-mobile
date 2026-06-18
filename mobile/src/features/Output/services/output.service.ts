import api from '../../../shared/config/api'
import { OutputQuestion } from '../types/output.types'

const toBackendLanguage = (name: string): string =>
  ({ Python: 'PYTHON', JavaScript: 'JAVASCRIPT', Java: 'JAVA', SQL: 'SQL' } as Record<string, string>)[name] ?? name.toUpperCase()

const toBackendDifficulty = (d: string): string =>
  ({ 'Fácil': 'FACIL', 'Médio': 'MEDIO', 'Difícil': 'DIFICIL' } as Record<string, string>)[d] ?? d.toUpperCase()

export async function getOutputQuestions(languageName: string, difficulty: string): Promise<OutputQuestion[]> {
  const { data } = await api.get('/questions', {
    params: {
      type: 'OUTPUT',
      language: toBackendLanguage(languageName),
      difficulty: toBackendDifficulty(difficulty),
    },
  })
  return data.map((q: any): OutputQuestion => ({
    id: q.id,
    title: q.title,
    code: q.code ?? '',
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
  }))
}
