export interface Question {
  id: string
  title: string
  code?: string
  options: string[]
  correctAnswer: string
  explanation: string
}