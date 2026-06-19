package com.smarthub.backend.shared.seed;

import com.smarthub.backend.modules.challenge.ChallengeRepository;
import com.smarthub.backend.modules.challenge.model.Challenge;
import com.smarthub.backend.modules.quiz.QuestionRepository;
import com.smarthub.backend.modules.quiz.model.*;
import com.smarthub.backend.modules.user.UserRepository;
import com.smarthub.backend.modules.user.model.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final ChallengeRepository challengeRepository;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;

    @Override
    public void run(String... args) {
        seedUsers();
        seedChallenges();
        seedQuestions();
    }

    private void seedUsers() {
        if (userRepository.existsByEmail("test@smarthub.com")) {
            log.info("Usuário de teste já existe, pulando seed.");
            return;
        }

        userRepository.save(User.builder()
            .username("testuser")
            .email("test@smarthub.com")
            .passwordHash("$2a$10$/oDDlA9KVOztNfrEUpsXVOMKiV1bQLL0hrgIET8qBjcT4P1/1kpIW")
            .totalXp(0)
            .level(1)
            .streakDays(0)
            .build());

        log.info("Seeded usuário de teste (test@smarthub.com / 123456).");
    }

    private void seedChallenges() {
        if (challengeRepository.count() > 0) {
            log.info("Challenges já populados, pulando seed.");
            return;
        }

        challengeRepository.saveAll(List.of(
            Challenge.builder()
                .title("Quiz Interativo")
                .description("Responda perguntas de múltipla escolha sobre programação")
                .xp(120).difficulty("6 atividades")
                .icon("help-circle-outline").color("#ECE9F8")
                .type("quiz").displayOrder(1).build(),

            Challenge.builder()
                .title("Complete o Código")
                .description("Preencha as lacunas e complete o código")
                .xp(180).difficulty("10 atividades")
                .icon("code-slash-outline").color("#E7F4EE")
                .type("code-complete").displayOrder(2).build(),

            Challenge.builder()
                .title("Acertar o Output")
                .description("Leia o código e descubra qual será a saída")
                .xp(240).difficulty("10 atividades")
                .icon("terminal-outline").color("#FFF4E5")
                .type("acertar-output").displayOrder(3).build(),

            Challenge.builder()
                .title("Código Embaralhado")
                .description("Organize as linhas de código na ordem correta")
                .xp(200).difficulty("14 atividades")
                .icon("swap-vertical-outline").color("#FCE8E8")
                .type("codigo-embaralhado").displayOrder(4).build()
        ));

        log.info("Seeded 4 challenges.");
    }

    private void seedQuestions() {
        if (questionRepository.count() == 0) {
            seedQuizQuestions();
            seedOutputQuestions();
            seedCodeCompleteQuestions();
            log.info("Seed inicial de questions concluído.");
        }
        seedSortCodeQuestions();
    }

    private void seedQuizQuestions() {
        saveQuiz("O que o seguinte código Python retorna?",
            "x = 5\nresult = 'maior' if x > 3 else 'menor'\nprint(result)",
            "maior",
            "Como x = 5 é maior que 3, a expressão ternária retorna 'maior'.",
            Language.PYTHON, Difficulty.FACIL,
            List.of("maior", "menor", "5", "None"));

        saveQuiz("Qual é o resultado de len([1, 2, 3]) em Python?",
            null,
            "3",
            "A função len() retorna o número de elementos da lista. A lista [1, 2, 3] tem 3 elementos.",
            Language.PYTHON, Difficulty.FACIL,
            List.of("1", "2", "3", "4"));

        saveQuiz("Qual é o resultado de 2 ** 3 em Python?",
            null,
            "8",
            "O operador ** em Python é o operador de exponenciação. 2 ** 3 = 2³ = 8.",
            Language.PYTHON, Difficulty.FACIL,
            List.of("6", "8", "9", "16"));

        saveQuiz("O que será impresso ao executar esse código Python?",
            "s = \"hello\"\nprint(s.upper())",
            "HELLO",
            "O método upper() converte todos os caracteres da string para maiúsculas.",
            Language.PYTHON, Difficulty.FACIL,
            List.of("HELLO", "hello", "Hello", "Error"));

        saveQuiz("Qual será o output desse código Python?",
            "numbers = [1, 2, 3, 4, 5]\nevens = [x for x in numbers if x % 2 == 0]\nprint(evens)",
            "[2, 4]",
            "A list comprehension filtra apenas os números onde x % 2 == 0 (pares), resultando em [2, 4].",
            Language.PYTHON, Difficulty.MEDIO,
            List.of("[2, 4]", "[1, 3, 5]", "[1, 2, 3, 4, 5]", "[]"));

        saveQuiz("O que o método get() retorna quando a chave não existe?",
            "d = {\"a\": 1, \"b\": 2}\nprint(d.get(\"c\", 0))",
            "0",
            "O método get(chave, valor_padrão) retorna o valor padrão quando a chave não é encontrada. Neste caso retorna 0.",
            Language.PYTHON, Difficulty.MEDIO,
            List.of("None", "0", "KeyError", "\"c\""));

        saveQuiz("O que será impresso por esse código Python?",
            "s = \"Python\"\nprint(s[::-1])",
            "nohtyP",
            "A sintaxe s[::-1] inverte a string usando slice com passo -1. 'Python' invertido é 'nohtyP'.",
            Language.PYTHON, Difficulty.MEDIO,
            List.of("Python", "nohtyP", "nPython", "Error"));

        saveQuiz("Qual será o output desse código Python?",
            "nums = [1, 2, 3]\nsquared = list(map(lambda x: x**2, nums))\nprint(squared)",
            "[1, 4, 9]",
            "map() aplica a função lambda a cada elemento. lambda x: x**2 eleva ao quadrado: 1²=1, 2²=4, 3²=9.",
            Language.PYTHON, Difficulty.DIFICIL,
            List.of("[1, 4, 9]", "[2, 4, 6]", "[1, 2, 3]", "[3, 6, 9]"));

        saveQuiz("Qual será o output desse código Java?",
            "int a = 10;\nint b = 3;\nSystem.out.println(a / b);",
            "3",
            "Em Java, a divisão entre dois inteiros é divisão inteira, descartando o resto. 10 / 3 = 3.",
            Language.JAVA, Difficulty.FACIL,
            List.of("3.33", "3", "4", "2"));

        saveQuiz("Qual será o output desse código Java?",
            "System.out.println(\"Olá\" + \" \" + \"Mundo\");",
            "Olá Mundo",
            "O operador + concatena Strings em Java. O resultado é a junção das três strings.",
            Language.JAVA, Difficulty.FACIL,
            List.of("OláMundo", "Olá Mundo", "olá mundo", "Error"));

        saveQuiz("Qual será o output desse código Java?",
            "int x = 5;\nSystem.out.println(x > 3 ? \"maior\" : \"menor\");",
            "maior",
            "O operador ternário avalia x > 3 (true, pois 5 > 3) e retorna \"maior\".",
            Language.JAVA, Difficulty.FACIL,
            List.of("maior", "menor", "5", "true"));

        saveQuiz("Qual será o output desse código Java?",
            "String s = \"Java\";\nSystem.out.println(s.length());",
            "4",
            "O método length() retorna o número de caracteres da String. \"Java\" tem 4 caracteres: J, a, v, a.",
            Language.JAVA, Difficulty.MEDIO,
            List.of("4", "5", "3", "Error"));

        saveQuiz("Qual será o output desse código Java?",
            "String a = \"hello\";\nString b = \"hello\";\nSystem.out.println(a.equals(b));",
            "true",
            "O método equals() compara o conteúdo das Strings. Como ambas têm o mesmo conteúdo (\"hello\"), retorna true.",
            Language.JAVA, Difficulty.MEDIO,
            List.of("true", "false", "null", "Error"));

        saveQuiz("Qual será o output desse código Java?",
            "int[] arr = {1, 2, 3, 4, 5};\nSystem.out.println(arr.length);",
            "5",
            "A propriedade length de um array em Java retorna o número de elementos. O array tem 5 elementos.",
            Language.JAVA, Difficulty.MEDIO,
            List.of("4", "5", "6", "Error"));

        saveQuiz("Qual será o output desse código Java?",
            "Integer a = 127;\nInteger b = 127;\nSystem.out.println(a == b);",
            "true",
            "Java faz cache de objetos Integer entre -128 e 127 (Integer Cache). Por isso a == b compara a mesma referência e retorna true.",
            Language.JAVA, Difficulty.DIFICIL,
            List.of("true", "false", "null", "Error"));

        saveQuiz("Qual será o output desse código JavaScript?",
            "console.log(typeof \"hello\");",
            "string",
            "O operador typeof retorna o tipo como string em minúsculo. Para strings literais, retorna \"string\".",
            Language.JAVASCRIPT, Difficulty.FACIL,
            List.of("string", "text", "char", "String"));

        saveQuiz("Qual será o output desse código JavaScript?",
            "console.log(1 + \"2\");",
            "12",
            "Em JavaScript, quando um número é somado a uma string, ocorre coerção: o número é convertido para string e concatenado.",
            Language.JAVASCRIPT, Difficulty.FACIL,
            List.of("3", "12", "NaN", "Error"));

        saveQuiz("Qual será o output desse código JavaScript?",
            "console.log(Boolean(0));",
            "false",
            "O valor 0 é um valor falsy em JavaScript. Boolean(0) converte explicitamente para false.",
            Language.JAVASCRIPT, Difficulty.FACIL,
            List.of("true", "false", "0", "null"));

        saveQuiz("Qual será o output desse código JavaScript?",
            "const arr = [1, 2, 3];\nconsole.log(arr.length);",
            "3",
            "A propriedade length de um array retorna o número de elementos. O array [1, 2, 3] tem 3 elementos.",
            Language.JAVASCRIPT, Difficulty.MEDIO,
            List.of("2", "3", "4", "undefined"));

        saveQuiz("Qual será o output desse código JavaScript?",
            "let x = 5;\nlet y = x++;\nconsole.log(y);",
            "5",
            "O operador pós-incremento (x++) retorna o valor ANTES de incrementar. Então y recebe 5, e só depois x é incrementado para 6.",
            Language.JAVASCRIPT, Difficulty.MEDIO,
            List.of("4", "5", "6", "undefined"));

        saveQuiz("Qual é o tipo retornado por typeof null em JavaScript?",
            "console.log(typeof null);",
            "object",
            "typeof null retorna \"object\" em JavaScript. Isso é um bug histórico da linguagem mantido por compatibilidade com código legado.",
            Language.JAVASCRIPT, Difficulty.DIFICIL,
            List.of("null", "object", "undefined", "boolean"));

        saveQuiz("Qual cláusula SQL é usada para filtrar registros de uma tabela?",
            null,
            "WHERE",
            "A cláusula WHERE filtra registros com base em uma condição. Ex: SELECT * FROM users WHERE age > 18.",
            Language.SQL, Difficulty.FACIL,
            List.of("SELECT", "WHERE", "FROM", "JOIN"));

        saveQuiz("Qual função SQL é usada para contar o total de linhas?",
            null,
            "COUNT(*)",
            "A função de agregação COUNT(*) conta o número total de linhas em um resultado de consulta.",
            Language.SQL, Difficulty.FACIL,
            List.of("SUM()", "COUNT(*)", "TOTAL()", "AVG()"));

        saveQuiz("O que a cláusula DISTINCT faz em uma query SQL?",
            "SELECT DISTINCT cidade FROM clientes;",
            "Remove valores duplicados",
            "DISTINCT elimina linhas duplicadas do resultado, retornando apenas valores únicos para a coluna especificada.",
            Language.SQL, Difficulty.MEDIO,
            List.of("Ordena os resultados", "Remove valores duplicados", "Filtra valores nulos", "Agrupa os resultados"));

        log.info("Seeded 24 questões de QUIZ.");
    }

    private void seedOutputQuestions() {
        OutputQuestion o1 = new OutputQuestion();
        o1.setTitle("Qual será o output ao executar esse código Java?");
        o1.setCode("int[] arr = {3, 1, 4, 1, 5};\nint soma = 0;\nfor (int i = 0; i < arr.length; i++) {\n  if (arr[i] % 2 != 0) {\n    soma += arr[i];\n  }\n}\nSystem.out.println(soma);");
        o1.setCorrectAnswer("10");
        o1.setExplanation("O loop soma apenas valores ímpares: 3 + 1 + 1 + 5 = 10. O 4 é descartado por ser par.");
        o1.setLanguage(Language.JAVA);
        o1.setDifficulty(Difficulty.MEDIO);
        addOptions(o1, List.of("14", "10", "9", "13"));
        questionRepository.save(o1);

        OutputQuestion o2 = new OutputQuestion();
        o2.setTitle("Qual será o output ao executar esse código Python?");
        o2.setCode("x = 10\ny = 3\nprint(x // y)");
        o2.setCorrectAnswer("3");
        o2.setExplanation("O operador // é divisão inteira em Python, descartando o resto fracionário.");
        o2.setLanguage(Language.PYTHON);
        o2.setDifficulty(Difficulty.FACIL);
        addOptions(o2, List.of("3", "3.33", "1", "4"));
        questionRepository.save(o2);

        OutputQuestion o3 = new OutputQuestion();
        o3.setTitle("Qual será o output ao executar esse código Java?");
        o3.setCode("public class Main {\n  public static void main(String[] args) {\n    int x = 5;\n    System.out.println(x++ + \" \" + x);\n  }\n}");
        o3.setCorrectAnswer("5 6");
        o3.setExplanation("x++ retorna o valor atual (5) antes de incrementar. Após o incremento, x vale 6.");
        o3.setLanguage(Language.JAVA);
        o3.setDifficulty(Difficulty.MEDIO);
        addOptions(o3, List.of("5 6", "6 6", "5 5", "6 5"));
        questionRepository.save(o3);

        log.info("Seeded 3 questões de OUTPUT.");
    }

    private void seedSortCodeQuestions() {
        long count = questionRepository.countByQuestionType("SORT_CODE");
        if (count >= 60) {
            log.info("Sort code questions já populadas (60), pulando seed.");
            return;
        }
        if (count > 0) {
            questionRepository.deleteAll(questionRepository.findByFilters("SORT_CODE", null, null));
            log.info("Questões SORT_CODE antigas removidas para re-seed.");
        }

        // ── PYTHON FÁCIL ─────────────────────────────────────────
        saveSortCode("Monte um loop que soma todos os elementos de uma lista e imprime o resultado.",
            "Inicializamos soma=0, percorremos cada elemento acumulando-o e por fim imprimimos.",
            Language.PYTHON, Difficulty.FACIL,
            List.of("soma = 0", "for n in lista:", "    soma += n", "print(soma)"));

        saveSortCode("Crie uma função que verifica se um número é par e retorna True ou False.",
            "A definição da função vem primeiro, depois o if com n % 2 == 0 e seus retornos na ordem correta.",
            Language.PYTHON, Difficulty.FACIL,
            List.of("def eh_par(n):", "    if n % 2 == 0:", "        return True", "    return False"));

        saveSortCode("Escreva um código Python que imprime os números de 1 a 5 usando range.",
            "range(1, 6) gera de 1 até 5 inclusive. O for itera sobre eles e print exibe cada valor.",
            Language.PYTHON, Difficulty.FACIL,
            List.of("for i in range(1, 6):", "    print(i)"));

        saveSortCode("Monte um código que converte uma lista de nomes para maiúsculas com list comprehension.",
            "Definimos a lista, aplicamos list comprehension com .upper() em cada elemento e imprimimos.",
            Language.PYTHON, Difficulty.FACIL,
            List.of("nomes = [\"ana\", \"bruno\", \"carlos\"]", "maiusculos = [n.upper() for n in nomes]", "print(maiusculos)"));

        saveSortCode("Calcule a área de um retângulo com largura 8 e altura 5 em Python.",
            "Declaramos as variáveis, multiplicamos largura por altura para obter a área e imprimimos.",
            Language.PYTHON, Difficulty.FACIL,
            List.of("largura = 8", "altura = 5", "area = largura * altura", "print(area)"));

        // ── PYTHON MÉDIO ─────────────────────────────────────────
        saveSortCode("Monte um código que lê uma lista e imprime apenas os valores maiores que 10.",
            "Definimos a lista, iteramos com for, filtramos com if e imprimimos somente os valores que passam na condição.",
            Language.PYTHON, Difficulty.MEDIO,
            List.of("lista = [5, 12, 3, 18, 7]", "for item in lista:", "    if item > 10:", "        print(item)"));

        saveSortCode("Calcule a média de uma lista de números e imprima o resultado.",
            "Definimos a lista, somamos todos com sum() e dividimos pelo tamanho com len() para obter a média.",
            Language.PYTHON, Difficulty.MEDIO,
            List.of("numeros = [10, 20, 30, 40, 50]", "soma = sum(numeros)", "media = soma / len(numeros)", "print(media)"));

        saveSortCode("Conte quantas vogais existem na string 'programacao'.",
            "Inicializamos count=0 e percorremos cada letra verificando se pertence à string de vogais com o operador in.",
            Language.PYTHON, Difficulty.MEDIO,
            List.of("palavra = \"programacao\"", "vogais = \"aeiou\"", "count = 0", "for letra in palavra:", "    if letra in vogais:", "        count += 1", "print(count)"));

        saveSortCode("Encontre o maior elemento de uma lista sem usar a função max().",
            "Iniciamos maior com o primeiro elemento e atualizamos sempre que encontramos um valor superior no loop.",
            Language.PYTHON, Difficulty.MEDIO,
            List.of("numeros = [3, 7, 1, 9, 4]", "maior = numeros[0]", "for n in numeros:", "    if n > maior:", "        maior = n", "print(maior)"));

        saveSortCode("Crie uma função que verifica se uma string é um palíndromo.",
            "Comparamos a string com sua versão invertida via slice [::-1]. Se forem iguais, é palíndromo.",
            Language.PYTHON, Difficulty.MEDIO,
            List.of("def eh_palindromo(s):", "    return s == s[::-1]", "print(eh_palindromo(\"arara\"))"));

        // ── PYTHON DIFÍCIL ───────────────────────────────────────
        saveSortCode("Crie uma list comprehension que eleva ao quadrado apenas os números pares de uma lista.",
            "Usamos list comprehension com filtro (if x % 2 == 0) e transformação (x ** 2) em uma única expressão.",
            Language.PYTHON, Difficulty.DIFICIL,
            List.of("numeros = [1, 2, 3, 4, 5, 6]", "resultado = [x ** 2 for x in numeros if x % 2 == 0]", "print(resultado)"));

        saveSortCode("Monte uma função recursiva que calcula o n-ésimo número de Fibonacci.",
            "O caso base retorna n quando n <= 1. O caso recursivo soma fibonacci(n-1) + fibonacci(n-2).",
            Language.PYTHON, Difficulty.DIFICIL,
            List.of("def fibonacci(n):", "    if n <= 1:", "        return n", "    return fibonacci(n - 1) + fibonacci(n - 2)", "print(fibonacci(6))"));

        saveSortCode("Monte um código que conta a frequência de cada palavra em uma lista.",
            "Usamos um dicionário vazio e get() com padrão 0 para incrementar a contagem de cada palavra encontrada.",
            Language.PYTHON, Difficulty.DIFICIL,
            List.of("palavras = [\"ola\", \"mundo\", \"ola\", \"python\"]", "contagem = {}", "for p in palavras:", "    contagem[p] = contagem.get(p, 0) + 1", "print(contagem)"));

        saveSortCode("Use filter() e map() com lambda para pegar os pares e dobrar seus valores.",
            "Primeiro filtramos os pares com filter+lambda, depois dobramos cada um com map+lambda e convertemos para lista.",
            Language.PYTHON, Difficulty.DIFICIL,
            List.of("numeros = [1, 2, 3, 4, 5, 6]", "pares = list(filter(lambda x: x % 2 == 0, numeros))", "dobros = list(map(lambda x: x * 2, pares))", "print(dobros)"));

        saveSortCode("Implemente uma função recursiva que soma todos os elementos de uma lista.",
            "O caso base retorna 0 para lista vazia. O caso recursivo soma o primeiro elemento com a chamada para o restante.",
            Language.PYTHON, Difficulty.DIFICIL,
            List.of("def soma_lista(lista):", "    if not lista:", "        return 0", "    return lista[0] + soma_lista(lista[1:])", "print(soma_lista([1, 2, 3, 4, 5]))"));

        // ── JAVA FÁCIL ───────────────────────────────────────────
        saveSortCode("Monte um código Java que verifica se um número é positivo ou negativo.",
            "Declaramos o inteiro, usamos if/else para testar o sinal e imprimimos a mensagem adequada.",
            Language.JAVA, Difficulty.FACIL,
            List.of("int numero = -5;", "if (numero > 0) {", "    System.out.println(\"Positivo\");", "} else {", "    System.out.println(\"Negativo\");", "}"));

        saveSortCode("Monte um código Java que troca os valores de duas variáveis com variável temporária.",
            "Guardamos 'a' em 'temp', atribuímos 'b' a 'a' e depois o valor de 'temp' (original de 'a') a 'b'.",
            Language.JAVA, Difficulty.FACIL,
            List.of("int a = 10, b = 20;", "int temp = a;", "a = b;", "b = temp;", "System.out.println(a + \" \" + b);"));

        saveSortCode("Escreva um loop Java que imprime os números de 1 a 5.",
            "O for inicializa i=1, repete enquanto i<=5 e incrementa. O body imprime cada valor.",
            Language.JAVA, Difficulty.FACIL,
            List.of("for (int i = 1; i <= 5; i++) {", "    System.out.println(i);", "}"));

        saveSortCode("Monte um código Java que soma os números de 1 a 10 com loop e imprime o resultado.",
            "Inicializamos soma=0 fora do loop e acumulamos cada i. Após o loop imprimimos o total.",
            Language.JAVA, Difficulty.FACIL,
            List.of("int soma = 0;", "for (int i = 1; i <= 10; i++) {", "    soma += i;", "}", "System.out.println(soma);"));

        saveSortCode("Verifique se o número 7 é par ou ímpar e imprima o resultado em Java.",
            "Testamos num % 2 == 0 para par. O else cobre o caso ímpar. Cada branch imprime a mensagem correta.",
            Language.JAVA, Difficulty.FACIL,
            List.of("int num = 7;", "if (num % 2 == 0) {", "    System.out.println(\"Par\");", "} else {", "    System.out.println(\"Impar\");", "}"));

        // ── JAVA MÉDIO ───────────────────────────────────────────
        saveSortCode("Monte um código Java que percorre um array e encontra o maior elemento.",
            "Iniciamos maior com o primeiro elemento e percorremos o array com for-each atualizando quando encontramos superior.",
            Language.JAVA, Difficulty.MEDIO,
            List.of("int[] numeros = {3, 7, 1, 9, 4};", "int maior = numeros[0];", "for (int num : numeros) {", "    if (num > maior) {", "        maior = num;", "    }", "}", "System.out.println(maior);"));

        saveSortCode("Monte um código Java que conta quantos números pares existem em um array.",
            "Inicializamos count=0 e incrementamos sempre que n % 2 == 0 durante a iteração com for-each.",
            Language.JAVA, Difficulty.MEDIO,
            List.of("int[] numeros = {1, 2, 3, 4, 5, 6};", "int count = 0;", "for (int n : numeros) {", "    if (n % 2 == 0) {", "        count++;", "    }", "}", "System.out.println(count);"));

        saveSortCode("Inverta a string 'Programacao' usando StringBuilder em Java.",
            "Criamos StringBuilder com a string original, chamamos reverse() para inverter e toString() para converter de volta.",
            Language.JAVA, Difficulty.MEDIO,
            List.of("String original = \"Programacao\";", "String invertida = new StringBuilder(original).reverse().toString();", "System.out.println(invertida);"));

        saveSortCode("Verifique se a string 'radar' é um palíndromo em Java.",
            "Invertemos a string com StringBuilder.reverse() e comparamos com a original usando equals(). Iguais = palíndromo.",
            Language.JAVA, Difficulty.MEDIO,
            List.of("String s = \"radar\";", "String invertida = new StringBuilder(s).reverse().toString();", "boolean palindromo = s.equals(invertida);", "System.out.println(palindromo);"));

        saveSortCode("Calcule a soma de todos os elementos de um array de inteiros em Java.",
            "Inicializamos soma=0 e usamos for-each para acumular cada elemento. Imprimimos após o loop.",
            Language.JAVA, Difficulty.MEDIO,
            List.of("int[] valores = {10, 20, 30, 40, 50};", "int soma = 0;", "for (int v : valores) {", "    soma += v;", "}", "System.out.println(soma);"));

        // ── JAVA DIFÍCIL ─────────────────────────────────────────
        saveSortCode("Monte um método Java que inverte uma String e imprime o resultado.",
            "O método usa StringBuilder.reverse().toString() para inverter. Depois chamamos no System.out.println.",
            Language.JAVA, Difficulty.DIFICIL,
            List.of("public static String inverter(String s) {", "    return new StringBuilder(s).reverse().toString();", "}", "System.out.println(inverter(\"Java\"));"));

        saveSortCode("Implemente um método Java recursivo que calcula o fatorial de um número.",
            "O caso base retorna 1 quando n <= 1. O passo recursivo multiplica n pelo fatorial de n-1.",
            Language.JAVA, Difficulty.DIFICIL,
            List.of("public static int fatorial(int n) {", "    if (n <= 1) return 1;", "    return n * fatorial(n - 1);", "}", "System.out.println(fatorial(5));"));

        saveSortCode("Monte o FizzBuzz em Java: FizzBuzz para múltiplos de 15, Fizz para 3 e Buzz para 5 de 1 a 15.",
            "Verificamos múltiplo de 15 primeiro (mais específico), depois 3 e 5 separadamente, e por último o número.",
            Language.JAVA, Difficulty.DIFICIL,
            List.of("for (int i = 1; i <= 15; i++) {",
                "    if (i % 15 == 0) System.out.println(\"FizzBuzz\");",
                "    else if (i % 3 == 0) System.out.println(\"Fizz\");",
                "    else if (i % 5 == 0) System.out.println(\"Buzz\");",
                "    else System.out.println(i);",
                "}"));

        saveSortCode("Implemente um método Java recursivo que calcula o n-ésimo número de Fibonacci.",
            "O caso base retorna n quando n <= 1. O recursivo soma fibonacci(n-1) + fibonacci(n-2).",
            Language.JAVA, Difficulty.DIFICIL,
            List.of("public static int fibonacci(int n) {", "    if (n <= 1) return n;", "    return fibonacci(n - 1) + fibonacci(n - 2);", "}", "System.out.println(fibonacci(7));"));

        saveSortCode("Use Stream em Java para filtrar os pares de uma lista e coletar em outra lista.",
            "Criamos a lista com Arrays.asList, encadeamos stream().filter() com lambda e coletamos com Collectors.toList().",
            Language.JAVA, Difficulty.DIFICIL,
            List.of("List<Integer> numeros = Arrays.asList(1, 2, 3, 4, 5, 6);",
                "List<Integer> pares = numeros.stream()",
                "    .filter(n -> n % 2 == 0)",
                "    .collect(Collectors.toList());",
                "System.out.println(pares);"));

        // ── JAVASCRIPT FÁCIL ─────────────────────────────────────
        saveSortCode("Monte uma função JavaScript que recebe um número e retorna o seu dobro.",
            "Declaramos a função com function, retornamos n * 2 e testamos com console.log.",
            Language.JAVASCRIPT, Difficulty.FACIL,
            List.of("function dobro(n) {", "    return n * 2;", "}", "console.log(dobro(5));"));

        saveSortCode("Monte uma função JavaScript que verifica se um número é par.",
            "Retornamos a expressão booleana n % 2 === 0 diretamente na função e testamos com console.log.",
            Language.JAVASCRIPT, Difficulty.FACIL,
            List.of("function ehPar(n) {", "    return n % 2 === 0;", "}", "console.log(ehPar(4));"));

        saveSortCode("Crie uma função JavaScript que retorna uma saudação com template string.",
            "Usamos crase para template literal com ${nome} interpolado. Chamamos e imprimimos o resultado.",
            Language.JAVASCRIPT, Difficulty.FACIL,
            List.of("function saudacao(nome) {", "    return `Ola, ${nome}!`;", "}", "console.log(saudacao(\"Mundo\"));"));

        saveSortCode("Crie uma função JavaScript que calcula a área de um retângulo.",
            "Declaramos a função com dois parâmetros, retornamos largura * altura e testamos com valores de exemplo.",
            Language.JAVASCRIPT, Difficulty.FACIL,
            List.of("function areaRetangulo(largura, altura) {", "    return largura * altura;", "}", "console.log(areaRetangulo(5, 3));"));

        saveSortCode("Some todos os elementos de um array JavaScript usando reduce.",
            "Usamos reduce com acumulador (acc) e valor inicial 0. acc + n acumula cada elemento do array.",
            Language.JAVASCRIPT, Difficulty.FACIL,
            List.of("const numeros = [1, 2, 3, 4, 5];", "const soma = numeros.reduce((acc, n) => acc + n, 0);", "console.log(soma);"));

        // ── JAVASCRIPT MÉDIO ─────────────────────────────────────
        saveSortCode("Monte um código JavaScript que filtra palavras com mais de 3 letras de um array.",
            "Usamos filter() com arrow function que verifica p.length > 3 e imprimimos o array resultante.",
            Language.JAVASCRIPT, Difficulty.MEDIO,
            List.of("const palavras = [\"oi\", \"casa\", \"sol\", \"gato\"];", "const resultado = palavras.filter(p => p.length > 3);", "console.log(resultado);"));

        saveSortCode("Converta todos os nomes de um array para maiúsculas usando map.",
            "Aplicamos map() com arrow function que chama .toUpperCase() em cada nome e imprimimos.",
            Language.JAVASCRIPT, Difficulty.MEDIO,
            List.of("const nomes = [\"ana\", \"bruno\", \"carlos\"];", "const maiusculos = nomes.map(n => n.toUpperCase());", "console.log(maiusculos);"));

        saveSortCode("Encontre o primeiro número maior que 10 em um array usando find.",
            "find() retorna o primeiro elemento que satisfaz a condição. n > 10 é o predicado da arrow function.",
            Language.JAVASCRIPT, Difficulty.MEDIO,
            List.of("const numeros = [3, 8, 15, 4, 22];", "const primeiro = numeros.find(n => n > 10);", "console.log(primeiro);"));

        saveSortCode("Conte quantas vezes a string 'maca' aparece em um array de frutas.",
            "filter() mantém apenas os elementos iguais a 'maca' e .length fornece a quantidade de ocorrências.",
            Language.JAVASCRIPT, Difficulty.MEDIO,
            List.of("const frutas = [\"maca\", \"banana\", \"maca\", \"laranja\", \"maca\"];", "const count = frutas.filter(f => f === \"maca\").length;", "console.log(count);"));

        saveSortCode("Ordene um array de números em ordem crescente sem modificar o original.",
            "O spread [...numeros] cria uma cópia. sort() com (a, b) => a - b garante ordenação numérica crescente.",
            Language.JAVASCRIPT, Difficulty.MEDIO,
            List.of("const numeros = [5, 2, 8, 1, 9];", "const ordenados = [...numeros].sort((a, b) => a - b);", "console.log(ordenados);"));

        // ── JAVASCRIPT DIFÍCIL ───────────────────────────────────
        saveSortCode("Monte uma função JavaScript que remove valores duplicados de um array usando Set.",
            "Um Set rastreia os itens já vistos. filter() com has/add mantém apenas a primeira ocorrência de cada item.",
            Language.JAVASCRIPT, Difficulty.DIFICIL,
            List.of("function removerDuplicatas(arr) {", "    const visto = new Set();", "    return arr.filter(item => {",
                "        if (visto.has(item)) return false;", "        visto.add(item);", "        return true;", "    });", "}"));

        saveSortCode("Implemente uma função curried em JavaScript que multiplica dois números.",
            "A função externa recebe 'a' e retorna uma função interna que recebe 'b'. Criamos triplicar como versão parcial.",
            Language.JAVASCRIPT, Difficulty.DIFICIL,
            List.of("function multiplicar(a) {", "    return function(b) {", "        return a * b;", "    };", "}",
                "const triplicar = multiplicar(3);", "console.log(triplicar(5));"));

        saveSortCode("Componha duas funções em JavaScript: uma que dobra e outra que soma 1.",
            "compor recebe f e g e retorna x => f(g(x)). O resultado aplica dobrar primeiro, depois somarUm.",
            Language.JAVASCRIPT, Difficulty.DIFICIL,
            List.of("const dobrar = x => x * 2;", "const somarUm = x => x + 1;",
                "const compor = (f, g) => x => f(g(x));", "const transformar = compor(somarUm, dobrar);",
                "console.log(transformar(5));"));

        saveSortCode("Crie um closure em JavaScript que funciona como um contador incrementável.",
            "A função externa declara count=0 e retorna uma arrow function que usa ++count. Cada chamada incrementa e retorna.",
            Language.JAVASCRIPT, Difficulty.DIFICIL,
            List.of("function criarContador() {", "    let count = 0;", "    return () => ++count;", "}",
                "const contar = criarContador();", "console.log(contar());", "console.log(contar());"));

        saveSortCode("Monte uma cadeia de Promises que busca dados e transforma o nome para maiúsculas.",
            "O primeiro .then transforma o campo nome com toUpperCase(). O segundo .then recebe a string e imprime.",
            Language.JAVASCRIPT, Difficulty.DIFICIL,
            List.of("const buscar = () => Promise.resolve({ nome: \"Joao\" });", "buscar()",
                "    .then(dados => dados.nome.toUpperCase())", "    .then(nome => console.log(nome));"));

        // ── SQL FÁCIL ────────────────────────────────────────────
        saveSortCode("Monte uma query SQL que seleciona nome e email dos usuários ativos, ordenados por nome.",
            "SELECT define as colunas, FROM a tabela, WHERE filtra ativos e ORDER BY garante ordenação alfabética.",
            Language.SQL, Difficulty.FACIL,
            List.of("SELECT nome, email", "FROM usuarios", "WHERE ativo = true", "ORDER BY nome;"));

        saveSortCode("Monte uma query SQL que busca todos os produtos com preço maior que 100.",
            "SELECT * retorna todas as colunas, FROM define a tabela e WHERE filtra pela condição de preço.",
            Language.SQL, Difficulty.FACIL,
            List.of("SELECT *", "FROM produtos", "WHERE preco > 100;"));

        saveSortCode("Monte um INSERT para adicionar um novo usuário na tabela usuarios.",
            "INSERT INTO define a tabela e colunas alvo. VALUES fornece os dados na mesma ordem das colunas.",
            Language.SQL, Difficulty.FACIL,
            List.of("INSERT INTO usuarios (nome, email, ativo)", "VALUES ('Joao Silva', 'joao@email.com', true);"));

        saveSortCode("Monte um UPDATE para desativar o usuário com id igual a 10.",
            "UPDATE define a tabela, SET especifica o campo e novo valor, WHERE restringe ao registro correto.",
            Language.SQL, Difficulty.FACIL,
            List.of("UPDATE usuarios", "SET ativo = false", "WHERE id = 10;"));

        saveSortCode("Monte um DELETE para remover pedidos cancelados criados antes de 2024.",
            "DELETE FROM define a tabela. WHERE combina duas condições com AND para filtrar apenas os registros indesejados.",
            Language.SQL, Difficulty.FACIL,
            List.of("DELETE FROM pedidos", "WHERE status = 'cancelado'", "AND criado_em < '2024-01-01';"));

        // ── SQL MÉDIO ────────────────────────────────────────────
        saveSortCode("Monte uma query que conta pedidos por cliente, do maior para o menor total.",
            "COUNT(*) agrega, GROUP BY agrupa por cliente e ORDER BY DESC ordena do maior ao menor total.",
            Language.SQL, Difficulty.MEDIO,
            List.of("SELECT cliente_id, COUNT(*) AS total", "FROM pedidos", "GROUP BY cliente_id", "ORDER BY total DESC;"));

        saveSortCode("Monte uma query que junta usuários com seus pedidos aprovados usando INNER JOIN.",
            "FROM declara a tabela principal, INNER JOIN une pela FK e WHERE filtra somente pedidos aprovados.",
            Language.SQL, Difficulty.MEDIO,
            List.of("SELECT u.nome, p.valor", "FROM usuarios u", "INNER JOIN pedidos p ON u.id = p.usuario_id", "WHERE p.status = 'aprovado';"));

        saveSortCode("Monte uma query que traz categorias com preço médio acima de 50, ordenadas pela média.",
            "GROUP BY agrupa por categoria, AVG() calcula a média, HAVING filtra grupos com média > 50 e ORDER BY ordena.",
            Language.SQL, Difficulty.MEDIO,
            List.of("SELECT categoria, AVG(preco) AS media_preco", "FROM produtos", "GROUP BY categoria",
                "HAVING AVG(preco) > 50", "ORDER BY media_preco DESC;"));

        saveSortCode("Monte uma query que lista funcionários com salário acima da média usando subquery.",
            "A subquery entre parênteses calcula AVG(salario). A query principal compara cada salário com esse valor.",
            Language.SQL, Difficulty.MEDIO,
            List.of("SELECT nome", "FROM funcionarios", "WHERE salario > (", "    SELECT AVG(salario) FROM funcionarios", ");"));

        saveSortCode("Monte uma query com CASE WHEN que classifica funcionários por faixa salarial.",
            "CASE WHEN avalia condições em ordem. O primeiro WHEN verdadeiro define o THEN. ELSE cobre os demais casos.",
            Language.SQL, Difficulty.MEDIO,
            List.of("SELECT nome, salario,", "CASE", "    WHEN salario >= 5000 THEN 'Alto'",
                "    WHEN salario >= 2000 THEN 'Medio'", "    ELSE 'Baixo'", "END AS faixa", "FROM funcionarios;"));

        // ── SQL DIFÍCIL ──────────────────────────────────────────
        saveSortCode("Monte uma query com CTE que agrega vendas por mês e exibe do maior ao menor total.",
            "WITH define a CTE com agrupamento mensal. A query principal consulta a CTE e ordena pelo total decrescente.",
            Language.SQL, Difficulty.DIFICIL,
            List.of("WITH vendas_por_mes AS (", "    SELECT MONTH(data) AS mes, SUM(valor) AS total",
                "    FROM vendas", "    GROUP BY MONTH(data)", ")", "SELECT mes, total",
                "FROM vendas_por_mes", "ORDER BY total DESC;"));

        saveSortCode("Monte uma query com ROW_NUMBER que rankeia funcionários por salário dentro de cada departamento.",
            "ROW_NUMBER() é window function. PARTITION BY reinicia a contagem por departamento; ORDER BY DESC classifica do maior salário.",
            Language.SQL, Difficulty.DIFICIL,
            List.of("SELECT nome, salario,", "ROW_NUMBER() OVER (", "    PARTITION BY departamento",
                "    ORDER BY salario DESC", ") AS ranking", "FROM funcionarios;"));

        saveSortCode("Monte uma query com LEFT JOIN que traz clientes, total de pedidos e gasto em 2024.",
            "LEFT JOIN mantém clientes sem pedidos. WHERE filtra pelo ano, GROUP BY agrupa por nome e ORDER BY ordena pelo gasto.",
            Language.SQL, Difficulty.DIFICIL,
            List.of("SELECT c.nome, COUNT(p.id) AS total_pedidos, SUM(p.valor) AS total_gasto",
                "FROM clientes c", "LEFT JOIN pedidos p ON c.id = p.cliente_id",
                "WHERE p.criado_em >= '2024-01-01'", "GROUP BY c.nome", "ORDER BY total_gasto DESC;"));

        saveSortCode("Monte uma subquery correlacionada que busca o funcionário com maior salário por departamento.",
            "A subquery interna referencia f1.departamento da query externa, calculando MAX por departamento para comparar.",
            Language.SQL, Difficulty.DIFICIL,
            List.of("SELECT nome, salario", "FROM funcionarios f1", "WHERE salario = (",
                "    SELECT MAX(salario)", "    FROM funcionarios f2",
                "    WHERE f1.departamento = f2.departamento", ");"));

        saveSortCode("Monte um INSERT INTO...SELECT que copia clientes com mais de 10.000 em compras para tabela VIP.",
            "INSERT INTO define o destino e colunas. SELECT...WHERE filtra os elegíveis. ORDER BY garante a ordem de inserção.",
            Language.SQL, Difficulty.DIFICIL,
            List.of("INSERT INTO clientes_vip (id, nome, email)", "SELECT id, nome, email",
                "FROM clientes", "WHERE total_compras > 10000", "ORDER BY total_compras DESC;"));

        log.info("Seeded 60 questões de SORT_CODE.");
    }

    private void seedCodeCompleteQuestions() {
        CodeCompleteQuestion cc1 = new CodeCompleteQuestion();
        cc1.setTitle("Complete a função que retorna apenas os números pares de uma lista.");
        cc1.setCode("function filtrarPares(lista) {\n  return lista.filter(n =>\n    n % 2 === __\n  )\n}");
        cc1.setCorrectAnswer("0");
        cc1.setExplanation("A expressão correta é n % 2 === 0, que retorna true para números pares.");
        cc1.setLanguage(Language.JAVASCRIPT);
        cc1.setDifficulty(Difficulty.FACIL);
        addOptions(cc1, List.of("===", "=>", "2", "0", "&&"));
        questionRepository.save(cc1);

        log.info("Seeded 1 questão de CODE_COMPLETE.");
    }

    private void saveQuiz(String title, String code, String correctAnswer,
                          String explanation, Language language, Difficulty difficulty,
                          List<String> options) {
        QuizQuestion q = new QuizQuestion();
        q.setTitle(title);
        q.setCode(code);
        q.setCorrectAnswer(correctAnswer);
        q.setExplanation(explanation);
        q.setLanguage(language);
        q.setDifficulty(difficulty);
        addOptions(q, options);
        questionRepository.save(q);
    }

    private void addOptions(Question q, List<String> texts) {
        for (int i = 0; i < texts.size(); i++) {
            QuestionOption opt = QuestionOption.builder()
                .question(q)
                .optionText(texts.get(i))
                .displayOrder(i)
                .build();
            q.getOptions().add(opt);
        }
    }

    private void saveSortCode(String objective, String explanation, Language language, Difficulty difficulty, List<String> lines) {
        SortCodeQuestion q = new SortCodeQuestion();
        q.setObjective(objective);
        q.setExplanation(explanation);
        q.setLanguage(language);
        q.setDifficulty(difficulty);
        addSortLines(q, lines);
        questionRepository.save(q);
    }

    private void addSortLines(Question q, List<String> lines) {
        for (int i = 0; i < lines.size(); i++) {
            SortCodeLine line = SortCodeLine.builder()
                .question(q)
                .lineText(lines.get(i))
                .lineOrder(i)
                .build();
            q.getSortCodeLines().add(line);
        }
    }
}
