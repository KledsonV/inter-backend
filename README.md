# Inter Backend

API backend construída com Node.js, Express e JavaScript para gerenciar estudantes.

## Tecnologias

- Node.js
- TypeScript
- Express
- JWT para autenticação
- dotenv para variáveis de ambiente

## Funcionalidades

- Autenticação e autorização de professores
- Cadastro e gerenciamento de estudantes
- Registro, edição e exclusão de estudantes
- Controle de acesso baseado em usuário
- Endpoints REST para todas as operações

## Estrutura do Projeto

- `/src/routes` — definição das rotas da API
- `/src/controllers` — lógica principal das rotas
- `/src/services` — regras de negócio
- `/src/middlewares` — validação e autenticação
- `/src/utils` — funções auxiliares
- Arquivo `.env` para configuração sensível

## Como usar

1. Clone o repositório
2. Instale as dependências com `npm install`
3. Configure as variáveis de ambiente no arquivo `.env`
4. Rode a aplicação em modo dev: `npm run dev`
5. Use as rotas para interagir com o backend (ex: criar estudante, deletar estudante etc.)

