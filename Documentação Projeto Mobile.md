# **Documento de Visão e Escopo: aplicativo mobile com foco em gamificação**

**Status:** Proposta de Projeto

**Temática:** Educação Tecnológica

**Orientador:** Antônio Correia de Sá Barreto Neto

ARTHUR ANGELO 

BRENO MONTENEGRO

 DHIEGO FERNANDO 

LUIZ HENRIQUE

PAULISTA  
**2026**

# **Introdução**

O objetivo deste documento é apresentar a proposta de desenvolvimento de um aplicativo que combina programação e gamificação, com foco em promover o aprendizado de usuários interessados em testar e aprimorar seus conhecimentos na área.

No contexto atual, muitas pessoas enfrentam dificuldades para aprender lógica de programação e escrita de código. Para reduzir essa barreira, o aplicativo oferecerá atividades práticas e interativas que permitirão ao usuário aprender de forma contínua, no seu próprio ritmo. Além disso, o uso de elementos de gamificação, como desafios, rastreamento de progresso e progressão por níveis, contribuirá para aumentar o engajamento e a motivação durante o processo de aprendizagem.

A solução será disponibilizada como um aplicativo mobile, com linguagem acessível e uma interface intuitiva, projetada para facilitar a navegação e tornar o processo de aprendizado mais simples, envolvente e eficiente. Dessa forma, o aplicativo busca não apenas ensinar conceitos fundamentais de programação, mas também incentivar a prática constante e o desenvolvimento do raciocínio lógico, essenciais para a formação de novos programadores.

# **Objetivo**

O projeto tem como objetivo principal oferecer uma plataforma mobile de aprendizado em programação que ajude usuários iniciantes a consolidar conhecimentos básicos de forma prática, interativa e progressiva, utilizando elementos de gamificação para tornar o processo mais envolvente.

De forma mais específica, o aplicativo busca:

* Proporcionar uma forma dinâmica de aprendizado, indo além da teoria e incentivando a prática constante.  
* Reforçar conceitos fundamentais de programação por meio de diferentes tipos de atividades interativas.  
* Estimular o raciocínio lógico e a capacidade de resolução de problemas.  
* Melhorar a leitura, interpretação e compreensão de códigos.  
* Ajudar o usuário a identificar erros e entender como corrigi-los.  
* Promover a fixação de conteúdo por meio da repetição prática e feedback imediato.  
* Oferecer uma progressão gradual de dificuldade, respeitando o nível de conhecimento do usuário.  
* Tornar o aprendizado mais atrativo por meio de mecânicas de gamificação, incentivando o engajamento contínuo.

Com isso, o aplicativo pretende funcionar como um complemento ao aprendizado tradicional, permitindo que o usuário pratique e consolide seus conhecimentos de maneira mais leve, acessível e eficiente.

# **Tecnologias Utilizadas**

Para o desenvolvimento do projeto, foram escolhidas tecnologias amplamente utilizadas no mercado, levando em consideração a produtividade da equipe, facilidade de manutenção e escalabilidade da aplicação.

## **Frontend**

O desenvolvimento da interface mobile será realizado com o React Native. A escolha se deve à sua capacidade de permitir o desenvolvimento multiplataforma (Android e iOS) com uma única base de código, reduzindo tempo e esforço de implementação. Além disso, o React Native possui uma grande comunidade, vasta documentação e facilita a criação de interfaces dinâmicas e responsivas, o que é essencial para uma aplicação com foco em interatividade.

## **Backend**

O backend será desenvolvido utilizando o Spring Boot, um framework baseado em Java que simplifica a criação de aplicações robustas e escaláveis. A escolha foi motivada pelo conhecimento prévio da equipe com a linguagem Java, além da facilidade que o Spring Boot oferece na configuração de APIs REST, integração com bancos de dados e organização da arquitetura do sistema.

## **Banco de Dados**

Para persistência dos dados, será utilizado o Supabase, que utiliza PostgreSQL como banco de dados relacional. A escolha se deve à praticidade oferecida pela plataforma, que disponibiliza uma infraestrutura pronta, com recursos como autenticação, APIs automáticas e fácil integração com o backend.

## **Conteinerização**

Será utilizado o Docker para conteinerização da aplicação. Essa abordagem permite padronizar o ambiente de desenvolvimento e execução, facilitando a configuração do projeto, a escalabilidade e o deploy em diferentes ambientes. Com o uso de containers, é possível garantir maior consistência entre desenvolvimento, testes e produção.

