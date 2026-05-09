import { Challenge } from './home.types'

export const challengesMock: Challenge[] = [
  {
    id: '1',
    title: 'Quiz Interativo',
    description: 'Questões de múltipla escolha por nível',
    xp: 120,
    difficulty: 'Fácil',
    icon: 'help-circle-outline',
    color: '#ECE9F8',
  },

  {
    id: '2',
    title: 'Complete código',
    description: 'Preencha os espaços em branco',
    xp: 180,
    difficulty: 'Médio',
    icon: 'code-slash-outline',
    color: '#E7F4EE',
  },

  {
    id: '3',
    title: 'Acertar output',
    description: 'Leia o código e descubra o resultado',
    xp: 240,
    difficulty: 'Difícil',
    icon: 'terminal-outline',
    color: '#FFF4E5',
  },

  {
    id: '4',
    title: 'Código embaralhado',
    description: 'Organize as linhas corretamente',
    xp: 200,
    difficulty: 'Médio',
    icon: 'swap-vertical-outline',
    color: '#FCE8E8',
  },
]