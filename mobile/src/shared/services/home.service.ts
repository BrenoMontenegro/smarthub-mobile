import { challengesMock } from '../pages/Home/home.mock'

export async function getChallenges() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(challengesMock)
    }, 600)
  })
}