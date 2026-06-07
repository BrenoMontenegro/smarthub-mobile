import { mockSortCodeQuestions } from '../data/mockSortCode'

export async function getSortCodeQuestions() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSortCodeQuestions)
    }, 600)
  })
}