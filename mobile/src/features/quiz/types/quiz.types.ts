export interface Question {
  id: number
  title: string
  code?: string
  options: string[]
  correctAnswer: string
  explanation: string
}