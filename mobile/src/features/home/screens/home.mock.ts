import { Challenge } from './home.types'

export const challengesMock: Challenge[] = [
  {
    id: '1',
    title: 'Quiz Interativo',
    description: 'Questões de múltipla escolha por nível',
    xp: 120,
    difficulty: '6 atividades',
    icon: 'help-circle-outline',
    color: '#ECE9F8',
    type: 'quiz',
  },

  {
    id: '2',
    title: 'Complete código',
    description: 'Preencha os espaços em branco',
    xp: 180,
    difficulty: '10 atividades',
    icon: 'code-slash-outline',
    color: '#E7F4EE',
    type: 'code-complete',
  },

  {
    id: '3',
    title: 'Acertar output',
    description: 'Leia o código e descubra o resultado',
    xp: 240,
    difficulty: '10 atividades',
    icon: 'terminal-outline',
    color: '#FFF4E5',
    type: 'acertar-output'
  },

  {
    id: '4',
    title: 'Código embaralhado',
    description: 'Organize as linhas corretamente',
    xp: 200,
    difficulty: '14 atividades',
    icon: 'swap-vertical-outline',
    color: '#FCE8E8',
    type: 'codigo-embaralhado'
  },
]