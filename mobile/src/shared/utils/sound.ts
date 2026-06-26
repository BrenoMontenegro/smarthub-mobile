import { createAudioPlayer } from 'expo-audio'

const correctSource = require('../../../assets/sounds/correct.wav')
const wrongSource = require('../../../assets/sounds/wrong.wav')

export function playCorrectSound() {
  try {
    const player = createAudioPlayer(correctSource)
    player.play()
  } catch (err) {
    console.warn('Erro ao tocar som de acerto:', err)
  }
}

export function playWrongSound() {
  try {
    const player = createAudioPlayer(wrongSource)
    player.play()
  } catch (err) {
    console.warn('Erro ao tocar som de erro:', err)
  }
}