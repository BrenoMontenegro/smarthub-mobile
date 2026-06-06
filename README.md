# 📖 Sobre o Projeto

O **SmartHub** é uma plataforma mobile voltada ao ensino de programação através de gamificação, inspirada em experiências modernas de aprendizado como o Duolingo.

O projeto utiliza:

* **React Native** no desenvolvimento mobile
* **Spring Boot (Java)** no backend
* Integração com **API Gemini** para recursos inteligentes
* Feedback interativo por áudio
* Sistema de desafios progressivos e aprendizado prático

A proposta da aplicação é tornar o aprendizado de lógica e programação mais acessível, dinâmico e motivador, utilizando elementos de jogos como:

* Sistema de níveis
* Missões e desafios
* Feedback instantâneo
* Progressão de aprendizado
* Recompensas e conquistas
* Correção inteligente de código

---

# 🏗️ Arquitetura do Projeto

## Frontend Mobile

Tecnologias utilizadas:

* React Native
* TypeScript
* React Navigation
* Context API / gerenciamento de estado
* Expo (caso utilizado)

Responsabilidades:

* Interface mobile
* Sistema gamificado
* Execução dos exercícios
* Captura de câmera
* Reprodução de áudio
* Comunicação com API backend

---

## Backend

Tecnologias utilizadas:

* Java
* Spring Boot
* Spring Web
* Spring Security
* JPA/Hibernate
* Banco de dados relacional

Responsabilidades:

* Gerenciamento de usuários
* Controle de progresso
* Sistema de desafios
* Integração com IA
* Processamento de respostas
* APIs REST

---

# 🎮 Funcionalidades Principais

## ✅ Sistema Gamificado

A plataforma possui mecânicas inspiradas em jogos para aumentar o engajamento do usuário:

* XP por atividade concluída
* Sistema de vidas/tentativas
* Níveis de dificuldade
* Trilhas de aprendizado
* Conquistas e badges
* Sequência diária de estudos

---

## 💻 Exercícios de Programação

Os usuários podem resolver desafios de programação diretamente no aplicativo.

Exemplos:

* Lógica de programação
* Estruturas condicionais
* Laços de repetição
* Funções
* Algoritmos básicos
* Sintaxe de linguagens

O sistema fornece correção e feedback imediato para reforçar o aprendizado.

---

# 🎤 Feedback por Áudio

Uma das funcionalidades centrais da plataforma é o sistema de feedback em áudio.

## Objetivo

Melhorar a experiência do usuário através de respostas mais interativas e acessíveis.

## Funcionalidades

* Reprodução de feedback positivo ou corretivo
* Narração de explicações
* Incentivo durante os desafios
* Respostas auditivas em tempo real

## Exemplos de Uso

* Quando o usuário acerta um desafio
* Quando o usuário comete erros
* Durante explicações de conceitos
* Em dicas automáticas da plataforma

## Benefícios

* Maior imersão
* Aprendizado mais dinâmico
* Melhor acessibilidade
* Engajamento semelhante a aplicativos educacionais modernos

---

# Integração com API Gemini

A aplicação utiliza a API Gemini para recursos inteligentes relacionados à análise de código e interpretação de imagens.

---

## Acesso à Câmera

O aplicativo permite utilizar a câmera do dispositivo para capturar códigos escritos ou exercícios.

### Funcionalidades

* Captura de imagens de códigos
* Upload automático para análise
* Leitura de trechos de programação
* Interpretação via IA

---

## Análise Inteligente de Código

Após a captura da imagem, a API Gemini é utilizada para:

* Interpretar o código enviado
* Identificar erros de sintaxe
* Detectar problemas lógicos
* Gerar feedback automático
* Explicar conceitos de programação
* Sugerir melhorias

---

## 🔄 Fluxo da Funcionalidade

1. Usuário captura imagem do código
2. React Native envia imagem ao backend
3. Backend processa a requisição
4. API Gemini realiza análise
5. Resultado é retornado ao aplicativo
6. Usuário recebe feedback textual e/ou em áudio

---

# 🔐 Segurança

O backend utiliza práticas modernas de segurança:

* Autenticação de usuários
* Proteção de rotas
* Validação de requisições
* Controle de acesso
* Tratamento de exceções

---

# Estrutura de Telas

Exemplos de telas da aplicação:

* Login e Cadastro
* Home gamificada
* Lista de desafios
* Ranking de usuários
* Perfil e progresso
* Tela de câmera
* Tela de feedback da IA

---

# 🔌 Integrações

## API Gemini

Responsável por:

* Interpretação de imagens
* Análise de código
* Feedback inteligente
* Explicações automáticas

---

# 🚀 Objetivos do Projeto

O projeto busca:

* Tornar o ensino de programação mais acessível
* Utilizar IA para apoio educacional
* Melhorar o engajamento através de gamificação
* Criar uma experiência prática e interativa
* Incentivar o aprendizado contínuo

---

# 👨‍💻 Tecnologias Utilizadas

## Frontend

* React Native
* TypeScript
* React Navigation
* Expo

## Backend

* Java
* Spring Boot
* Spring Security
* JPA/Hibernate

## Inteligência Artificial

* Google Gemini API

---

# 📌 Status do Projeto

🚧 Projeto em desenvolvimento.

---

# 📄 Licença

Este projeto possui finalidade educacional e acadêmica.

---

# Link para o Figma

Nesta seção, está disponível o link do design inicial pensado e construído na plataforma do Figma. Acesse o link abaixo:

Figma: https://www.figma.com/design/9iclWjHgcIa4MdzScwuOtj/SmartHub---app-project?node-id=0-1&t=THdj5dfVxpA2QyCK-1
