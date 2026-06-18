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
        if (questionRepository.count() > 0) {
            log.info("Questions já populadas, pulando seed.");
            return;
        }

        seedQuizQuestions();
        seedOutputQuestions();
        seedSortCodeQuestions();
        seedCodeCompleteQuestions();

        log.info("Seed de questions concluído.");
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
        SortCodeQuestion s1 = new SortCodeQuestion();
        s1.setObjective("Monte um loop que soma todos os elementos de uma lista e imprime o resultado.");
        s1.setLanguage(Language.PYTHON);
        s1.setDifficulty(Difficulty.FACIL);
        addSortLines(s1, List.of("soma = 0", "for n in lista:", "    soma += n", "print(soma)"));
        questionRepository.save(s1);

        SortCodeQuestion s2 = new SortCodeQuestion();
        s2.setObjective("Crie uma função que verifica se um número é par e retorna o resultado.");
        s2.setLanguage(Language.PYTHON);
        s2.setDifficulty(Difficulty.FACIL);
        addSortLines(s2, List.of("def eh_par(n):", "    if n % 2 == 0:", "        return True", "    return False"));
        questionRepository.save(s2);

        SortCodeQuestion s3 = new SortCodeQuestion();
        s3.setObjective("Monte um código que lê uma lista e imprime apenas os valores maiores que 10.");
        s3.setLanguage(Language.PYTHON);
        s3.setDifficulty(Difficulty.MEDIO);
        addSortLines(s3, List.of("lista = [5, 12, 3, 18, 7]", "for item in lista:", "    if item > 10:", "        print(item)"));
        questionRepository.save(s3);

        log.info("Seeded 3 questões de SORT_CODE.");
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
