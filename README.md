API de Cadastro de Alunos

Esta é uma API de cadastro de alunos que permite realizar operações CRUD (Create, Read, Update, Delete) em registros de alunos. Ela é construída em Node.js e utiliza um banco de dados MySQL para armazenar os dados dos alunos.
Configuração do Projeto

Para executar este projeto em seu ambiente local, siga estas etapas:
1. Configuração do .env

Certifique-se de criar um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente:

        PORT= ( Porta em que o projeto vai rodar - BackEnd )
        PORT_CORS= ( Porta em que o projeto vai rodar - FrontEnd )
        DBNAME= ( Nome do banco de dados )
        DBUSER= ( Usuario do banco de dados - O padrão é root )
        DBPASSWORD= ( Senha do banco de dados )
        DATABASE_HOST= ( Host do banco de dados - O padrão é localhost )
        DATABASE_PORT=3306 ( Porta do banco de dados - O padrão é 3306)
        PATH_IMAGE_FRONTEND= ( Diretorio onde ira ficar as imagens )
        TOKEN= ( Gere um token para utilização de um modulo - Obs: não precisa lembrar depois )

Certifique-se de preencher as informações do banco de dados com as configurações apropriadas.
2. Instalação de Dependências

No terminal, navegue até a pasta raiz do projeto e execute o seguinte comando para instalar todas as dependências necessárias:

        npm install

3. Inicialização do Servidor

Após instalar as dependências, você pode iniciar o servidor com o seguinte comando:

        npm start

Isso iniciará o servidor na porta especificada no arquivo .env (por padrão, 3001).

Uso da API

Esta API oferece os seguintes endpoints:

// Users
        POST /login: Entra no sistema.
        POST /user: Realiza o cadastro de um usuario para acessar o sistema.
        GET /verify-token: Realiza a verificação de um token ( Rota " Inútil " ).

// Students
        GET /aluno: Retorna a lista de todos os alunos cadastrados.
        GET /consultar/:id: Retorna os detalhes de um aluno específico com base no ID.
        POST /registrar: Cria um novo aluno com os dados fornecidos.
        PUT /consultar/:id: Atualiza os dados de um aluno com base no ID.
        DELETE /aluno/:id: Exclui um aluno com base no ID.

Certifique-se de usar um software de teste de API, como o Postman ou o Insomnia, para interagir com a API.