import { SortCodeQuestion } from '../types/sortCode.types'

export const mockSortCodeQuestions: SortCodeQuestion[] = [
  {
    id: 1,
    objective: 'Monte um loop que soma todos os elementos de uma lista e imprime o resultado.',
    correctOrder: [
      'soma = 0',
      'for n in lista:',
      'soma += n',
      'print(soma)',
    ],
    availableLines: [
      'print(soma)',
      'for n in lista:',
      'soma = 0',
      'soma += n',
    ],
  },
  {
    id: 2,
    objective: 'Crie uma função que verifica se um número é par e retorna o resultado.',
    correctOrder: [
      'def eh_par(n):',
      'if n % 2 == 0:',
      'return True',
      'return False',
    ],
    availableLines: [
      'return True',
      'def eh_par(n):',
      'return False',
      'if n % 2 == 0:',
    ],
  },
  {
    id: 3,
    objective: 'Monte um código que lê uma lista e imprime apenas os valores maiores que 10.',
    correctOrder: [
      'lista = [5, 12, 3, 18, 7]',
      'for item in lista:',
      'if item > 10:',
      'print(item)',
    ],
    availableLines: [
      'if item > 10:',
      'lista = [5, 12, 3, 18, 7]',
      'print(item)',
      'for item in lista:',
    ],
  },
]