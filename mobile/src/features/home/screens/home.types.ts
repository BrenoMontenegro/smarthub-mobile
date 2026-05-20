export interface Challenge {
  id: string
  title: string
  description: string
  xp: number
  difficulty: 'Fácil' | 'Médio' | 'Difícil'
  icon: string
  color: string
}