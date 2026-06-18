import api from '../config/api'
import { Challenge } from '../../features/home/screens/home.types'

export async function getChallenges(): Promise<Challenge[]> {
  const { data } = await api.get('/challenges')
  return data
}