# **Integração de Componentes do Celular**

**1 \- Câmera (Imagem):**

A funcionalidade de validação de código por imagem consiste na integração da câmera do dispositivo móvel com um serviço de inteligência artificial para interpretação automática de código-fonte. Nesse fluxo, o aplicativo propõe um desafio de programação ao usuário, que desenvolve a solução em um ambiente externo. Em seguida, o usuário utiliza a câmera do app para capturar uma imagem da solução. Essa imagem é enviada a uma API baseada em modelo multimodal (como o Gemini), responsável por realizar o reconhecimento do conteúdo e interpretar semanticamente o código identificado.

Após o processamento, o sistema compara a solução capturada com os critérios esperados do desafio, validando aspectos como estrutura, sintaxe e lógica. Com base nessa análise, o aplicativo fornece feedback imediato ao usuário, indicando acertos, possíveis erros e sugestões de melhoria. Essa abordagem permite uma experiência de aprendizagem mais flexível e interativa, incentivando a prática fora do ambiente digital tradicional, ao mesmo tempo em que mantém a avaliação automatizada e integrada ao sistema de gamificação do aplicativo.

**2 \- Áudio (feedback sonoro):**

A funcionalidade de feedback por áudio consiste na utilização de recursos sonoros para reforçar a interação do usuário com o aplicativo durante a realização das atividades. A cada ação executada, como o envio de uma resposta ou a conclusão de um desafio, o sistema emite sinais auditivos distintos que indicam acertos, erros ou progresso na tarefa. Sons positivos são utilizados para reforçar respostas corretas e avanços, enquanto sinais diferenciados alertam sobre inconsistências ou falhas na solução apresentada.

**Módulo 1: Quiz Interativo**

A funcionalidade de Quiz Interativo tem como objetivo avaliar e reforçar o conhecimento teórico do usuário por meio de perguntas de múltipla escolha. Diferente das atividades práticas de escrita ou reconstrução de código, este módulo foca na fixação de conceitos, sintaxe e boas práticas de programação de forma dinâmica e objetiva.

A ideia é estimular o usuário a lembrar dos conceitos, reconhecer padrões com mais facilidade e ganhar agilidade na hora de escolher a resposta certa, ajudando a fixar bem a base antes de partir pra prática.

## **Funcionamento Geral**  	**Cada atividade apresenta:**

* Uma pergunta objetiva relacionada a conceitos de programação.  
* Quatro alternativas de resposta (múltipla escolha).  
* Apenas uma resposta correta.  
* Feedback imediato após a seleção da resposta.

As perguntas serão armazenadas em um banco de dados e organizadas por linguagem de programação e nível de dificuldade. O usuário poderá selecionar ou ser direcionado a quizzes específicos com base no seu progresso.

## **Estrutura dos Quizzes**

* Linguagens contempladas:  
  * Java  
  * JavaScript  
  * Python  
  * SQL  
* Níveis de dificuldade:  
  * Fácil: conceitos básicos e introdutórios.  
  * Médio: aplicação de conceitos e interpretação de código.  
  * Difícil: questões mais complexas envolvendo lógica e detalhes avançados.

## **Objetivos de Aprendizagem**

* Reforçar conceitos teóricos fundamentais de programação.  
* Estimular o raciocínio lógico e a tomada de decisão.  
* Identificar lacunas no conhecimento do usuário.  
* Preparar o usuário para atividades práticas mais complexas.

Este módulo será composto por um conjunto extenso de perguntas distribuídas entre as linguagens e níveis propostos, permitindo uma experiência progressiva e adaptativa. Além de indicar se a resposta está correta ou incorreta, o sistema fornecerá uma explicação detalhada, ajudando o usuário a compreender o motivo da resposta correta e aprender com seus erros.

**Módulo 2: Atividade de Completar Código**  
	  
A funcionalidade de Completar Código tem como objetivo reforçar o aprendizado prático do usuário por meio da reconstrução parcial de trechos de código. Nessa atividade, o usuário recebe um código incompleto e deve preencher corretamente os espaços em branco, aplicando conceitos previamente estudados.

A proposta é estimular o raciocínio lógico, a leitura de código e a fixação de sintaxe, sem exigir a escrita completa de uma solução do zero.

