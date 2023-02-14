
# Raise Tree

O intuito do Raise Tree é ser um novo ciclo nas escolas. Ele é um gerenciador de tarefas escolares que reúne coisas e atividades que na maioria das vezes são feitas em diferentes lugares pelos professores, estudantes e coordenadores/diretores, e junta essas coisa em somente um lugar, economizando tempo e espaço.
O intuito das ferramentas desenvolvidas, e as que vier a serem desenvolvidas, é facilitar a vida de quem estiver usando.



## Documentação

[Documentação](https://raisetree-backend-production.up.railway.app/api-docs/)


## Stack utilizada

Node, Express, Typescript, Prisma, PostgreSQL, Redis


## Funcionalidades

- Admin
    - Adicionar estudantes/professores
    - Visualizar atividades criadas pelos professores
- Professores
    - Criar atividades
    - Visualizar respostas dos alunos e responde-lós
    - Criar rascunhos
    - Visualizar estudantes por sala e suas informações como: frequência, pontos e quais atividades eles responderão
    - Anotar frequência para os estudantes
- Estudantes
    - Responder atividades dos professores

## Roadmap

- Adicionar algumas integrações. Ex: os professores usarem o ChatGPT para os auxiliarem em novas ideias de atividades
- Aulas ao vivo
- Notificações
- Comunidades. Ex: por sala, por ano(primeira serie, segunda serie...), por escola, apenas de admins, apenas dos professores...
- Calendario escolar
- Para os professores, ter um "explore" com a visualizao de atividades que outros professores criarao

## Melhorias

- Usar algumas queries no SQL pura para melhorar a performance de algumas consultas
- Usar uma arquitetura mais profissional
## Apêndice

O envio de email, é feito pela [API do Gmail](#Referência).

## Referência

 - [Exemplo de como o envio de email é feito](https://www.youtube.com/watch?v=-rcRf7yswfM)


## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

```bash
PORT=
URL_SERVER_IS_RUNNING=(usado apenas em produção)
NODE_ENV=

ACTIVE_TOKEN_SECRET=
ACTIVE_TEACHER_TOKEN_SECRET=
ACCESS_TOKEN_SECRET=

BASE_URL=

MAIL_CLIENT_ID=
MAIL_CLIENT_SECRET=
MAIL_REFRESH_TOKEN=
SENDER_EMAIL_ADDRESS=

CLIENT_EMAIL_GOOGLE_SHEETS=
PRIVATE_KEY_GOOGLE_SHEETS=

DATABASE_DRIVER=
DATABASE_HOST=
DATABASE_PORT=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_NAME=

REDISHOST=
REDISPORT=
REDISPASSWORD=

DATABASE_URL="${DATABASE_DRIVER}://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}?schema=public"
```
## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/luucassjooao/RaiseTree-Backend
```

Entre no diretório do projeto

```bash
  cd RaiseTree-Backend
```

Instale as dependências

```bash
  yarn
```

Inicie um container docker com o docker-compose

```bash
  docker compose up
```

Rode as migrations

```bash
  npx prisma migrate dev
```

Inicie o servidor

```bash
  yarn dev
```


## Autores

- [@luucassjooao](https://www.github.com/luucassjooao)

