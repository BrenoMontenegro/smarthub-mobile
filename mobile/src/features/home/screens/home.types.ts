export interface Challenge {
  id: string
  title: string
  description: string
  xp: number
  difficulty: '6 atividades' | '10 atividades' | '14 atividades'
  icon: string
  color: string
  type: string
}