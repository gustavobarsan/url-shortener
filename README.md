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

### 2. Rodar Migrações do Prisma (Opcional, mas Recomendado)

Se você estiver iniciando o banco de dados pela primeira vez ou se houver alterações no seu `schema.prisma`, você precisará aplicar as migrações. O Docker Compose irá subir o serviço do banco de dados, mas as tabelas ainda não estarão criadas.

Você pode rodar as migrações dentro do contêiner da sua aplicação. Primeiro, certifique-se de que o contêiner do banco de dados está rodando:

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

Com o arquivo `.env` configurado e as migrações aplicadas (se necessário), você pode iniciar a aplicação e o banco de dados:

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

Uma vez que os contêineres estejam rodando, você poderá acessar a aplicação NestJS em:

[http://localhost:3000](http://localhost:3000)

### 5. Documentação da API (Swagger)

A documentação interativa da API, gerada pelo Swagger, estará disponível em:

[http://localhost:3000/api](http://localhost:3000/api) (ou a rota que você configurou para o Swagger)

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

---

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
