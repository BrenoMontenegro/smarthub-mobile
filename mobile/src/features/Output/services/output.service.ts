import { mockOutputQuestions } from '../data/mockOutput'

export async function getOutputQuestions() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockOutputQuestions)
    }, 600)
  })
}