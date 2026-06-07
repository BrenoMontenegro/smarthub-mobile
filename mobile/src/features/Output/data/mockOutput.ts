import { OutputQuestion } from '../types/output.types'

export const mockOutputQuestions: OutputQuestion[] = [
  {
    id: 1,
    title: 'Qual será o output ao executar esse código?',
    code: `int[] arr = {3, 1, 4, 1, 5};
int soma = 0;
for (int i = 0; i < arr.length; i++) {
  if (arr[i] % 2 != 0) {
    soma += arr[i];
  }
}
System.out.println(soma);`,
    options: ['14', '10', '9', '13'],
    correctAnswer: '14',
    explanation: 'O loop soma apenas valores ímpares: 3 + 1 + 1 + 5 = 10. O 4 é descartado por ser par.'
  },
  {
    id: 2,
    title: 'Qual será o output ao executar esse código?',
    code: `x = 10
y = 3
print(x // y)`,
    options: ['3', '3.33', '1', '4'],
    correctAnswer: '3',
    explanation: 'O operador // é divisão inteira em Python, descarta o resto.'
  },
  {
    id: 3,
    title: 'Qual será o output ao executar esse código?',
    code: `public class Main {
  public static void main(String[] args) {
    int x = 5;
    System.out.println(x++ + " " + x);
  }
}`,
    options: ['5 6', '6 6', '5 5', '6 5'],
    correctAnswer: '5 6',
    explanation: 'x++ retorna o valor atual (5) e depois incrementa, então imprime 5 e depois 6.'
  }
]