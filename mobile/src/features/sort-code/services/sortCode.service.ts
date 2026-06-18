import api from '../../../shared/config/api'
import { SortCodeQuestion } from '../types/sortCode.types'

const toBackendLanguage = (name: string): string =>
  ({ Python: 'PYTHON', JavaScript: 'JAVASCRIPT', Java: 'JAVA', SQL: 'SQL' } as Record<string, string>)[name] ?? name.toUpperCase()

const toBackendDifficulty = (d: string): string =>
  ({ 'Fácil': 'FACIL', 'Médio': 'MEDIO', 'Difícil': 'DIFICIL' } as Record<string, string>)[d] ?? d.toUpperCase()

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

export async function getSortCodeQuestions(languageName: string, difficulty: string): Promise<SortCodeQuestion[]> {
  const { data } = await api.get('/questions', {
    params: {
      type: 'SORT_CODE',
      language: toBackendLanguage(languageName),
      difficulty: toBackendDifficulty(difficulty),
    },
  })
  return data.map((q: any): SortCodeQuestion => {
    const correctOrder = [...q.sortCodeLines]
      .sort((a: any, b: any) => a.lineOrder - b.lineOrder)
      .map((l: any) => l.lineText)
    return {
      id: q.id,
      objective: q.objective,
      correctOrder,
      availableLines: shuffle(correctOrder),
    }
  })
}
