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
                .description("Responda perguntas de múltipla escolha")
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
        seedQuizQuestions();
        seedSortCodeQuestions();
        seedCodeCompleteQuestions();
        seedOutputQuestions();
    }

    private void seedQuizQuestions() {
        long count = questionRepository.countByQuestionType("QUIZ");
        if (count >= 72) { log.info("Quiz questions já populadas (72), pulando seed."); return; }
        if (count > 0) { questionRepository.deleteAll(questionRepository.findByFilters("QUIZ", null, null)); }

        // ── PYTHON FÁCIL ─────────────────────────────────────────
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

        // ── PYTHON FACIL (2 mais) ─────────────────────────────────
        saveQuiz("O que a função type() retorna para o valor 42 em Python?",
            null, "<class 'int'>",
            "type() retorna o tipo do objeto. Para inteiros, retorna <class 'int'>.",
            Language.PYTHON, Difficulty.FACIL,
            List.of("<class 'int'>", "<class 'number'>", "int", "integer"));

        saveQuiz("O que será impresso?",
            "nome = 'Python'\nprint('Eu amo ' + nome)",
            "Eu amo Python",
            "O operador + concatena strings em Python. 'Eu amo ' + 'Python' resulta em 'Eu amo Python'.",
            Language.PYTHON, Difficulty.FACIL,
            List.of("Eu amo Python", "EuamoPython", "nome", "Error"));

        // ── PYTHON MEDIO (3 mais) ─────────────────────────────────
        saveQuiz("O que será impresso?",
            "lista = [3, 1, 4, 1, 5]\nprint(sorted(lista))",
            "[1, 1, 3, 4, 5]",
            "sorted() retorna uma nova lista ordenada em ordem crescente sem modificar a original.",
            Language.PYTHON, Difficulty.MEDIO,
            List.of("[1, 1, 3, 4, 5]", "[3, 1, 4, 1, 5]", "[5, 4, 3, 1, 1]", "Error"));

        saveQuiz("O que será impresso?",
            "d = {k: k**2 for k in range(1, 4)}\nprint(d)",
            "{1: 1, 2: 4, 3: 9}",
            "Dict comprehension cria um dicionário onde cada chave k mapeia para k**2. range(1,4) gera 1, 2 e 3.",
            Language.PYTHON, Difficulty.MEDIO,
            List.of("{1: 1, 2: 4, 3: 9}", "{1: 2, 2: 4, 3: 6}", "[1, 4, 9]", "Error"));

        saveQuiz("O que será impresso?",
            "for i, v in enumerate(['a', 'b', 'c']):\n    print(i, v)",
            "0 a\n1 b\n2 c",
            "enumerate() retorna pares (índice, valor). Os índices começam em 0 por padrão.",
            Language.PYTHON, Difficulty.MEDIO,
            List.of("0 a\n1 b\n2 c", "1 a\n2 b\n3 c", "a 0\nb 1\nc 2", "Error"));

        // ── PYTHON DIFICIL (5 mais) ───────────────────────────────
        saveQuiz("O que será impresso?",
            "nums = [1, 2, 3, 4, 5]\nresult = list(filter(lambda x: x > 2, nums))\nprint(result)",
            "[3, 4, 5]",
            "filter() aplica a lambda a cada elemento retornando apenas os que resultam em True. x > 2 é True para 3, 4 e 5.",
            Language.PYTHON, Difficulty.DIFICIL,
            List.of("[3, 4, 5]", "[1, 2]", "[1, 2, 3, 4, 5]", "[]"));

        saveQuiz("O que será impresso?",
            "def f(x, *args):\n    return sum(args)\nprint(f(1, 2, 3, 4))",
            "9",
            "*args captura argumentos posicionais extras como tupla. O primeiro argumento (1) vai para x. sum((2, 3, 4)) = 9.",
            Language.PYTHON, Difficulty.DIFICIL,
            List.of("9", "10", "6", "Error"));

        saveQuiz("O que será impresso?",
            "a, b = 10, 20\na, b = b, a\nprint(a, b)",
            "20 10",
            "Python suporta swap em uma linha. b e a são avaliados antes da atribuição, então a recebe 20 e b recebe 10.",
            Language.PYTHON, Difficulty.DIFICIL,
            List.of("20 10", "10 20", "10 10", "Error"));

        saveQuiz("O que será impresso?",
            "x = [1, 2, 3]\ny = x.copy()\ny.append(4)\nprint(len(x))",
            "3",
            "x.copy() cria uma cópia superficial independente. Modificar y com append() não afeta x. x ainda tem 3 elementos.",
            Language.PYTHON, Difficulty.DIFICIL,
            List.of("3", "4", "0", "Error"));

        saveQuiz("O que será impresso?",
            "pairs = list(zip([1, 2, 3], ['a', 'b', 'c']))\nprint(pairs)",
            "[(1, 'a'), (2, 'b'), (3, 'c')]",
            "zip() combina elementos de dois iteráveis em tuplas por posição. O resultado é uma lista de tuplas.",
            Language.PYTHON, Difficulty.DIFICIL,
            List.of("[(1, 'a'), (2, 'b'), (3, 'c')]", "[[1,'a'],[2,'b'],[3,'c']]", "[1, 2, 3, 'a', 'b', 'c']", "Error"));

        // ── JAVA FACIL (3 mais) ───────────────────────────────────
        saveQuiz("O que será impresso?",
            "System.out.println(10 % 3);",
            "1",
            "O operador % retorna o resto da divisão. 10 dividido por 3 é 3 com resto 1.",
            Language.JAVA, Difficulty.FACIL,
            List.of("0", "1", "3", "3.33"));

        saveQuiz("O que será impresso?",
            "String s = \"Java\";\nSystem.out.println(s.charAt(1));",
            "a",
            "charAt(1) retorna o caractere no índice 1. Índices começam em 0: J=0, a=1, v=2, a=3.",
            Language.JAVA, Difficulty.FACIL,
            List.of("J", "a", "v", "Error"));

        saveQuiz("O que será impresso?",
            "System.out.println(Math.max(7, 3));",
            "7",
            "Math.max() retorna o maior entre dois valores. 7 > 3, então retorna 7.",
            Language.JAVA, Difficulty.FACIL,
            List.of("3", "5", "7", "10"));

        // ── JAVA MEDIO (3 mais) ───────────────────────────────────
        saveQuiz("O que será impresso?",
            "String s = \"Programacao\";\nSystem.out.println(s.substring(0, 7));",
            "Program",
            "substring(0, 7) extrai do índice 0 ao 6 (7 exclusivo). Os primeiros 7 caracteres de 'Programacao' são 'Program'.",
            Language.JAVA, Difficulty.MEDIO,
            List.of("Program", "Programac", "rogramacao", "Error"));

        saveQuiz("O que será impresso?",
            "String s = \"Hello World\";\nSystem.out.println(s.toLowerCase());",
            "hello world",
            "toLowerCase() converte todos os caracteres para minúsculas. 'Hello World' se torna 'hello world'.",
            Language.JAVA, Difficulty.MEDIO,
            List.of("Hello World", "hello world", "HELLO WORLD", "helloworld"));

        saveQuiz("O que será impresso?",
            "String s = \"  Java  \";\nSystem.out.println(s.trim());",
            "Java",
            "trim() remove espaços em branco do início e do fim da String. '  Java  ' se torna 'Java'.",
            Language.JAVA, Difficulty.MEDIO,
            List.of("  Java  ", "Java", "java", "Error"));

        // ── JAVA DIFICIL (5 mais) ─────────────────────────────────
        saveQuiz("O que será impresso?",
            "System.out.println(Integer.toBinaryString(10));",
            "1010",
            "toBinaryString() converte um inteiro para sua representação binária como String. 10 em binário é 1010 (8+2).",
            Language.JAVA, Difficulty.DIFICIL,
            List.of("10", "1010", "1001", "2"));

        saveQuiz("O que será impresso?",
            "System.out.println(\"5\" + 3 + 2);",
            "532",
            "Quando o primeiro operando é String, + faz concatenação. '5' + 3 = '53' (string), '53' + 2 = '532' (string). Avaliação da esquerda para direita.",
            Language.JAVA, Difficulty.DIFICIL,
            List.of("532", "10", "55", "Error"));

        saveQuiz("O que será impresso?",
            "String s = \"Java\";\nSystem.out.println(s.replace(\"a\", \"@\"));",
            "J@v@",
            "replace() substitui TODAS as ocorrências do primeiro argumento pelo segundo. 'Java' tem dois 'a': posições 1 e 3.",
            Language.JAVA, Difficulty.DIFICIL,
            List.of("J@v@", "J@va", "Java", "@@@"));

        saveQuiz("O que será impresso?",
            "int[] arr = {5, 3, 8, 1};\njava.util.Arrays.sort(arr);\nSystem.out.println(arr[0]);",
            "1",
            "Arrays.sort() ordena o array em ordem crescente. Após ordenação: {1, 3, 5, 8}. O índice 0 contém 1.",
            Language.JAVA, Difficulty.DIFICIL,
            List.of("5", "3", "1", "8"));

        saveQuiz("O que será impresso?",
            "String a = new String(\"test\");\nString b = new String(\"test\");\nSystem.out.println(a == b);",
            "false",
            "new String() cria objetos diferentes no heap. O == compara referências, não conteúdo. Para comparar conteúdo use equals().",
            Language.JAVA, Difficulty.DIFICIL,
            List.of("true", "false", "null", "Error"));

        // ── JS FACIL (3 mais) ─────────────────────────────────────
        saveQuiz("O que será impresso?",
            "console.log(typeof undefined);",
            "undefined",
            "typeof undefined retorna a string 'undefined'. É diferente de null, cujo typeof retorna 'object' (comportamento histórico).",
            Language.JAVASCRIPT, Difficulty.FACIL,
            List.of("null", "undefined", "object", "void"));

        saveQuiz("O que será impresso?",
            "console.log(5 === \"5\");",
            "false",
            "=== é igualdade estrita: compara valor E tipo sem coerção. 5 é number e '5' é string, então são diferentes.",
            Language.JAVASCRIPT, Difficulty.FACIL,
            List.of("true", "false", "undefined", "Error"));

        saveQuiz("O que será impresso?",
            "console.log('hello'.length);",
            "5",
            "A propriedade length de uma string retorna o número de caracteres. 'hello' tem 5 caracteres.",
            Language.JAVASCRIPT, Difficulty.FACIL,
            List.of("4", "5", "6", "undefined"));

        // ── JS MEDIO (4 mais) ─────────────────────────────────────
        saveQuiz("O que será impresso?",
            "const [a, b, ...rest] = [1, 2, 3, 4, 5];\nconsole.log(rest);",
            "[3, 4, 5]",
            "O rest parameter (...rest) captura os elementos restantes como array. a=1, b=2, rest=[3, 4, 5].",
            Language.JAVASCRIPT, Difficulty.MEDIO,
            List.of("[3, 4, 5]", "[1, 2]", "[2, 3, 4, 5]", "undefined"));

        saveQuiz("O que será impresso?",
            "const arr = [1, 2, 3];\nconsole.log([...arr, 4, 5]);",
            "[1, 2, 3, 4, 5]",
            "O spread operator (...arr) espalha os elementos do array dentro do novo array literal. Resulta em [1, 2, 3, 4, 5].",
            Language.JAVASCRIPT, Difficulty.MEDIO,
            List.of("[1, 2, 3, 4, 5]", "[4, 5, 1, 2, 3]", "[1, 2, 3]", "Error"));

        saveQuiz("O que será impresso?",
            "const obj = {a: 1, b: 2, c: 3};\nconsole.log(Object.keys(obj).length);",
            "3",
            "Object.keys() retorna um array com as chaves do objeto. O objeto tem 3 chaves (a, b, c), então length é 3.",
            Language.JAVASCRIPT, Difficulty.MEDIO,
            List.of("2", "3", "6", "undefined"));

        saveQuiz("O que será impresso?",
            "const x = 10;\nconsole.log(`O dobro de ${x} é ${x * 2}`);",
            "O dobro de 10 é 20",
            "Template literals (crase) permitem interpolação com ${}. ${x} é substituído por 10 e ${x * 2} por 20.",
            Language.JAVASCRIPT, Difficulty.MEDIO,
            List.of("O dobro de ${x} é ${x * 2}", "O dobro de 10 é 20", "O dobro de x é x*2", "Error"));

        // ── JS DIFICIL (5 mais) ───────────────────────────────────
        saveQuiz("O que será impresso?",
            "console.log(NaN === NaN);",
            "false",
            "NaN (Not a Number) é o único valor em JavaScript que não é igual a si mesmo. Use Number.isNaN() para verificar.",
            Language.JAVASCRIPT, Difficulty.DIFICIL,
            List.of("true", "false", "NaN", "Error"));

        saveQuiz("O que será impresso?",
            "const obj = {a: 1};\nconst {a, b = 10} = obj;\nconsole.log(b);",
            "10",
            "Desestruturação com valor padrão (b = 10) usa o padrão quando a propriedade não existe no objeto. obj não tem 'b', então b = 10.",
            Language.JAVASCRIPT, Difficulty.DIFICIL,
            List.of("1", "10", "undefined", "null"));

        saveQuiz("O que será impresso?",
            "console.log(!!null);",
            "false",
            "!! aplica dois NOTs. null é falsy, então !null é true e !!null é false. Converte para booleano explicitamente.",
            Language.JAVASCRIPT, Difficulty.DIFICIL,
            List.of("true", "false", "null", "undefined"));

        saveQuiz("O que será impresso?",
            "console.log([1, 2, 3].includes(2));",
            "true",
            "includes() verifica se o valor existe no array retornando true ou false. 2 está no array [1, 2, 3].",
            Language.JAVASCRIPT, Difficulty.DIFICIL,
            List.of("true", "false", "2", "undefined"));

        saveQuiz("Qual será o output?",
            "let x = 1;\nconst f = () => x;\nx = 2;\nconsole.log(f());",
            "2",
            "A arrow function f captura a referência de x, não seu valor. Quando x é reatribuído para 2, f() retorna 2.",
            Language.JAVASCRIPT, Difficulty.DIFICIL,
            List.of("1", "2", "undefined", "Error"));

        // ── SQL FACIL (4 mais) ────────────────────────────────────
        saveQuiz("O que faz ORDER BY DESC em SQL?",
            null, "Ordena do maior para o menor",
            "DESC (descending) ordena do maior para o menor. O padrão (ASC) ordena do menor para o maior.",
            Language.SQL, Difficulty.FACIL,
            List.of("Ordena do menor para o maior", "Ordena do maior para o menor", "Remove duplicatas", "Agrupa resultados"));

        saveQuiz("Qual função SQL retorna a soma de uma coluna numérica?",
            null, "SUM()",
            "SUM() é uma função de agregação que soma todos os valores não nulos de uma coluna numérica.",
            Language.SQL, Difficulty.FACIL,
            List.of("COUNT()", "SUM()", "TOTAL()", "ADD()"));

        saveQuiz("Qual operador SQL verifica correspondência de padrão em strings?",
            "SELECT * FROM clientes WHERE nome LIKE 'A%';",
            "LIKE",
            "LIKE é usado com % (qualquer sequência) e _ (um caractere) para busca por padrão. 'A%' retorna tudo que começa com A.",
            Language.SQL, Difficulty.FACIL,
            List.of("MATCH", "CONTAINS", "LIKE", "REGEX"));

        saveQuiz("Qual palavra-chave cria um alias (apelido) para uma coluna em SQL?",
            "SELECT COUNT(*) AS total FROM pedidos;",
            "AS",
            "AS cria um alias para uma coluna ou tabela. O alias 'total' será o nome da coluna no resultado da query.",
            Language.SQL, Difficulty.FACIL,
            List.of("ALIAS", "AS", "RENAME", "LABEL"));

        // ── SQL MEDIO (5 mais) ────────────────────────────────────
        saveQuiz("O que INNER JOIN retorna?",
            null, "Apenas registros com correspondência em ambas as tabelas",
            "INNER JOIN retorna apenas as linhas onde há correspondência nas duas tabelas pela condição ON. Linhas sem par são excluídas.",
            Language.SQL, Difficulty.MEDIO,
            List.of("Todos da tabela esquerda", "Todos da tabela direita", "Apenas registros com correspondência em ambas as tabelas", "Todos os registros"));

        saveQuiz("Qual cláusula filtra grupos criados pelo GROUP BY?",
            null, "HAVING",
            "HAVING filtra grupos após o agrupamento. WHERE filtra linhas antes. Funções de agregação (COUNT, SUM) só podem ser usadas no HAVING.",
            Language.SQL, Difficulty.MEDIO,
            List.of("WHERE", "HAVING", "FILTER", "WHEN"));

        saveQuiz("O que % representa dentro de LIKE?",
            "SELECT * FROM users WHERE nome LIKE 'Ana%';",
            "Qualquer sequência de zero ou mais caracteres",
            "% é um wildcard em LIKE que representa qualquer sequência de zero ou mais caracteres. 'Ana%' encontra 'Ana', 'Anabel', 'Anabela', etc.",
            Language.SQL, Difficulty.MEDIO,
            List.of("Exatamente um caractere", "Qualquer sequência de zero ou mais caracteres", "Um dígito numérico", "Um espaço"));

        saveQuiz("O que LEFT JOIN retorna?",
            null, "Todos os registros da tabela esquerda, mesmo sem correspondência na direita",
            "LEFT JOIN mantém todos os registros da tabela à esquerda. Onde não há correspondência na direita, os campos ficam NULL.",
            Language.SQL, Difficulty.MEDIO,
            List.of("Todos da tabela direita", "Todos os registros da tabela esquerda, mesmo sem correspondência na direita", "Apenas os que têm correspondência", "Todos os registros de ambas"));

        saveQuiz("O que é uma subquery (subconsulta) em SQL?",
            null, "Uma query aninhada dentro de outra query",
            "Subquery é uma SELECT dentro de outra instrução SQL. Pode aparecer no WHERE, FROM ou SELECT. É executada antes da query externa.",
            Language.SQL, Difficulty.MEDIO,
            List.of("Uma query aninhada dentro de outra query", "Um índice de consulta", "Uma view permanente", "Um procedimento armazenado"));

        // ── SQL DIFICIL (6 questões) ──────────────────────────────
        saveQuiz("O que ROW_NUMBER() faz em SQL?",
            null, "Atribui número sequencial único a cada linha dentro de uma partição",
            "ROW_NUMBER() é window function que numera linhas sequencialmente. Com PARTITION BY, reinicia a contagem por grupo. Sem empates nos números.",
            Language.SQL, Difficulty.DIFICIL,
            List.of("Conta o total de linhas", "Atribui número sequencial único a cada linha dentro de uma partição", "Calcula a média", "Agrupa resultados"));

        saveQuiz("Qual a diferença entre RANK() e DENSE_RANK()?",
            null, "DENSE_RANK não deixa lacunas nos números em caso de empate",
            "Com dois empatados em 1º: RANK daria 1, 1, 3 (pula o 2). DENSE_RANK daria 1, 1, 2 (sem lacunas). Ambos empate no mesmo número.",
            Language.SQL, Difficulty.DIFICIL,
            List.of("RANK não funciona com PARTITION", "DENSE_RANK não deixa lacunas nos números em caso de empate", "RANK é mais rápido", "Não há diferença"));

        saveQuiz("O que é uma CTE (Common Table Expression)?",
            null, "Resultado temporário nomeado definido com WITH para uso na mesma query",
            "CTE é definida com WITH nome AS (SELECT...). Funciona como uma tabela temporária só para aquela query, melhorando legibilidade.",
            Language.SQL, Difficulty.DIFICIL,
            List.of("Tabela permanente no banco", "Resultado temporário nomeado definido com WITH para uso na mesma query", "Um índice especial", "Um tipo de JOIN"));

        saveQuiz("O que COALESCE() retorna?",
            "SELECT COALESCE(NULL, NULL, 'padrão');",
            "O primeiro valor não nulo da lista de argumentos",
            "COALESCE percorre os argumentos e retorna o primeiro que não é NULL. Muito útil para substituir NULL por um valor padrão.",
            Language.SQL, Difficulty.DIFICIL,
            List.of("NULL sempre", "O último argumento sempre", "O primeiro valor não nulo da lista de argumentos", "A soma dos argumentos"));

        saveQuiz("O que NULLIF(a, b) retorna?",
            "SELECT NULLIF(5, 5);",
            "NULL quando a e b são iguais, caso contrário retorna a",
            "NULLIF é o inverso de COALESCE. Retorna NULL quando os dois argumentos são iguais, útil para evitar divisão por zero.",
            Language.SQL, Difficulty.DIFICIL,
            List.of("NULL sempre", "a sempre", "NULL quando a e b são iguais, caso contrário retorna a", "b quando a é NULL"));

        saveQuiz("O que PARTITION BY faz em window functions?",
            null, "Divide o conjunto de resultados em grupos para a função analítica operar separadamente",
            "PARTITION BY reinicia o cálculo da window function para cada grupo. Similar ao GROUP BY, mas sem colapsar linhas.",
            Language.SQL, Difficulty.DIFICIL,
            List.of("Pagina os resultados", "Divide o conjunto de resultados em grupos para a função analítica operar separadamente", "Filtra registros", "Cria índice"));

        log.info("Seeded 72 questões de QUIZ.");
    }

    private void seedOutputQuestions() {
        long count = questionRepository.countByQuestionType("OUTPUT");
        if (count >= 72) {
            log.info("Output questions já populadas ({}), pulando seed.", count);
            return;
        }
        if (count > 0) {
            questionRepository.deleteAll(questionRepository.findByFilters("OUTPUT", null, null));
            log.info("Questões OUTPUT antigas removidas para re-seed.");
        }

        // Java - FACIL
        saveOutput(
            "Qual será o output ao executar esse código Java?",
            "System.out.println(\"SmartHub\".length());",
            "8",
            "O método length() de String retorna o número de caracteres. 'SmartHub' tem 8 caracteres: S-m-a-r-t-H-u-b.",
            Language.JAVA, Difficulty.FACIL,
            List.of("6", "7", "8", "9"));

        // Java - MEDIO
        saveOutput(
            "Qual será o output ao executar esse código Java?",
            "int[] arr = {3, 1, 4, 1, 5};\nint soma = 0;\nfor (int i = 0; i < arr.length; i++) {\n  if (arr[i] % 2 != 0) {\n    soma += arr[i];\n  }\n}\nSystem.out.println(soma);",
            "10",
            "O loop soma apenas os valores ímpares do array: 3 + 1 + 1 + 5 = 10. O 4 é par (4 % 2 == 0) e é ignorado pelo if.",
            Language.JAVA, Difficulty.MEDIO,
            List.of("14", "10", "9", "13"));

        // Java - DIFICIL
        saveOutput(
            "Qual será o output ao executar esse código Java?",
            "int x = 5;\nSystem.out.println(x++ + \" \" + x);",
            "5 6",
            "x++ é pós-incremento: retorna o valor ANTES de incrementar (5), depois incrementa x para 6. Na concatenação, o primeiro x já foi avaliado como 5, então o segundo x já vale 6.",
            Language.JAVA, Difficulty.DIFICIL,
            List.of("5 6", "6 6", "5 5", "6 5"));

        // Python - FACIL
        saveOutput(
            "Qual será o output ao executar esse código Python?",
            "x = 10\ny = 3\nprint(x // y)",
            "3",
            "O operador // é divisão inteira em Python: descarta o resto fracionário. 10 / 3 = 3.333..., e a divisão inteira retorna apenas 3.",
            Language.PYTHON, Difficulty.FACIL,
            List.of("3", "3.33", "1", "4"));

        // Python - MEDIO
        saveOutput(
            "Qual será o output ao executar esse código Python?",
            "lista = [1, 2, 3, 4, 5]\nprint(lista[1:4])",
            "[2, 3, 4]",
            "O slice lista[1:4] retorna os elementos dos índices 1, 2 e 3 — o índice final (4) é excluído. Índice 1 = 2, índice 2 = 3, índice 3 = 4.",
            Language.PYTHON, Difficulty.MEDIO,
            List.of("[2, 3, 4]", "[1, 2, 3]", "[2, 3, 4, 5]", "[1, 2, 3, 4]"));

        // Python - DIFICIL
        saveOutput(
            "Qual será o output ao executar esse código Python?",
            "a = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)",
            "[1, 2, 3, 4]",
            "b = a não copia a lista: cria uma referência ao mesmo objeto em memória. Modificar b com append() também modifica a, pois ambas as variáveis apontam para a mesma lista.",
            Language.PYTHON, Difficulty.DIFICIL,
            List.of("[1, 2, 3, 4]", "[1, 2, 3]", "[4]", "Error"));

        // JavaScript - FACIL
        saveOutput(
            "Qual será o output ao executar esse código JavaScript?",
            "console.log(2 + 3 * 4);",
            "14",
            "Multiplicação tem precedência sobre adição. 3 * 4 = 12 é calculado primeiro, depois 2 + 12 = 14. Sem parênteses, os operadores seguem a precedência matemática padrão.",
            Language.JAVASCRIPT, Difficulty.FACIL,
            List.of("14", "20", "24", "Error"));

        // JavaScript - MEDIO
        saveOutput(
            "Qual será o output ao executar esse código JavaScript?",
            "let a = [1, 2, 3];\na.push(4);\nconsole.log(a.length);",
            "4",
            "push() adiciona um elemento ao final do array. O array [1, 2, 3] tinha 3 elementos; após push(4) passa a ter 4. A propriedade length retorna 4.",
            Language.JAVASCRIPT, Difficulty.MEDIO,
            List.of("3", "4", "5", "undefined"));

        // JavaScript - DIFICIL
        saveOutput(
            "Qual será o output ao executar esse código JavaScript?",
            "console.log(0.1 + 0.2 === 0.3);",
            "false",
            "Em ponto flutuante binário (IEEE 754), 0.1 e 0.2 não têm representação exata. 0.1 + 0.2 resulta em 0.30000000000000004, e não em 0.3. Por isso a comparação estrita retorna false.",
            Language.JAVASCRIPT, Difficulty.DIFICIL,
            List.of("true", "false", "undefined", "Error"));

        // SQL - FACIL
        saveOutput(
            "Qual o resultado dessa query SQL?",
            "SELECT 10 / 2;",
            "5",
            "Em SQL, SELECT pode executar expressões aritméticas diretamente sem precisar de uma tabela. 10 / 2 = 5.",
            Language.SQL, Difficulty.FACIL,
            List.of("5", "5.0", "2", "Error"));

        // SQL - MEDIO
        saveOutput(
            "Qual o resultado dessa query SQL?",
            "SELECT UPPER('hello world');",
            "HELLO WORLD",
            "A função UPPER() converte todos os caracteres da string para maiúsculas. 'hello world' se torna 'HELLO WORLD'.",
            Language.SQL, Difficulty.MEDIO,
            List.of("HELLO WORLD", "hello world", "Hello World", "Error"));

        // SQL - DIFICIL
        saveOutput(
            "Qual o resultado dessa query SQL?",
            "SELECT ROUND(7.5678, 2);",
            "7.57",
            "ROUND(valor, casas) arredonda para o número de casas decimais. 7.5678 com 2 casas: o terceiro decimal é 7 (>= 5), então o segundo decimal sobe de 6 para 7. Resultado: 7.57.",
            Language.SQL, Difficulty.DIFICIL,
            List.of("7.57", "7.56", "7.6", "8"));

        // ── PYTHON FACIL (5 mais) ─────────────────────────────────
        saveOutput("Qual será o output?", "print(type(3.14))", "<class 'float'>",
            "type() retorna o tipo do objeto como classe. Para floats retorna <class 'float'>.",
            Language.PYTHON, Difficulty.FACIL, List.of("<class 'float'>", "<class 'double'>", "float", "3.14"));

        saveOutput("Qual será o output?", "print(\"abc\"[0])", "a",
            "Strings em Python são indexadas a partir de 0. O índice 0 retorna o primeiro caractere 'a'.",
            Language.PYTHON, Difficulty.FACIL, List.of("a", "b", "c", "Error"));

        saveOutput("Qual será o output?", "print(bool([]))", "False",
            "Uma lista vazia [] é um valor falsy em Python. bool([]) converte para False. Listas não-vazias são truthy.",
            Language.PYTHON, Difficulty.FACIL, List.of("False", "True", "[]", "None"));

        saveOutput("Qual será o output?", "print(10 % 3)", "1",
            "O operador % retorna o resto da divisão inteira. 10 = 3 × 3 + 1, portanto o resto é 1.",
            Language.PYTHON, Difficulty.FACIL, List.of("1", "3", "0", "3.33"));

        saveOutput("Qual será o output?", "x = 5\nprint(x * 3)", "15",
            "x = 5 e x * 3 = 5 × 3 = 15. O resultado é impresso com print().",
            Language.PYTHON, Difficulty.FACIL, List.of("15", "53", "8", "5"));

        // ── PYTHON MEDIO (5 mais) ─────────────────────────────────
        saveOutput("Qual será o output?", "d = {'a': 1, 'b': 2}\nfor k in d:\n    print(k)", "a\nb",
            "Iterar sobre um dicionário percorre as chaves. As chaves são retornadas na ordem de inserção (Python 3.7+).",
            Language.PYTHON, Difficulty.MEDIO, List.of("a\nb", "1\n2", "{'a': 1, 'b': 2}", "Error"));

        saveOutput("Qual será o output?", "s = 'hello'\nprint(s.count('l'))", "2",
            "count() conta quantas vezes a substring aparece na string. 'l' aparece duas vezes em 'hello'.",
            Language.PYTHON, Difficulty.MEDIO, List.of("1", "2", "3", "0"));

        saveOutput("Qual será o output?", "lista = [3, 1, 2]\nlista.sort()\nprint(lista)", "[1, 2, 3]",
            "sort() ordena a lista IN-PLACE em ordem crescente. Diferente de sorted(), modifica a lista original.",
            Language.PYTHON, Difficulty.MEDIO, List.of("[1, 2, 3]", "[3, 2, 1]", "[3, 1, 2]", "None"));

        saveOutput("Qual será o output?", "a, b = 5, 10\nprint(a, b)", "5 10",
            "print() com múltiplos argumentos os separa com espaço por padrão. a = 5 e b = 10.",
            Language.PYTHON, Difficulty.MEDIO, List.of("5 10", "510", "5, 10", "(5, 10)"));

        saveOutput("Qual será o output?", "print(sum([1, 2, 3, 4, 5]))", "15",
            "sum() retorna a soma de todos os elementos do iterável. 1+2+3+4+5 = 15.",
            Language.PYTHON, Difficulty.MEDIO, List.of("15", "10", "5", "0"));

        // ── PYTHON DIFICIL (5 mais) ───────────────────────────────
        saveOutput("Qual será o output?", "print(list(map(str, [1, 2, 3])))", "['1', '2', '3']",
            "map() aplica str() a cada elemento convertendo ints para strings. list() materializa o iterador.",
            Language.PYTHON, Difficulty.DIFICIL, List.of("['1', '2', '3']", "[1, 2, 3]", "['1,2,3']", "Error"));

        saveOutput("Qual será o output?", "print(3 > 2 > 1)", "True",
            "Python suporta comparações encadeadas. 3 > 2 é True E 2 > 1 é True, logo o resultado é True.",
            Language.PYTHON, Difficulty.DIFICIL, List.of("True", "False", "Error", "None"));

        saveOutput("Qual será o output?", "x = [1, 2, 3]\nprint(x[::-1])", "[3, 2, 1]",
            "Slice com passo -1 inverte a lista. [::-1] cria uma cópia invertida sem modificar o original.",
            Language.PYTHON, Difficulty.DIFICIL, List.of("[3, 2, 1]", "[1, 2, 3]", "Error", "None"));

        saveOutput("Qual será o output?", "print(any([False, 0, '', None, 1]))", "True",
            "any() retorna True se pelo menos um elemento for truthy. O inteiro 1 é truthy, então retorna True.",
            Language.PYTHON, Difficulty.DIFICIL, List.of("True", "False", "1", "Error"));

        saveOutput("Qual será o output?", "nums = [1, 2, 3]\nnums2 = nums\nnums2 += [4]\nprint(len(nums))", "4",
            "nums2 = nums cria outra referência para a mesma lista. nums2 += [4] modifica a lista in-place, afetando nums também.",
            Language.PYTHON, Difficulty.DIFICIL, List.of("3", "4", "1", "Error"));

        // ── JAVA FACIL (5 mais) ───────────────────────────────────
        saveOutput("Qual será o output ao executar esse código Java?", "System.out.println(Math.abs(-7));",
            "7", "Math.abs() retorna o valor absoluto (sem sinal). abs(-7) = 7.",
            Language.JAVA, Difficulty.FACIL, List.of("7", "-7", "0", "Error"));

        saveOutput("Qual será o output ao executar esse código Java?", "System.out.println('A' + 1);",
            "66", "Em Java, char + int faz aritmética com o código Unicode. 'A' = 65, então 65 + 1 = 66 (código de 'B').",
            Language.JAVA, Difficulty.FACIL, List.of("A1", "B", "65", "66"));

        saveOutput("Qual será o output ao executar esse código Java?", "System.out.println(\"abc\".toUpperCase());",
            "ABC", "toUpperCase() converte todos os caracteres para maiúsculas. 'abc' se torna 'ABC'.",
            Language.JAVA, Difficulty.FACIL, List.of("abc", "ABC", "Abc", "Error"));

        saveOutput("Qual será o output ao executar esse código Java?",
            "int x = 0;\nwhile (x < 3) { x++; }\nSystem.out.println(x);",
            "3", "O loop incrementa x até que x >= 3. Após o loop, x = 3.",
            Language.JAVA, Difficulty.FACIL, List.of("2", "3", "4", "0"));

        saveOutput("Qual será o output ao executar esse código Java?", "System.out.println(Integer.MAX_VALUE > 0);",
            "true", "Integer.MAX_VALUE é 2.147.483.647, que é positivo. A comparação com 0 retorna true.",
            Language.JAVA, Difficulty.FACIL, List.of("true", "false", "Error", "null"));

        // ── JAVA MEDIO (5 mais) ───────────────────────────────────
        saveOutput("Qual será o output ao executar esse código Java?",
            "String s = \"Hello World\";\nSystem.out.println(s.substring(6));",
            "World", "substring(6) retorna da posição 6 até o final. 'Hello World'[6] = 'W', então o resultado é 'World'.",
            Language.JAVA, Difficulty.MEDIO, List.of("World", "Hello", " World", "Error"));

        saveOutput("Qual será o output ao executar esse código Java?",
            "System.out.println(String.format(\"%.2f\", 3.14159));",
            "3.14", "String.format com '%.2f' formata float com 2 casas decimais. 3.14159 arredondado para 2 casas = 3.14.",
            Language.JAVA, Difficulty.MEDIO, List.of("3.14", "3.1", "3.142", "3.14159"));

        saveOutput("Qual será o output ao executar esse código Java?",
            "int soma = 0;\nfor (int i = 1; i <= 5; i++) soma += i;\nSystem.out.println(soma);",
            "15", "O loop acumula 1+2+3+4+5 = 15 em soma.",
            Language.JAVA, Difficulty.MEDIO, List.of("10", "15", "5", "20"));

        saveOutput("Qual será o output ao executar esse código Java?",
            "String s = \"banana\";\nSystem.out.println(s.indexOf(\"na\"));",
            "2", "indexOf() retorna o índice da primeira ocorrência. Em 'banana', 'na' aparece primeiro no índice 2 (b=0, a=1, n=2).",
            Language.JAVA, Difficulty.MEDIO, List.of("2", "0", "4", "-1"));

        saveOutput("Qual será o output ao executar esse código Java?",
            "System.out.println(\"   \".trim().isEmpty());",
            "true", "trim() remove espaços. '   '.trim() retorna ''. isEmpty() retorna true para string vazia.",
            Language.JAVA, Difficulty.MEDIO, List.of("true", "false", "null", "Error"));

        // ── JAVA DIFICIL (5 mais) ─────────────────────────────────
        saveOutput("Qual será o output ao executar esse código Java?", "System.out.println(5 << 1);",
            "10", "O operador << faz deslocamento de bits à esquerda. 5 em binário é 101. Deslocando 1 bit: 1010 = 10.",
            Language.JAVA, Difficulty.DIFICIL, List.of("10", "5", "2", "51"));

        saveOutput("Qual será o output ao executar esse código Java?",
            "System.out.println(Integer.parseInt(\"42\") + 8);",
            "50", "parseInt() converte a String '42' para int 42. 42 + 8 = 50. A soma é aritmética, não concatenação.",
            Language.JAVA, Difficulty.DIFICIL, List.of("50", "428", "42", "Error"));

        saveOutput("Qual será o output ao executar esse código Java?", "System.out.println(10 & 3);",
            "2", "Operador & é AND bit a bit. 10 = 1010, 3 = 0011. AND: 0010 = 2.",
            Language.JAVA, Difficulty.DIFICIL, List.of("2", "13", "1", "0"));

        saveOutput("Qual será o output ao executar esse código Java?", "System.out.println(Math.pow(2, 8));",
            "256.0", "Math.pow() retorna double. 2^8 = 256. O resultado é 256.0 (não 256 inteiro).",
            Language.JAVA, Difficulty.DIFICIL, List.of("256", "256.0", "128", "Error"));

        saveOutput("Qual será o output ao executar esse código Java?",
            "String s = \"Java\";\nSystem.out.println(s.chars().count());",
            "4", "chars() retorna IntStream dos caracteres. count() conta os elementos. 'Java' tem 4 caracteres.",
            Language.JAVA, Difficulty.DIFICIL, List.of("4", "3", "8", "Error"));

        // ── JS FACIL (5 mais) ─────────────────────────────────────
        saveOutput("Qual será o output?", "console.log(\"hello\".toUpperCase());",
            "HELLO", "toUpperCase() converte a string para maiúsculas. 'hello' se torna 'HELLO'.",
            Language.JAVASCRIPT, Difficulty.FACIL, List.of("HELLO", "hello", "Hello", "Error"));

        saveOutput("Qual será o output?", "console.log(typeof 42);",
            "number", "typeof retorna o tipo como string. Para números inteiros e decimais, retorna 'number'.",
            Language.JAVASCRIPT, Difficulty.FACIL, List.of("number", "int", "integer", "Number"));

        saveOutput("Qual será o output?", "console.log([1, 2, 3].indexOf(2));",
            "1", "indexOf() retorna o índice da primeira ocorrência. O valor 2 está no índice 1 (índices começam em 0).",
            Language.JAVASCRIPT, Difficulty.FACIL, List.of("0", "1", "2", "-1"));

        saveOutput("Qual será o output?", "console.log(\"\" == false);",
            "true", "Com == (igualdade frouxa), '' é coagido para false. false == false é true. Use === para evitar coerção.",
            Language.JAVASCRIPT, Difficulty.FACIL, List.of("true", "false", "undefined", "Error"));

        saveOutput("Qual será o output?", "console.log(Math.floor(4.9));",
            "4", "Math.floor() arredonda para baixo para o inteiro mais próximo. floor(4.9) = 4.",
            Language.JAVASCRIPT, Difficulty.FACIL, List.of("4", "5", "4.9", "Error"));

        // ── JS MEDIO (5 mais) ─────────────────────────────────────
        saveOutput("Qual será o output?", "const {x, y} = {x: 10, y: 20};\nconsole.log(x + y);",
            "30", "Desestruturação extrai x=10 e y=20 do objeto. 10 + 20 = 30.",
            Language.JAVASCRIPT, Difficulty.MEDIO, List.of("30", "1020", "undefined", "Error"));

        saveOutput("Qual será o output?", "const arr = [1, 2, 3];\nconsole.log(arr.slice(1));",
            "[2, 3]", "slice(1) retorna novo array do índice 1 ao final. Não modifica o original. [1,2,3].slice(1) = [2,3].",
            Language.JAVASCRIPT, Difficulty.MEDIO, List.of("[2, 3]", "[1, 2]", "[1, 2, 3]", "[3]"));

        saveOutput("Qual será o output?", "const s = 'hello world';\nconsole.log(s.split(' ').length);",
            "2", "split(' ') divide a string pelo espaço, criando ['hello', 'world']. O array tem length = 2.",
            Language.JAVASCRIPT, Difficulty.MEDIO, List.of("1", "2", "11", "undefined"));

        saveOutput("Qual será o output?", "console.log([1, 2, 3].every(n => n > 0));",
            "true", "every() retorna true se TODOS os elementos satisfazem a condição. 1>0, 2>0, 3>0 são todos true.",
            Language.JAVASCRIPT, Difficulty.MEDIO, List.of("true", "false", "undefined", "3"));

        saveOutput("Qual será o output?", "const obj = {a: 1};\nobj.b = 2;\nconsole.log(Object.keys(obj).length);",
            "2", "Adicionamos 'b' ao objeto, que agora tem as chaves 'a' e 'b'. Object.keys retorna ['a','b'], length = 2.",
            Language.JAVASCRIPT, Difficulty.MEDIO, List.of("1", "2", "3", "undefined"));

        // ── JS DIFICIL (5 mais) ───────────────────────────────────
        saveOutput("Qual será o output?", "console.log(+\"42\");",
            "42", "O operador + unário converte string para número. +'42' = 42 (number).",
            Language.JAVASCRIPT, Difficulty.DIFICIL, List.of("42", "\"42\"", "NaN", "Error"));

        saveOutput("Qual será o output?", "console.log(typeof function(){});",
            "function", "typeof retorna 'function' para funções. Em JavaScript funções são objetos, mas têm type próprio.",
            Language.JAVASCRIPT, Difficulty.DIFICIL, List.of("function", "object", "undefined", "Error"));

        saveOutput("Qual será o output?", "console.log([1, 2, 3].at(-1));",
            "3", "at(-1) acessa o último elemento com índice negativo. -1 é o último, -2 o penúltimo, etc.",
            Language.JAVASCRIPT, Difficulty.DIFICIL, List.of("3", "1", "-1", "undefined"));

        saveOutput("Qual será o output?", "console.log(Number.isInteger(1.0));",
            "true", "1.0 em JavaScript é representado internamente como 1 (sem parte fracionária). Number.isInteger(1.0) = true.",
            Language.JAVASCRIPT, Difficulty.DIFICIL, List.of("true", "false", "1", "Error"));

        saveOutput("Qual será o output?", "const a = [1];\nconst b = [1];\nconsole.log(a == b);",
            "false", "Arrays são objetos. == compara referências, não conteúdo. a e b são objetos distintos na memória.",
            Language.JAVASCRIPT, Difficulty.DIFICIL, List.of("true", "false", "undefined", "Error"));

        // ── SQL FACIL (5 mais) ────────────────────────────────────
        saveOutput("Qual o resultado dessa query SQL?", "SELECT LENGTH('Programacao');",
            "11", "LENGTH() retorna o número de caracteres. 'Programacao' tem 11 caracteres: P-r-o-g-r-a-m-a-c-a-o.",
            Language.SQL, Difficulty.FACIL, List.of("11", "10", "12", "Error"));

        saveOutput("Qual o resultado dessa query SQL?", "SELECT LOWER('HELLO');",
            "hello", "LOWER() converte para minúsculas. 'HELLO' se torna 'hello'.",
            Language.SQL, Difficulty.FACIL, List.of("hello", "HELLO", "Hello", "Error"));

        saveOutput("Qual o resultado dessa query SQL?", "SELECT CONCAT('Hello', ' ', 'World');",
            "Hello World", "CONCAT() une strings. 'Hello' + ' ' + 'World' = 'Hello World'.",
            Language.SQL, Difficulty.FACIL, List.of("Hello World", "HelloWorld", "Hello+World", "Error"));

        saveOutput("Qual o resultado dessa query SQL?", "SELECT ABS(-15);",
            "15", "ABS() retorna o valor absoluto (sem sinal). ABS(-15) = 15.",
            Language.SQL, Difficulty.FACIL, List.of("15", "-15", "0", "Error"));

        saveOutput("Qual o resultado dessa query SQL?", "SELECT MOD(10, 3);",
            "1", "MOD() retorna o resto da divisão. 10 / 3 = 3 com resto 1.",
            Language.SQL, Difficulty.FACIL, List.of("1", "3", "0", "Error"));

        // ── SQL MEDIO (5 mais) ────────────────────────────────────
        saveOutput("Qual o resultado dessa query SQL?", "SELECT COALESCE(NULL, NULL, 'valor');",
            "valor", "COALESCE retorna o primeiro valor não nulo. NULL e NULL são ignorados, retornando 'valor'.",
            Language.SQL, Difficulty.MEDIO, List.of("valor", "NULL", "null", "Error"));

        saveOutput("Qual o resultado dessa query SQL?", "SELECT NULLIF(5, 5);",
            "NULL", "NULLIF retorna NULL quando os dois argumentos são iguais. 5 = 5, então retorna NULL.",
            Language.SQL, Difficulty.MEDIO, List.of("NULL", "5", "0", "Error"));

        saveOutput("Qual o resultado dessa query SQL?",
            "SELECT CASE WHEN 1 > 0 THEN 'Verdadeiro' ELSE 'Falso' END;",
            "Verdadeiro", "1 > 0 é uma condição verdadeira. O CASE avalia o primeiro WHEN verdadeiro e retorna 'Verdadeiro'.",
            Language.SQL, Difficulty.MEDIO, List.of("Verdadeiro", "Falso", "NULL", "Error"));

        saveOutput("Qual o resultado dessa query SQL?", "SELECT LEFT('Programacao', 7);",
            "Program", "LEFT(string, n) retorna os primeiros n caracteres. Os 7 primeiros de 'Programacao' são 'Program'.",
            Language.SQL, Difficulty.MEDIO, List.of("Program", "Programac", "grogram", "Error"));

        saveOutput("Qual o resultado dessa query SQL?", "SELECT REPLACE('Hello Java', 'Java', 'World');",
            "Hello World", "REPLACE(string, de, para) substitui todas as ocorrências. 'Java' é trocado por 'World'.",
            Language.SQL, Difficulty.MEDIO, List.of("Hello World", "Hello Java", "HelloWorld", "Error"));

        // ── SQL DIFICIL (5 mais) ──────────────────────────────────
        saveOutput("Qual o resultado dessa query SQL?", "SELECT FLOOR(4.9);",
            "4", "FLOOR() arredonda para baixo para o inteiro mais próximo. FLOOR(4.9) = 4.",
            Language.SQL, Difficulty.DIFICIL, List.of("4", "5", "4.9", "Error"));

        saveOutput("Qual o resultado dessa query SQL?", "SELECT ROUND(3.456, 1);",
            "3.5", "ROUND(valor, casas) arredonda para 1 casa decimal. O segundo decimal (5) é >= 5, sobe o primeiro: 3.5.",
            Language.SQL, Difficulty.DIFICIL, List.of("3.5", "3.4", "3.46", "Error"));

        saveOutput("Qual o resultado dessa query SQL?", "SELECT POWER(2, 10);",
            "1024", "POWER(base, expoente) calcula a potência. 2^10 = 1024.",
            Language.SQL, Difficulty.DIFICIL, List.of("1024", "20", "512", "Error"));

        saveOutput("Qual o resultado dessa query SQL?", "SELECT GREATEST(5, 8, 3, 12, 1);",
            "12", "GREATEST() retorna o maior valor entre os argumentos. O maior entre 5, 8, 3, 12, 1 é 12.",
            Language.SQL, Difficulty.DIFICIL, List.of("12", "5", "1", "Error"));

        saveOutput("Qual o resultado dessa query SQL?", "SELECT LEAST(5, 8, 3, 12, 1);",
            "1", "LEAST() retorna o menor valor entre os argumentos. O menor entre 5, 8, 3, 12, 1 é 1.",
            Language.SQL, Difficulty.DIFICIL, List.of("1", "3", "5", "Error"));

        log.info("Seeded 72 questões de OUTPUT.");
    }

    private void saveOutput(String title, String code, String correctAnswer,
                             String explanation, Language language, Difficulty difficulty,
                             List<String> options) {
        OutputQuestion q = new OutputQuestion();
        q.setTitle(title);
        q.setCode(code);
        q.setCorrectAnswer(correctAnswer);
        q.setExplanation(explanation);
        q.setLanguage(language);
        q.setDifficulty(difficulty);
        addOptions(q, options);
        questionRepository.save(q);
    }

    private void seedSortCodeQuestions() {
        long count = questionRepository.countByQuestionType("SORT_CODE");
        if (count >= 72) {
            log.info("Sort code questions já populadas (72), pulando seed.");
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

        // ── 1 a mais por combo para chegar em 6 ──────────────────
        saveSortCode("Inverta uma lista Python e imprima o resultado usando slice.",
            "lista[::-1] retorna uma cópia invertida sem modificar a original. O passo -1 percorre de trás para frente.",
            Language.PYTHON, Difficulty.FACIL,
            List.of("lista = [1, 2, 3, 4, 5]", "invertida = lista[::-1]", "print(invertida)"));

        saveSortCode("Use join para criar uma string a partir de uma lista de palavras.",
            "' '.join(iterable) une os elementos com o separador especificado. As palavras devem ser strings.",
            Language.PYTHON, Difficulty.MEDIO,
            List.of("palavras = ['Python', 'e', 'incrivel']", "frase = ' '.join(palavras)", "print(frase)"));

        saveSortCode("Crie um dicionário com a frequência de cada caractere único em 'banana'.",
            "set(texto) elimina duplicatas. Para cada caractere único, count() conta as ocorrências na string original.",
            Language.PYTHON, Difficulty.DIFICIL,
            List.of("texto = \"banana\"", "frequencia = {c: texto.count(c) for c in set(texto)}", "print(frequencia)"));

        saveSortCode("Imprima cada caractere da String 'Java' em uma linha separada.",
            "toCharArray() converte a String em array de char. O for-each itera sobre cada caractere individualmente.",
            Language.JAVA, Difficulty.FACIL,
            List.of("String palavra = \"Java\";", "for (char c : palavra.toCharArray()) {", "    System.out.println(c);", "}"));

        saveSortCode("Crie um HashMap com notas de 3 alunos e imprima o mapa.",
            "put() adiciona pares chave-valor ao HashMap. A ordem de exibição pode variar pois HashMap não garante ordem.",
            Language.JAVA, Difficulty.MEDIO,
            List.of("java.util.HashMap<String, Integer> notas = new java.util.HashMap<>();", "notas.put(\"Ana\", 9);", "notas.put(\"Bruno\", 7);", "notas.put(\"Carlos\", 8);", "System.out.println(notas);"));

        saveSortCode("Use Streams para calcular a soma dos quadrados dos números pares de 1 a 10.",
            "rangeClosed inclui os extremos. filter mantém pares. map transforma cada n em n*n. sum é operação terminal.",
            Language.JAVA, Difficulty.DIFICIL,
            List.of("int soma = java.util.stream.IntStream.rangeClosed(1, 10)", "    .filter(n -> n % 2 == 0)", "    .map(n -> n * n)", "    .sum();", "System.out.println(soma);"));

        saveSortCode("Verifique se uma string está vazia e imprima a mensagem adequada.",
            "String vazia ('') é falsy em JavaScript. O operador ! converte para booleano e nega.",
            Language.JAVASCRIPT, Difficulty.FACIL,
            List.of("const texto = '';", "if (!texto) {", "    console.log('Texto vazio');", "} else {", "    console.log('Tem texto');", "}"));

        saveSortCode("Use async/await para buscar dados simulados e imprimir o nome.",
            "async declara a função assíncrona. await pausa até a Promise resolver. Promise.resolve() retorna Promise já resolvida.",
            Language.JAVASCRIPT, Difficulty.MEDIO,
            List.of("async function buscar() {", "    const dados = await Promise.resolve({ nome: 'Joao' });", "    console.log(dados.nome);", "}", "buscar();"));

        saveSortCode("Implemente memoização para a função de Fibonacci.",
            "memo armazena resultados já calculados. Verificamos 'in memo' antes de calcular evitando redundância exponencial.",
            Language.JAVASCRIPT, Difficulty.DIFICIL,
            List.of("const memo = {};", "function fib(n) {", "    if (n in memo) return memo[n];", "    if (n <= 1) return n;", "    memo[n] = fib(n - 1) + fib(n - 2);", "    return memo[n];", "}", "console.log(fib(10));"));

        saveSortCode("Selecione os 3 produtos mais caros ordenando por preço decrescente.",
            "ORDER BY preco DESC ordena do maior ao menor. LIMIT 3 retorna apenas os 3 primeiros registros.",
            Language.SQL, Difficulty.FACIL,
            List.of("SELECT nome, preco", "FROM produtos", "ORDER BY preco DESC", "LIMIT 3;"));

        saveSortCode("Liste todos os pedidos usando RIGHT JOIN, mesmo sem cliente associado.",
            "RIGHT JOIN mantém todos os registros da tabela direita (pedidos). Clientes sem pedido ficam NULL.",
            Language.SQL, Difficulty.MEDIO,
            List.of("SELECT p.id, p.valor, c.nome", "FROM clientes c", "RIGHT JOIN pedidos p ON c.id = p.cliente_id", "ORDER BY p.id;"));

        saveSortCode("Crie uma CTE recursiva que gera a sequência de 1 a 5.",
            "A cláusula base retorna 1. A recursiva soma 1 até atingir 5. UNION ALL combina os resultados.",
            Language.SQL, Difficulty.DIFICIL,
            List.of("WITH RECURSIVE seq(n) AS (", "    SELECT 1", "    UNION ALL", "    SELECT n + 1 FROM seq WHERE n < 5", ")", "SELECT n FROM seq;"));

        log.info("Seeded 72 questões de SORT_CODE.");
    }

    private void seedCodeCompleteQuestions() {
        long count = questionRepository.countByQuestionType("CODE_COMPLETE");
        if (count >= 72) {
            log.info("Code complete questions já populadas ({}), pulando seed.", count);
            return;
        }
        if (count > 0) {
            questionRepository.deleteAll(questionRepository.findByFilters("CODE_COMPLETE", null, null));
            log.info("Questões CODE_COMPLETE antigas removidas para re-seed.");
        }

        // JavaScript - FACIL
        saveCodeComplete(
            "Complete a função que retorna apenas os números pares de uma lista.",
            "function filtrarPares(lista) {\n  return lista.filter(n =>\n    n % 2 === __\n  )\n}",
            "0",
            "A expressão n % 2 === 0 retorna true para números pares. O operador % é o resto da divisão; números pares têm resto 0 quando divididos por 2.",
            Language.JAVASCRIPT, Difficulty.FACIL,
            List.of("===", "=>", "2", "0", "&&"));

        // JavaScript - MEDIO
        saveCodeComplete(
            "Complete para criar um novo array com cada número multiplicado por 2.",
            "const numeros = [1, 2, 3];\nconst dobrados = numeros.__(n => n * 2);",
            "map",
            "O método map() cria um novo array aplicando a função a cada elemento. filter() seleciona elementos, reduce() acumula um valor, find() retorna o primeiro elemento que satisfaz a condição.",
            Language.JAVASCRIPT, Difficulty.MEDIO,
            List.of("map", "filter", "reduce", "find", "forEach"));

        // JavaScript - DIFICIL
        saveCodeComplete(
            "Complete o reduce para acumular a soma de todos os números do array.",
            "const soma = [1, 2, 3, 4].reduce((acc, n) => {\n  return acc __ n;\n}, 0);",
            "+",
            "O reduce acumula o valor em 'acc'. Para somar usamos acc + n. O valor inicial é 0, portanto: 0+1=1, 1+2=3, 3+3=6, 6+4=10.",
            Language.JAVASCRIPT, Difficulty.DIFICIL,
            List.of("+", "-", "*", "+=", "%"));

        // Python - FACIL
        saveCodeComplete(
            "Complete a list comprehension que retorna apenas os números pares.",
            "numeros = [1, 2, 3, 4, 5]\npares = [n for n in numeros __ n % 2 == 0]",
            "if",
            "Em list comprehensions Python usamos 'if' para filtrar elementos. A sintaxe é: [expressão for item in iterável if condição]. O 'where' não existe em Python.",
            Language.PYTHON, Difficulty.FACIL,
            List.of("if", "while", "and", "where", "when"));

        // Python - MEDIO
        saveCodeComplete(
            "Complete a função que eleva um número ao quadrado.",
            "def quadrado(n):\n  return n __ 2",
            "**",
            "Em Python, o operador ** é o operador de exponenciação. n ** 2 eleva n ao quadrado. O operador ^ é XOR bit a bit, não potência. O // é divisão inteira.",
            Language.PYTHON, Difficulty.MEDIO,
            List.of("**", "*", "^", "//", "%"));

        // Python - DIFICIL
        saveCodeComplete(
            "Complete a função geradora que produz os valores 0, 1 e 2.",
            "def gerar():\n  for i in range(3):\n    __ i",
            "yield",
            "O yield transforma a função em geradora. Diferente de return, yield pausa a execução e retorna o valor ao chamador mantendo o estado para a próxima chamada. A função continua de onde parou na próxima iteração.",
            Language.PYTHON, Difficulty.DIFICIL,
            List.of("yield", "return", "print", "give", "send"));

        // Java - FACIL
        saveCodeComplete(
            "Complete para exibir o número de caracteres da String.",
            "String nome = \"SmartHub\";\nSystem.out.println(nome.__());",
            "length",
            "Em Java, o método length() de String retorna o número de caracteres. Diferente de arrays (onde length é propriedade sem parênteses), strings usam o método length(). \"SmartHub\" tem 8 caracteres.",
            Language.JAVA, Difficulty.FACIL,
            List.of("length", "size", "count", "len", "chars"));

        // Java - MEDIO
        saveCodeComplete(
            "Complete o método que substitui 'Java' por 'Python' na String.",
            "String texto = \"Aprendo Java\";\nSystem.out.println(texto.__(\"Java\", \"Python\"));",
            "replace",
            "O método replace(CharSequence, CharSequence) substitui todas as ocorrências do primeiro argumento pelo segundo. Em Java, Strings são imutáveis, então replace() retorna uma nova String.",
            Language.JAVA, Difficulty.MEDIO,
            List.of("replace", "swap", "change", "substitute", "update"));

        // Java - DIFICIL
        saveCodeComplete(
            "Complete o tipo de retorno correto para um método que soma dois inteiros.",
            "public __ somar(int a, int b) {\n  return a + b;\n}",
            "int",
            "Como a + b soma dois int e o resultado é retornado com return, o tipo deve ser int. void é para métodos sem retorno, boolean para true/false, String para texto. A soma de dois int resulta em int.",
            Language.JAVA, Difficulty.DIFICIL,
            List.of("int", "void", "String", "boolean", "double"));

        // SQL - FACIL
        saveCodeComplete(
            "Complete para selecionar todos os registros da tabela clientes.",
            "__ * FROM clientes;",
            "SELECT",
            "SELECT é o comando SQL para consultar dados. A sintaxe básica é SELECT colunas FROM tabela. O asterisco (*) representa 'todas as colunas'. GET, FETCH e READ não existem no padrão SQL.",
            Language.SQL, Difficulty.FACIL,
            List.of("SELECT", "GET", "FETCH", "SHOW", "READ"));

        // SQL - MEDIO
        saveCodeComplete(
            "Complete para contar funcionários agrupados por departamento.",
            "SELECT departamento, COUNT(*) AS total\nFROM funcionarios\n__ BY departamento;",
            "GROUP",
            "GROUP BY agrupa registros por uma coluna, permitindo funções de agregação como COUNT(), SUM() e AVG() para cada grupo. ORDER BY apenas ordena, não agrupa.",
            Language.SQL, Difficulty.MEDIO,
            List.of("GROUP", "ORDER", "SORT", "HAVING", "CLUSTER"));

        // SQL - DIFICIL
        saveCodeComplete(
            "Complete para filtrar apenas departamentos com mais de 5 funcionários.",
            "SELECT departamento, COUNT(*) AS total\nFROM funcionarios\nGROUP BY departamento\n__ COUNT(*) > 5;",
            "HAVING",
            "HAVING filtra grupos APÓS o agrupamento (GROUP BY). WHERE filtra linhas ANTES do agrupamento e não pode usar funções de agregação. Para filtrar por COUNT(), SUM() ou AVG() use sempre HAVING.",
            Language.SQL, Difficulty.DIFICIL,
            List.of("HAVING", "WHERE", "WHEN", "FILTER", "IF"));

        // ── PYTHON FACIL (5 mais) ─────────────────────────────────
        saveCodeComplete("Complete para obter o comprimento de uma lista.",
            "lista = [1, 2, 3]\nprint(__(lista))", "len",
            "len() retorna o número de elementos de uma lista, string ou outro iterável.",
            Language.PYTHON, Difficulty.FACIL, List.of("len", "size", "count", "length", "total"));

        saveCodeComplete("Complete para gerar uma sequência de 0 a 4.",
            "for i in __(5):\n    print(i)", "range",
            "range(5) gera os inteiros 0, 1, 2, 3, 4. range() é usado com for para repetições com contagem.",
            Language.PYTHON, Difficulty.FACIL, List.of("range", "seq", "iter", "list", "loop"));

        saveCodeComplete("Complete para adicionar um elemento ao final da lista.",
            "numeros = [1, 2, 3]\nnumeros.__(4)\nprint(numeros)", "append",
            "append() adiciona um elemento ao final de uma lista. Para adicionar múltiplos use extend().",
            Language.PYTHON, Difficulty.FACIL, List.of("append", "push", "add", "insert", "extend"));

        saveCodeComplete("Complete para verificar se a chave 'a' existe no dicionário.",
            "d = {'a': 1}\nif 'a' __ d:\n    print('existe')", "in",
            "O operador 'in' verifica se uma chave existe em um dicionário. Também funciona para listas e strings.",
            Language.PYTHON, Difficulty.FACIL, List.of("in", "has", "contains", "==", "exists"));

        saveCodeComplete("Complete para converter a string para minúsculas.",
            "texto = 'PYTHON'\nprint(texto.__())", "lower",
            "lower() converte todos os caracteres para minúsculas. O oposto é upper().",
            Language.PYTHON, Difficulty.FACIL, List.of("lower", "down", "small", "min", "toLower"));

        // ── PYTHON MEDIO (5 mais) ─────────────────────────────────
        saveCodeComplete("Complete para remover espaços do início e do fim da string.",
            "texto = '  python  '\nprint(texto.__())", "strip",
            "strip() remove espaços (e outros whitespace) das extremidades. lstrip() remove só da esquerda, rstrip() só da direita.",
            Language.PYTHON, Difficulty.MEDIO, List.of("strip", "trim", "clean", "remove", "clear"));

        saveCodeComplete("Complete para obter valores únicos de uma lista.",
            "nums = [1, 2, 2, 3, 3]\nunicos = list(__(nums))\nprint(unicos)", "set",
            "set() remove duplicatas criando um conjunto. Convertemos de volta para list com list(). A ordem não é garantida.",
            Language.PYTHON, Difficulty.MEDIO, List.of("set", "unique", "distinct", "filter", "frozenset"));

        saveCodeComplete("Complete para iterar sobre pares (chave, valor) do dicionário.",
            "d = {'a': 1, 'b': 2}\nfor k, v in d.__():\n    print(k, v)", "items",
            "items() retorna pares (chave, valor). keys() retorna apenas chaves, values() apenas valores.",
            Language.PYTHON, Difficulty.MEDIO, List.of("items", "pairs", "entries", "keys", "values"));

        saveCodeComplete("Complete para verificar se todos os elementos satisfazem a condição.",
            "nums = [2, 4, 6, 8]\nresult = __(n % 2 == 0 for n in nums)\nprint(result)", "all",
            "all() retorna True se todos os elementos do iterável são verdadeiros. any() retorna True se pelo menos um é verdadeiro.",
            Language.PYTHON, Difficulty.MEDIO, List.of("all", "any", "every", "filter", "map"));

        saveCodeComplete("Complete a função geradora que produz os quadrados de 0 a n-1.",
            "def quadrados(n):\n    for i in range(n):\n        __ i ** 2", "yield",
            "yield transforma a função em um gerador. Diferente de return, pausa a execução retendo o estado para a próxima chamada.",
            Language.PYTHON, Difficulty.MEDIO, List.of("yield", "return", "print", "give", "produce"));

        // ── PYTHON DIFICIL (5 mais) ───────────────────────────────
        saveCodeComplete("Complete para criar uma cópia superficial da lista.",
            "original = [1, 2, 3]\ncopia = original.__()\ncopia.append(4)\nprint(len(original))", "copy",
            "copy() cria uma cópia superficial. A = B apenas cria outra referência. copy() garante que modificações em 'copia' não afetam 'original'.",
            Language.PYTHON, Difficulty.DIFICIL, List.of("copy", "clone", "duplicate", "list", "slice"));

        saveCodeComplete("Complete para usar isinstance para verificar o tipo do argumento.",
            "def dobrar(x):\n    if __(x, int):\n        return x * 2\n    return str(x)", "isinstance",
            "isinstance(objeto, tipo) verifica se o objeto é uma instância do tipo. Suporta tupla de tipos: isinstance(x, (int, float)).",
            Language.PYTHON, Difficulty.DIFICIL, List.of("isinstance", "type", "istype", "checktype", "isA"));

        saveCodeComplete("Complete para desempacotar a lista ao chamar a função.",
            "def soma(a, b, c):\n    return a + b + c\nnumeros = [1, 2, 3]\nprint(soma(__numeros))", "*",
            "O operador * desempacota um iterável como argumentos posicionais. ** desempacota dicionários como keyword arguments.",
            Language.PYTHON, Difficulty.DIFICIL, List.of("*", "**", "&", "@", "..."));

        saveCodeComplete("Complete para obter o índice e o valor ao iterar.",
            "frutas = ['maca', 'banana', 'laranja']\nfor i, f in __(frutas):\n    print(i, f)", "enumerate",
            "enumerate() retorna pares (índice, valor). É mais pythônico do que usar range(len(lista)) com indexação.",
            Language.PYTHON, Difficulty.DIFICIL, List.of("enumerate", "zip", "indexed", "pairs", "range"));

        saveCodeComplete("Complete o método de classe que não recebe a instância como argumento.",
            "class Util:\n    @__\n    def somar(a, b):\n        return a + b", "staticmethod",
            "@staticmethod define um método estático que não recebe self (instância) nem cls (classe). Útil para funções utilitárias ligadas à classe.",
            Language.PYTHON, Difficulty.DIFICIL, List.of("staticmethod", "classmethod", "property", "abstractmethod", "decorator"));

        // ── JAVA FACIL (5 mais) ───────────────────────────────────
        saveCodeComplete("Complete para converter a string para maiúsculas.",
            "String s = \"java\";\nSystem.out.println(s.__());", "toUpperCase",
            "toUpperCase() retorna nova String com todos os caracteres em maiúsculas. Strings são imutáveis em Java.",
            Language.JAVA, Difficulty.FACIL, List.of("toUpperCase", "upper", "UPPER", "toUpper", "capitalize"));

        saveCodeComplete("Complete o tipo primitivo para armazenar true ou false.",
            "__ resultado = 5 > 3;\nSystem.out.println(resultado);", "boolean",
            "boolean é o tipo primitivo para valores lógicos true/false em Java. Boolean (com B maiúsculo) é o wrapper.",
            Language.JAVA, Difficulty.FACIL, List.of("boolean", "bool", "Boolean", "int", "bit"));

        saveCodeComplete("Complete para acrescentar texto ao StringBuilder.",
            "StringBuilder sb = new StringBuilder(\"Ola\");\nsb.__(\" Mundo\");\nSystem.out.println(sb);", "append",
            "append() adiciona texto ao final do StringBuilder. É mais eficiente que concatenação de Strings em loops.",
            Language.JAVA, Difficulty.FACIL, List.of("append", "add", "concat", "push", "insert"));

        saveCodeComplete("Complete para declarar constante inteira em Java.",
            "__ int MAX = 100;\nSystem.out.println(MAX);", "final",
            "final torna a variável imutável após a inicialização. Combinado com static, cria constantes de classe.",
            Language.JAVA, Difficulty.FACIL, List.of("final", "const", "static", "immutable", "fixed"));

        saveCodeComplete("Complete para imprimir o elemento no índice 2.",
            "int[] arr = {10, 20, 30, 40};\nSystem.out.println(arr[__]);", "2",
            "Arrays em Java são indexados a partir de 0. arr[0]=10, arr[1]=20, arr[2]=30, arr[3]=40.",
            Language.JAVA, Difficulty.FACIL, List.of("2", "3", "1", "0", "4"));

        // ── JAVA MEDIO (5 mais) ───────────────────────────────────
        saveCodeComplete("Complete para comparar o conteúdo de duas Strings.",
            "String a = \"Hello\";\nString b = \"Hello\";\nSystem.out.println(a.__(b));", "equals",
            "equals() compara o conteúdo de Strings. == compara referências. Para Strings, sempre use equals() ou equalsIgnoreCase().",
            Language.JAVA, Difficulty.MEDIO, List.of("equals", "==", "compare", "same", "is"));

        saveCodeComplete("Complete para adicionar elemento a um ArrayList.",
            "java.util.ArrayList<String> lista = new java.util.ArrayList<>();\nlista.__(\"Java\");\nSystem.out.println(lista.size());", "add",
            "add() adiciona elemento ao final do ArrayList. Para inserir em posição específica use add(índice, elemento).",
            Language.JAVA, Difficulty.MEDIO, List.of("add", "push", "append", "insert", "put"));

        saveCodeComplete("Complete para obter o tipo de retorno de método sem valor de retorno.",
            "public __ imprimirOla() {\n    System.out.println(\"Ola!\");\n}", "void",
            "void indica que o método não retorna nenhum valor. Métodos com void não podem usar 'return valor;'.",
            Language.JAVA, Difficulty.MEDIO, List.of("void", "null", "none", "empty", "int"));

        saveCodeComplete("Complete para converter inteiro em String.",
            "int numero = 42;\nString texto = Integer.__(numero);\nSystem.out.println(texto);", "toString",
            "Integer.toString() converte int para String. Alternativas: String.valueOf(numero) ou \"\" + numero.",
            Language.JAVA, Difficulty.MEDIO, List.of("toString", "toStr", "parseString", "stringOf", "convert"));

        saveCodeComplete("Complete para obter o valor de uma chave no HashMap.",
            "java.util.HashMap<String,Integer> m = new java.util.HashMap<>();\nm.put(\"a\", 1);\nSystem.out.println(m.__(\"a\"));", "get",
            "get(chave) retorna o valor associado à chave. Retorna null se a chave não existir. Use getOrDefault() para valor padrão.",
            Language.JAVA, Difficulty.MEDIO, List.of("get", "fetch", "retrieve", "find", "value"));

        // ── JAVA DIFICIL (5 mais) ─────────────────────────────────
        saveCodeComplete("Complete para usar Stream filtrando elementos maiores que 5.",
            "java.util.List<Integer> nums = java.util.Arrays.asList(1, 6, 3, 8);\nnums.stream().__(n -> n > 5).forEach(System.out::println);", "filter",
            "filter() mantém apenas os elementos para os quais o predicado é verdadeiro. A lambda n -> n > 5 é o predicado.",
            Language.JAVA, Difficulty.DIFICIL, List.of("filter", "map", "select", "where", "collect"));

        saveCodeComplete("Complete para lançar exceção com mensagem personalizada.",
            "public void validar(int x) {\n    if (x < 0) {\n        __ new IllegalArgumentException(\"Negativo!\");\n    }\n}", "throw",
            "throw lança uma exceção. throws (na assinatura) declara que o método pode lançar. throw sempre usa 'new ExceptionClass()'.",
            Language.JAVA, Difficulty.DIFICIL, List.of("throw", "throws", "raise", "error", "exception"));

        saveCodeComplete("Complete para retornar valor padrão quando Optional está vazio.",
            "java.util.Optional<String> opt = java.util.Optional.empty();\nString r = opt.__(\"padrão\");\nSystem.out.println(r);", "orElse",
            "orElse() retorna o valor do Optional se presente, ou o argumento caso vazio. orElseGet() aceita um Supplier.",
            Language.JAVA, Difficulty.DIFICIL, List.of("orElse", "getOrDefault", "ifPresent", "get", "defaultValue"));

        saveCodeComplete("Complete para coletar Stream em uma List.",
            "java.util.List<Integer> dobros = java.util.Arrays.asList(1,2,3).stream()\n    .map(n -> n * 2)\n    .__(java.util.stream.Collectors.toList());", "collect",
            "collect() é uma operação terminal que materializa o Stream em uma coleção. Collectors.toList() cria um ArrayList.",
            Language.JAVA, Difficulty.DIFICIL, List.of("collect", "toList", "gather", "reduce", "terminal"));

        saveCodeComplete("Complete o tipo de retorno do método que retorna um número real.",
            "public __ media(int[] nums) {\n    int soma = 0;\n    for (int n : nums) soma += n;\n    return (double) soma / nums.length;\n}", "double",
            "double é o tipo de ponto flutuante de 64 bits em Java. Como retornamos (double) soma / nums.length, o tipo é double.",
            Language.JAVA, Difficulty.DIFICIL, List.of("double", "float", "int", "long", "number"));

        // ── JS FACIL (5 mais) ─────────────────────────────────────
        saveCodeComplete("Complete para declarar variável que não pode ser reatribuída.",
            "__ PI = 3.14;\nconsole.log(PI);", "const",
            "const declara constante: não pode ser reatribuída. let é reatribuível. var tem escopo de função (evite).",
            Language.JAVASCRIPT, Difficulty.FACIL, List.of("const", "let", "var", "final", "fixed"));

        saveCodeComplete("Complete para obter o número de elementos do array.",
            "const frutas = ['maca', 'banana', 'laranja'];\nconsole.log(frutas.__);", "length",
            "length é propriedade (não método) de arrays e strings. Retorna o número de elementos.",
            Language.JAVASCRIPT, Difficulty.FACIL, List.of("length", "size", "count", "len", "total"));

        saveCodeComplete("Complete para converter string em número inteiro.",
            "const s = '42';\nconst n = __(s);\nconsole.log(typeof n);", "parseInt",
            "parseInt() converte string para inteiro. Number() converte para qualquer número. parseFloat() para decimais.",
            Language.JAVASCRIPT, Difficulty.FACIL, List.of("parseInt", "toInt", "Number", "int", "convert"));

        saveCodeComplete("Complete para adicionar elemento no final do array.",
            "const arr = [1, 2, 3];\narr.__(4);\nconsole.log(arr.length);", "push",
            "push() adiciona ao final e retorna o novo length. pop() remove do final. unshift() adiciona ao início.",
            Language.JAVASCRIPT, Difficulty.FACIL, List.of("push", "add", "append", "insert", "put"));

        saveCodeComplete("Complete para verificar se o array contém o valor 2.",
            "const nums = [1, 2, 3];\nconsole.log(nums.__(2));", "includes",
            "includes() retorna true/false verificando a presença do valor. indexOf() retorna o índice (-1 se não encontrado).",
            Language.JAVASCRIPT, Difficulty.FACIL, List.of("includes", "contains", "has", "find", "indexOf"));

        // ── JS MEDIO (5 mais) ─────────────────────────────────────
        saveCodeComplete("Complete para filtrar palavras com mais de 4 letras.",
            "const palavras = ['sol', 'chuva', 'oi', 'vento'];\nconst resultado = palavras.__(p => p.length > 4);", "filter",
            "filter() cria novo array com os elementos que satisfazem o predicado. Não modifica o original.",
            Language.JAVASCRIPT, Difficulty.MEDIO, List.of("filter", "map", "find", "reduce", "forEach"));

        saveCodeComplete("Complete para criar novo array com cada elemento duplicado.",
            "const nums = [1, 2, 3];\nconst dobrados = nums.__(n => n * 2);", "map",
            "map() transforma cada elemento criando novo array do mesmo tamanho. filter() seleciona elementos. forEach() não retorna array.",
            Language.JAVASCRIPT, Difficulty.MEDIO, List.of("map", "filter", "forEach", "reduce", "find"));

        saveCodeComplete("Complete para verificar se algum elemento é negativo.",
            "const nums = [1, -2, 3];\nconsole.log(nums.__(n => n < 0));", "some",
            "some() retorna true se ALGUM elemento satisfaz a condição. every() exige que TODOS satisfaçam.",
            Language.JAVASCRIPT, Difficulty.MEDIO, List.of("some", "any", "find", "includes", "filter"));

        saveCodeComplete("Complete para combinar dois arrays sem modificar os originais.",
            "const a = [1, 2];\nconst b = [3, 4];\nconst c = [...a, ...b];\nconsole.log(c.__()); ", "length",
            "O spread operator (...) espalha elementos. [...a, ...b] cria [1,2,3,4]. length retorna 4.",
            Language.JAVASCRIPT, Difficulty.MEDIO, List.of("length", "size", "count", "total", "push"));

        saveCodeComplete("Complete para desestruturar e renomear a propriedade 'x' para 'posX'.",
            "const ponto = { x: 10, y: 20 };\nconst { x: __, y } = ponto;\nconsole.log(posX);", "posX",
            "Desestruturação com alias: { chave: novoNome }. { x: posX } extrai o valor de 'x' e o atribui à variável 'posX'.",
            Language.JAVASCRIPT, Difficulty.MEDIO, List.of("posX", "x", "ponto.x", "10", "novoX"));

        // ── JS DIFICIL (5 mais) ───────────────────────────────────
        saveCodeComplete("Complete para criar uma Promise que resolve imediatamente.",
            "async function buscar() {\n    const dados = __ Promise.resolve({ nome: 'Joao' });\n    return dados.nome;\n}", "await",
            "await pausa a execução da função async até a Promise resolver. Só pode ser usado dentro de funções async.",
            Language.JAVASCRIPT, Difficulty.DIFICIL, List.of("await", "async", "then", "resolve", "yield"));

        saveCodeComplete("Complete para criar uma função geradora.",
            "function__ contador() {\n    yield 1;\n    yield 2;\n    yield 3;\n}", "*",
            "function* declara um gerador. yield produz valores um por vez. Chamado com .next() para avançar.",
            Language.JAVASCRIPT, Difficulty.DIFICIL, List.of("*", "async", "gen", "generator", "yield"));

        saveCodeComplete("Complete para desestruturar com valor padrão quando propriedade ausente.",
            "const obj = { x: 10 };\nconst { x, y __ 20 } = obj;\nconsole.log(y);", "=",
            "O = após a propriedade define valor padrão na desestruturação. Se 'y' não existe no objeto, usa o padrão 20.",
            Language.JAVASCRIPT, Difficulty.DIFICIL, List.of("=", "||", "??", ":", "=>"));

        saveCodeComplete("Complete para criar um Symbol único identificador.",
            "const id = __(\"identificador\");\nconsole.log(typeof id);", "Symbol",
            "Symbol() cria um valor único primitivo. Dois Symbol com mesma descrição são diferentes: Symbol('a') !== Symbol('a').",
            Language.JAVASCRIPT, Difficulty.DIFICIL, List.of("Symbol", "symbol", "unique", "id", "create"));

        saveCodeComplete("Complete para usar closure retornando contador com estado privado.",
            "function criarContador() {\n    let count = 0;\n    return () => __count;\n}", "++",
            "++count pré-incrementa e retorna o novo valor. count++ retorna o valor antes de incrementar. A closure mantém 'count' privado.",
            Language.JAVASCRIPT, Difficulty.DIFICIL, List.of("++", "--", "+=", "*=", "count +"));

        // ── SQL FACIL (5 mais) ────────────────────────────────────
        saveCodeComplete("Complete para selecionar registros sem duplicatas.",
            "SELECT __ cidade FROM clientes;", "DISTINCT",
            "DISTINCT elimina linhas duplicadas no resultado. Aplicado após SELECT, afeta todas as colunas listadas.",
            Language.SQL, Difficulty.FACIL, List.of("DISTINCT", "UNIQUE", "SINGLE", "DIFFERENT", "ONLY"));

        saveCodeComplete("Complete para ordenar clientes por nome em ordem alfabética.",
            "SELECT nome FROM clientes\n__ BY nome;", "ORDER",
            "ORDER BY ordena o resultado. ASC (padrão) é crescente, DESC é decrescente.",
            Language.SQL, Difficulty.FACIL, List.of("ORDER", "SORT", "ARRANGE", "GROUP", "ORGANIZE"));

        saveCodeComplete("Complete para filtrar preços entre 10 e 50 inclusive.",
            "SELECT * FROM produtos\nWHERE preco __ 10 AND 50;", "BETWEEN",
            "BETWEEN valor1 AND valor2 filtra valores dentro do intervalo fechado [valor1, valor2], incluindo os extremos.",
            Language.SQL, Difficulty.FACIL, List.of("BETWEEN", "IN", "FROM", "RANGE", ">="));

        saveCodeComplete("Complete para buscar clientes cujo nome começa com 'A'.",
            "SELECT * FROM clientes\nWHERE nome __ 'A%';", "LIKE",
            "LIKE com % como wildcard. 'A%' encontra qualquer valor que comece com A seguido de qualquer sequência.",
            Language.SQL, Difficulty.FACIL, List.of("LIKE", "MATCH", "=", "CONTAINS", "STARTS"));

        saveCodeComplete("Complete a função que retorna o menor valor da coluna.",
            "SELECT __(preco) FROM produtos;", "MIN",
            "MIN() retorna o menor valor não nulo de uma coluna. MAX() retorna o maior. Ambas são funções de agregação.",
            Language.SQL, Difficulty.FACIL, List.of("MIN", "MINIMUM", "LOWEST", "FLOOR", "SMALL"));

        // ── SQL MEDIO (5 mais) ────────────────────────────────────
        saveCodeComplete("Complete para juntar mantendo todos da tabela esquerda.",
            "SELECT c.nome, p.valor\nFROM clientes c\n__ JOIN pedidos p ON c.id = p.cliente_id;", "LEFT",
            "LEFT JOIN mantém todos os registros da tabela à esquerda. Onde não há correspondência, colunas da direita ficam NULL.",
            Language.SQL, Difficulty.MEDIO, List.of("LEFT", "INNER", "RIGHT", "FULL", "OUTER"));

        saveCodeComplete("Complete para calcular a média salarial por departamento.",
            "SELECT departamento, __(salario) AS media\nFROM funcionarios\nGROUP BY departamento;", "AVG",
            "AVG() calcula a média aritmética dos valores não nulos de uma coluna numérica.",
            Language.SQL, Difficulty.MEDIO, List.of("AVG", "MEAN", "AVERAGE", "SUM", "COUNT"));

        saveCodeComplete("Complete para buscar emails que contêm '@gmail'.",
            "SELECT * FROM clientes\nWHERE email __ '%@gmail%';", "LIKE",
            "LIKE '%@gmail%' encontra qualquer string que contenha '@gmail' em qualquer posição.",
            Language.SQL, Difficulty.MEDIO, List.of("LIKE", "MATCH", "=", "CONTAINS", "IN"));

        saveCodeComplete("Complete para criar alias para a tabela.",
            "SELECT f.nome FROM funcionarios __ f;", "AS",
            "AS cria um alias para a tabela, permitindo referenciá-la com nome curto. AS é opcional: FROM funcionarios f também funciona.",
            Language.SQL, Difficulty.MEDIO, List.of("AS", "=", "NAMED", "ALIAS", "IS"));

        saveCodeComplete("Complete para selecionar clientes com produto de id 1, 2 ou 3.",
            "SELECT cliente_id FROM pedidos\nWHERE produto_id __ (1, 2, 3);", "IN",
            "IN(lista) é equivalente a múltiplos OR: WHERE produto_id = 1 OR produto_id = 2 OR produto_id = 3.",
            Language.SQL, Difficulty.MEDIO, List.of("IN", "BETWEEN", "LIKE", "=", "ANY"));

        // ── SQL DIFICIL (5 mais) ──────────────────────────────────
        saveCodeComplete("Complete para numerar as linhas por departamento.",
            "SELECT nome, __()\n OVER (PARTITION BY departamento ORDER BY salario DESC) AS rank\nFROM funcionarios;", "ROW_NUMBER",
            "ROW_NUMBER() numera sequencialmente sem empates. RANK() e DENSE_RANK() atribuem mesmo número para empates.",
            Language.SQL, Difficulty.DIFICIL, List.of("ROW_NUMBER", "RANK", "COUNT", "SEQUENCE", "INDEX"));

        saveCodeComplete("Complete para criar tabela temporária reutilizável na query.",
            "__ media_vendas AS (\n    SELECT vendedor, AVG(valor) AS media\n    FROM vendas GROUP BY vendedor\n)\nSELECT * FROM media_vendas;", "WITH",
            "WITH inicia uma CTE (Common Table Expression). Pode-se encadear múltiplas CTEs separadas por vírgula.",
            Language.SQL, Difficulty.DIFICIL, List.of("WITH", "CREATE", "TEMP", "DEFINE", "AS"));

        saveCodeComplete("Complete para retornar o primeiro valor não nulo.",
            "SELECT __(NULL, NULL, 'padrão', 'outro') AS resultado;", "COALESCE",
            "COALESCE percorre os argumentos retornando o primeiro não nulo. Muito útil para valores padrão.",
            Language.SQL, Difficulty.DIFICIL, List.of("COALESCE", "ISNULL", "NVL", "IFNULL", "DEFAULT"));

        saveCodeComplete("Complete para dividir resultados em grupos nas window functions.",
            "SELECT nome, SUM(salario) OVER (__ BY departamento) AS total_depto\nFROM funcionarios;", "PARTITION",
            "PARTITION BY divide as linhas em grupos. A window function é calculada separadamente para cada partição.",
            Language.SQL, Difficulty.DIFICIL, List.of("PARTITION", "GROUP", "DIVIDE", "SPLIT", "CLUSTER"));

        saveCodeComplete("Complete para rankear sem lacunas em empates.",
            "SELECT nome, __()\n OVER (ORDER BY pontuacao DESC) AS posicao\nFROM jogadores;", "DENSE_RANK",
            "DENSE_RANK não deixa lacunas: 1, 1, 2, 3. RANK deixa: 1, 1, 3. ROW_NUMBER sempre único: 1, 2, 3.",
            Language.SQL, Difficulty.DIFICIL, List.of("DENSE_RANK", "RANK", "ROW_NUMBER", "NTILE", "CUME_DIST"));

        log.info("Seeded 72 questões de CODE_COMPLETE.");
    }

    private void saveCodeComplete(String title, String code, String correctAnswer,
                                   String explanation, Language language, Difficulty difficulty,
                                   List<String> options) {
        CodeCompleteQuestion q = new CodeCompleteQuestion();
        q.setTitle(title);
        q.setCode(code);
        q.setCorrectAnswer(correctAnswer);
        q.setExplanation(explanation);
        q.setLanguage(language);
        q.setDifficulty(difficulty);
        addOptions(q, options);
        questionRepository.save(q);
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
