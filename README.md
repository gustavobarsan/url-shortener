# Projeto de Encurtador de URLs

Este é um projeto de um serviço de encurtamento de URLs desenvolvido com NestJS, PostgreSQL e Docker. Ele permite que usuários encurtem URLs longas, gerenciem suas URLs e redirecionem para a URL original a partir de um código curto.

## Funcionalidades

*   **Encurtamento de URLs**: Converta URLs longas em URLs curtas e amigáveis.
*   **Redirecionamento**: Redirecione usuários da URL curta para a URL original.
*   **Autenticação de Usuários**: Registro e login de usuários usando JWT.
*   **Gerenciamento de URLs por Usuário**: Usuários autenticados podem visualizar, atualizar e excluir suas próprias URLs encurtadas.
*   **Documentação da API**: Gerada automaticamente com Swagger.

## Tecnologias Utilizadas

*   **Backend**: [NestJS](https://nestjs.com/) (Framework Node.js progressivo)
*   **Banco de Dados**: [PostgreSQL](https://www.postgresql.org/)
*   **ORM**: [Prisma](https://www.prisma.io/)
*   **Autenticação**: Passport.js (JWT e Local Strategy)
*   **Validação**: `class-validator`
*   **Documentação API**: [Swagger](https://swagger.io/)
*   **Contêineres**: [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)

## Como Rodar o Projeto com Docker Compose

Siga os passos abaixo para levantar a aplicação e o banco de dados usando Docker Compose.

### Pré-requisitos

Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.

*   [Instalar Docker](https://docs.docker.com/get-docker/)
*   [Instalar Docker Compose](https://docs.docker.com/compose/install/)

### 1. Configuração das Variáveis de Ambiente (`.env`)

O projeto utiliza variáveis de ambiente para configurações sensíveis (como credenciais do banco de dados e segredo JWT).

*   Na raiz do projeto, você encontrará um arquivo `example.env`. Este arquivo serve como um template.
*   **Crie uma cópia** deste arquivo e renomeie-a para `.env`.
*   Abra o arquivo `.env` e preencha os valores conforme suas necessidades.

    ```dotenv
    # Exemplo do conteúdo do seu .env
    POSTGRES_USER=myuser
    POSTGRES_PASSWORD=mypassword
    POSTGRES_DB=mydb
    DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}?schema=public"
    JWT_SECRET=sua_chave_secreta_aqui_para_producao
    BASE_URL=http://localhost:3000
    ```

    **Importante**: Nunca comite seu arquivo `.env` real para o controle de versão (Git), pois ele contém informações sensíveis.

### 2. Migrações do Banco de Dados com Prisma

As migrações do Prisma são aplicadas automaticamente quando o serviço da aplicação (`app`) é iniciado via Docker Compose. O `docker-compose.yml` está configurado para executar `npx prisma migrate deploy` antes de iniciar a aplicação.

Para fins de depuração ou em cenários específicos, você pode precisar rodar as migrações manualmente. Para isso:

Primeiro, certifique-se de que o contêiner do banco de dados está rodando:

```bash
docker-compose up -d db
```

Aguarde alguns segundos para o banco de dados inicializar. Em seguida, execute a migração:

```bash
docker-compose run --rm app npx prisma migrate deploy
```
*   `docker-compose run --rm app`: Executa um comando dentro do serviço `app` e remove o contêiner após a execução.
*   `npx prisma migrate deploy`: Comando do Prisma para aplicar as migrações pendentes no banco de dados.

### 3. Construir e Iniciar a Aplicação

Com o arquivo `.env` configurado, você pode iniciar a aplicação e o banco de dados:

Abra seu terminal no diretório raiz do projeto e execute:

```bash
docker-compose up --build
```

*   O comando `up` iniciará os serviços definidos no `docker-compose.yml`.
*   O flag `--build` garantirá que a imagem Docker da sua aplicação seja construída (ou reconstruída) a partir do `Dockerfile` antes de iniciar o contêiner.

Se você quiser que os contêineres rodem em segundo plano (liberando seu terminal), adicione o flag `-d`:

```bash
docker-compose up -d --build
```

### 4. Acessar a Aplicação

Uma vez que os contêineres estejam rodando, você poderá acessar a aplicação em:

[http://localhost:3000](http://localhost:3000)

### 5. Documentação da API (Swagger)

A documentação interativa da API, gerada pelo Swagger, estará disponível em:

[http://localhost:3000/api](http://localhost:3000/api)

### 6. Parar os Serviços

Para parar todos os serviços e remover os contêineres, redes e volumes anônimos criados pelo Docker Compose:

```bash
docker-compose down
```

Se você também quiser remover os volumes de dados persistentes do PostgreSQL (apagando todos os dados do banco de dados), use:

```bash
docker-compose down --volumes
```
**Cuidado**: Este comando apagará os dados do seu banco de dados.