## **Funcionamento Geral**

	Cada atividade apresenta:

* Um trecho de código com lacunas (placeholders).  
* Um breve contexto explicando o objetivo do código.  
* Campos para preenchimento (input do usuário).

O usuário deve completar corretamente os trechos faltantes para que o código funcione como esperado.

##  **Objetivos de Aprendizagem**

* Reforçar conceitos fundamentais de programação.  
* Melhorar a leitura e interpretação de código.  
* Fixar padrões de sintaxe.  
* Desenvolver atenção a detalhes.

Este módulo será composto por cerca de 6 atividades que visam o aperfeiçoamento dos conhecimentos do usuário em conceitos básicos de programação, bem como deve testar o olhar analítico do indivíduo com algoritmos reais. Porém, é importante visar que, além de especificar os erros cometidos, o sistema terá a capacidade de fornecer a correção para o usuário.

		**Módulo 3: Atividade de acertar**

**o output**

A funcionalidade do módulo do Output tem como objetivo desenvolver a capacidade do usuário de ler, interpretar e simular mentalmente a execução de trechos de código. Nessa atividade, o usuário recebe um código completo e funcional e deve identificar, entre quatro alternativas, qual seria o resultado exibido na tela ao executar aquele programa.

A proposta é estimular a leitura atenta de código, o entendimento do fluxo de execução e o domínio de operadores, estruturas de controle e manipulação de dados, habilidades essenciais para qualquer programador.

**Funcionamento Geral**

Cada atividade apresenta:

* Um trecho de código completo e funcional.  
* Quatro alternativas de output (apenas uma correta).  
* Um temporizador.  
* Feedback imediato após a seleção da resposta, com explicação detalhada do fluxo de execução do código.

**Objetivos de Aprendizagem**

* Desenvolver a habilidade de leitura e interpretação de código.  
* Exercitar a simulação mental da execução de programas.  
* Reforçar o entendimento de diversas estruturas  
* Estimular a agilidade no raciocínio lógico sob pressão de tempo.  
* Preparar o usuário para situações reais de análise e debugging de código.

Este módulo será composto por questões organizadas por linguagem de programação e nível de dificuldade, seguindo a mesma estrutura dos demais módulos. Além de indicar se a resposta está correta ou incorreta, o sistema fornecerá uma explicação da execução do código, permitindo que o usuário compreenda exatamente como o programa chegou àquele resultado.

**Módulo 4: Linhas de códigos embaralhados** 

A funcionalidade do módulo de Código Embaralhado tem como objetivo desenvolver a capacidade do usuário de compreender a estrutura lógica de um programa por meio da organização correta de trechos de código. Nessa atividade, o usuário recebe linhas ou blocos de código apresentados fora de ordem e deve organizá-los corretamente para formar um algoritmo funcional e coerente. A proposta é estimular o raciocínio lógico, o entendimento da sequência de execução e a construção mental de fluxos de programação, habilidades fundamentais para quem está aprendendo ou deseja evoluir na área de desenvolvimento de software.

**Funcionamento Geral**

Cada atividade apresenta:

* Um conjunto de linhas ou blocos de código embaralhados.  
* Uma interface interativa que permite ao usuário arrastar e soltar os trechos na ordem desejada.  
* Um contexto ou descrição do que o código deve realizar.  
*  Um temporizador para desafiar o tempo de resposta do usuário.  
*  Feedback imediato após a submissão, indicando se a sequência está correta ou não, acompanhado de uma explicação detalhada da lógica correta.

**Objetivos de Aprendizagem**

* Desenvolver a habilidade de estruturar logicamente um programa.  
* Compreender a ordem de execução de instruções e dependência entre linhas de código.  
* Exercitar o pensamento algorítmico e a resolução de problemas.  
* Reforçar o entendimento de estruturas de controle, funções e manipulação de dados.  
* Estimular o raciocínio sob pressão de tempo em um ambiente gamificado.  
* Preparar o usuário para situações reais de desenvolvimento, como escrita de código do zero e refatoração.

Este módulo faz parte de um aplicativo de programação gamificado, onde o usuário avança resolvendo desafios. As atividades são organizadas por linguagem e nível de dificuldade, permitindo evolução gradual. Ao acertar, o usuário progride para o próximo exercício, ganha pontos e desbloqueia novos níveis.	