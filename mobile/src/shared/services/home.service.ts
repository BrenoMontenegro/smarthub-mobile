import { challengesMock } from '../../features/home/screens/home.mock'

export async function getChallenges() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(challengesMock)
    }, 600)
  })
}