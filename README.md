<div align="center">
  <img 
    alt="Logo Ignite" 
    title="Ignite" 
    src="https://i.imgur.com/jgM1K5Z.png"
  >

  <br>

  <h2 align="center">
    API REST com NodeJS
  </h2>
</div>
<br>

# FIND A FRIEND API
API desenvolvida para a adoção de animais, a FindAFriend API, utilizando SOLID e testes.

## Regras da aplicação
  - [x] Deve ser possível cadastrar um pet
  - [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
  - [x] Deve ser possível filtrar pets por suas características 
  - [x] Deve ser possível visualizar detalhes de um pet para adoção
  - [x] Deve ser possível se cadastrar como uma ORG
  - [x] Deve ser possível realizar login como uma ORG

## Regras de negócio
  - [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
  - [x] Uma ORG precisa ter um endereço e um número de WhatsApp
  - [x] Um pet deve estar ligado a uma ORG
  - [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
  - [x] Todos os filtros, além da cidade, são opcionais

## Instalação
```sh
# Faça o clone do repotório
  

# Instalar as dependências do projeto
  npm install

# Para iniciar o banco de dados no prisma
  npx prisma init   

# Criar a tiapgem no prisma
  npx prisma generate

# Rodar as migrations do projeto para criar o banco de dados
  npx prisma migrate dev

# Executando o projeto no ambiente de desenvolvimento
  npm run dev
```

## Instalação do banco de dados
```sh
# Subindo o banco de dados com docker
docker compose up -d
```

## Diagrama ERD
<div align="center">
    <img width="70%" alt="Diagrama ERD" src="./prisma/ERD.svg">
</div>

## Rotas
- Criar nova organização
```bash
POST /register
```

- Login na aplicação
```bash
POST /session
```

- Cadastrar um pet
```bash
POST /register/pet
```

- Buscar por um pet
```bash
GET /pet/:id
```

- Listar todos os pets de uma cidade específica
```bash
GET /searchByCity/:city
```

- Filtrar pet por característica e cidade
```bash
GET /search/:city
```

## Testes Unitários
```sh
# Rodando testes unitários
npm run test

# Vendo o coverage de testes
npm run test:coverage
```

## Testes e2e
```sh
# Rodando testes unitários
npm run test:e2e
```
https://efficient-sloth-d85.notion.site/Desafio-03-0b927eb32dbd4f21ab40224ffdf6cf19