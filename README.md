# 🔗 Brev.ly - Encurtador de URLs

> **Desafio FTR – Rocketseat**  
> Aplicação completa de encurtamento de URLs com backend robusto e interface moderna.

![Status](https://img.shields.io/badge/Status-Production%20Ready-success)
![Backend](https://img.shields.io/badge/Backend-Node.js%20%2B%20Fastify-blue)
![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-cyan)
![Database](https://img.shields.io/badge/Database-PostgreSQL-316192)
![Storage](https://img.shields.io/badge/CDN-Cloudflare%20R2-orange)

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Arquitetura](#-arquitetura)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Execução](#-instalação-e-execução)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [API Endpoints](#-api-endpoints)
- [Validações Implementadas](#-validações-implementadas)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)

---

## 🎯 Visão Geral

Brev.ly é um encurtador de URLs full-stack que permite criar links personalizados, rastrear acessos e exportar relatórios. A aplicação é dividida em dois módulos principais:

- **Server**: API REST construída com Fastify, PostgreSQL e Cloudflare R2
- **Web**: Interface SPA construída com React, Vite e TailwindCSS

---

## ✨ Funcionalidades

### 🔧 Backend (Server)

- ✅ **Criar links encurtados** com validação robusta
  - Valida formato (alfanuméricos, hífen e underscore)
  - Verifica duplicação
  - Bloqueia palavras reservadas (admin, api, auth, etc.)
- ✅ **Deletar links** cadastrados
- ✅ **Buscar URL original** via link encurtado
- ✅ **Listar todos os links** ordenados por data de criação
- ✅ **Incrementar automaticamente** contagem de acessos
- ✅ **Exportar relatórios CSV** com:
  - Upload para Cloudflare R2 (CDN)
  - Streaming performático (cursor-based)
  - Nome único gerado (UUID + timestamp)
  - Campos: URL original, URL encurtada, acessos, data de criação

### 🎨 Frontend (Web)

- ✅ **Interface responsiva** (mobile-first)
- ✅ **Criar links** com validação em tempo real
- ✅ **Visualizar histórico** de links criados
- ✅ **Copiar links** para área de transferência
- ✅ **Deletar links** com confirmação
- ✅ **Redirecionamento automático** via URL encurtada
- ✅ **Exportar CSV** com loading states
- ✅ **Empty states** e feedback visual
- ✅ **Acessibilidade** (ARIA labels, navegação por teclado)
- ✅ **Notificações toast** para todas as ações

---

## 🏗️ Arquitetura

### Backend (Server)

```
┌─────────────────────────────────────────────────┐
│                   Fastify API                   │
│  (Validação Zod + Swagger + Type Safety)        │
└───────────────────┬─────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
        ▼                       ▼
┌──────────────┐        ┌──────────────┐
│  PostgreSQL  │        │ Cloudflare R2│
│  (Drizzle)   │        │  (S3 SDK)    │
└──────────────┘        └──────────────┘
```

**Padrões utilizados:**
- **Either Pattern** para error handling funcional
- **Repository Pattern** com Drizzle ORM
- **Streaming** para export de CSV performático
- **Cursor-based pagination** para grandes volumes

### Frontend (Web)

```
┌─────────────────────────────────────────────────┐
│              React SPA (Vite)                   │
│  (React Router + Zustand + React Hook Form)     │
└───────────────────┬─────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
        ▼                       ▼
┌──────────────┐        ┌──────────────┐
│  Backend API │        │  Cloudflare  │
│   (Axios)    │        │  R2 (CDN)    │
└──────────────┘        └──────────────┘
```

**Padrões utilizados:**
- **Component-based architecture**
- **Custom Hooks** para lógica reutilizável
- **Zustand** para gerenciamento de estado global
- **Zod** para validação de formulários

---

## 🛠️ Tecnologias

### 🔹 Backend (Server)

| Categoria | Tecnologia | Versão | Uso |
|-----------|-----------|--------|-----|
| **Runtime** | Node.js | 20+ | Ambiente de execução |
| **Framework** | Fastify | ^5.x | Web framework |
| **Linguagem** | TypeScript | ^6.x | Type safety |
| **Database** | PostgreSQL | 14+ | Banco de dados principal |
| **ORM** | Drizzle | ^0.31 | Query builder type-safe |
| **Validação** | Zod | ^4.x | Schema validation |
| **Storage** | AWS SDK S3 | ^3.x | Upload para Cloudflare R2 |
| **CSV** | csv-stringify | ^6.x | Geração de CSV |
| **Doc API** | Swagger | ^9.x | Documentação OpenAPI |

### 🔹 Frontend (Web)

| Categoria | Tecnologia | Versão | Uso |
|-----------|-----------|--------|-----|
| **Biblioteca** | React | ^19.2 | UI library |
| **Build Tool** | Vite | ^7.x | Bundler e dev server |
| **Linguagem** | TypeScript | ^6.x | Type safety |
| **Roteamento** | React Router | ^7.13 | SPA routing |
| **Forms** | React Hook Form | ^7.71 | Gerenciamento de formulários |
| **Validação** | Zod | ^4.x | Schema validation |
| **Estado** | Zustand | ^5.0 | State management |
| **Estilos** | TailwindCSS | ^4.1 | Utility-first CSS |
| **HTTP** | Axios | ^1.13 | Cliente HTTP |
| **Ícones** | Phosphor React | ^1.4 | Biblioteca de ícones |
| **Toast** | React Hot Toast | ^2.6 | Notificações |

---

## 📦 Pré-requisitos

- **Node.js** >= 20.x
- **npm** ou **yarn**
- **PostgreSQL** >= 14.x
- **Conta Cloudflare R2** (para upload de CSV)
- **Git**

---

## 🚀 Instalação e Execução

### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/GustavoFelipe-95/Brev.ly-ftr.git
cd Brev.ly-ftr
```

---

### 2️⃣ Configurar Backend (Server)

```bash
cd server
```

#### Instalar dependências

```bash
npm install
# ou
yarn install
```

#### Configurar variáveis de ambiente

Crie um arquivo `.env` na pasta `server/`:

```env
# Server
PORT=3000

# Database
POSTGRES_USER=seu_usuario
POSTGRES_PASSWORD=sua_senha
POSTGRES_DB=brevly
POSTGRES_PORT=5432
DATABASE_URL=postgresql://seu_usuario:sua_senha@localhost:5432/brevly

# Cloudflare R2
CLOUDFLARE_ACCOUNT_ID=seu_account_id
CLOUDFLARE_ACCESS_KEY_ID=sua_access_key
CLOUDFLARE_SECRET_ACCESS_KEY=sua_secret_key
CLOUDFLARE_BUCKET_NAME=seu_bucket
CLOUDFLARE_PUBLIC_URL=https://seu-dominio.r2.dev
```

#### Executar migrações do banco de dados

```bash
npm run db:migrate
```

#### Iniciar servidor de desenvolvimento

```bash
npm run dev
```

✅ Backend rodando em: **http://localhost:3000**  
📚 Swagger UI: **http://localhost:3000/docs**

---

### 3️⃣ Configurar Frontend (Web)

```bash
cd ../web
```

#### Instalar dependências

```bash
npm install
# ou
yarn install
```

#### Configurar variáveis de ambiente

Crie um arquivo `.env` na pasta `web/`:

```env
VITE_BACKEND_URL=http://localhost:3000
VITE_FRONTEND_URL=http://localhost:5173
VITE_FRONTEND_HOST=localhost:5173
```

#### Iniciar servidor de desenvolvimento

```bash
npm run dev
```

✅ Frontend rodando em: **http://localhost:5173**

---

### 4️⃣ Usando Docker (Opcional)

#### Backend

```bash
cd server
docker-compose up -d
```

#### Frontend

```bash
cd web
docker-compose up -d
```

---

## 📁 Estrutura do Projeto

### Backend (Server)

```
server/
├── src/
│   ├── app/
│   │   └── functions/              # Lógica de negócio
│   │       ├── create-link.ts      # Criar link
│   │       ├── delete-link.ts      # Deletar link
│   │       ├── list-link.ts        # Listar links
│   │       ├── find-one-short-link.ts  # Buscar + incrementar acessos
│   │       ├── export-csv.ts       # Exportar CSV
│   │       ├── errors/             # Erros customizados
│   │       └── utils/
│   │           └── validationShortLink.ts  # Validação
│   ├── infra/
│   │   ├── db/
│   │   │   ├── index.ts            # Conexão DB
│   │   │   ├── migrations/         # Migrações Drizzle
│   │   │   └── schemas/
│   │   │       └── short_links.ts  # Schema da tabela
│   │   ├── http/
│   │   │   ├── server.ts           # Configuração Fastify
│   │   │   └── routes/             # Definição de rotas
│   │   └── storage/
│   │       ├── config-r2-storage.ts  # Config Cloudflare R2
│   │       └── upload.ts           # Upload streaming
│   ├── shared/
│   │   └── either.ts               # Either pattern
│   └── env.ts                      # Validação env vars
├── docker-compose.yml
├── Dockerfile
├── drizzle.config.ts
├── package.json
└── tsconfig.json
```

### Frontend (Web)

```
web/
├── src/
│   ├── components/
│   │   ├── historyLinks/           # Lista de links
│   │   │   ├── index.tsx
│   │   │   ├── card-item.tsx       # Card individual
│   │   │   └── list-empty.tsx      # Empty state
│   │   ├── newLink/
│   │   │   └── index.tsx           # Form criar link
│   │   └── systemUI/               # Componentes base
│   │       ├── custom-button.tsx
│   │       ├── custom-input.tsx
│   │       └── loading/
│   │           └── spinner.tsx
│   ├── pages/
│   │   ├── home.tsx                # Página principal
│   │   ├── redirecting-page.tsx    # Página de redirecionamento
│   │   └── not-found-page.tsx      # 404
│   ├── routes/
│   │   └── index.tsx               # React Router
│   ├── http/
│   │   ├── api.ts                  # Config Axios
│   │   └── shorten-api.ts          # Chamadas API
│   ├── dataStore/
│   │   └── data-store-link.ts      # Zustand store
│   ├── schemas/
│   │   └── newLinkSchema.ts        # Validação Zod
│   ├── interceptor/
│   │   └── short-link-search.ts    # Loader React Router
│   ├── types/
│   │   └── link.ts                 # TypeScript types
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── docker-compose.yml
├── Dockerfile
├── package.json
├── vite.config.ts
└── tailwind.config.ts
```

---

## 🌐 API Endpoints

### Base URL
```
http://localhost:3000
```

### Endpoints Disponíveis

| Método | Endpoint | Descrição | Body | Resposta |
|--------|----------|-----------|------|----------|
| **POST** | `/` | Criar link encurtado | `{ originalURL, shortURL }` | `201` + link criado |
| **GET** | `/` | Listar todos os links | - | `200` + array de links |
| **GET** | `/:code` | Buscar URL original | - | `200` + originalLink |
| **DELETE** | `/:code` | Deletar link | - | `204` No Content |
| **GET** | `/export` | Exportar CSV | - | `200` + URL do arquivo |
| **GET** | `/health` | Health check | - | `200` OK |

### Exemplos de Uso

#### 1. Criar Link

```bash
curl -X POST http://localhost:3000/ \
  -H "Content-Type: application/json" \
  -d '{
    "originalURL": "https://www.rocketseat.com.br",
    "shortURL": "rocketseat"
  }'
```

**Resposta (201):**
```json
{
  "id": "01933c3f-8a2e-7e3a-9e1c-3f8a2e7e3a9e",
  "originalLink": "https://www.rocketseat.com.br",
  "shortenedLink": "rocketseat",
  "accessCount": 0
}
```

#### 2. Buscar Link

```bash
curl http://localhost:3000/rocketseat
```

**Resposta (200):**
```json
{
  "originalLink": "https://www.rocketseat.com.br",
  "accessCount": 1
}
```

#### 3. Listar Links

```bash
curl http://localhost:3000/
```

**Resposta (200):**
```json
{
  "links": [
    {
      "id": "01933c3f-8a2e-7e3a-9e1c-3f8a2e7e3a9e",
      "originalLink": "https://www.rocketseat.com.br",
      "shortenedLink": "rocketseat",
      "accessCount": 5
    }
  ]
}
```

#### 4. Exportar CSV

```bash
curl http://localhost:3000/export
```

**Resposta (200):**
```json
{
  "reportUrl": "https://seu-dominio.r2.dev/reports/550e8400-e29b-41d4-a716-446655440000-short-links-report-1707321600000.csv"
}
```

#### 5. Deletar Link

```bash
curl -X DELETE http://localhost:3000/rocketseat
```

**Resposta (204):** Sem conteúdo

---

## ✅ Validações Implementadas

### Backend
#### Validação de Short URL

```typescript
✅ Tipo: string obrigatória
✅ Tamanho: 3-20 caracteres
✅ Formato: /^[a-zA-Z0-9_-]+$/
✅ Palavras reservadas bloqueadas:
   - admin, api, auth, dashboard, login, register
✅ Verificação de duplicação
```

#### Validação de Original URL

```typescript
✅ Tipo: string obrigatória
✅ Campo não vazio
```

### Frontend
#### Validação de Short URL

```typescript
✅ Tipo: string obrigatória
✅ Tamanho: 3-50 caracteres
✅ Formato: /^[a-zA-Z0-9_-]+$/
✅ Mensagem: "Apenas letras, números, hífens (-) e underscores (_)"
```

#### Validação de Original URL

```typescript
✅ Tipo: string obrigatória
✅ Formato: URL válida (validação com new URL())
✅ Mensagem: "O link deve ser uma URL válida (ex: https://exemplo.com)"
```

---

## 🔐 Variáveis de Ambiente

### Server (.env)

```env
# Porta do servidor
PORT=3000

# PostgreSQL
POSTGRES_USER=postgres
POSTGRES_PASSWORD=senha_forte
POSTGRES_DB=brevly
POSTGRES_PORT=5432
DATABASE_URL=postgresql://postgres:senha_forte@localhost:5432/brevly

# Cloudflare R2 (S3-compatible)
CLOUDFLARE_ACCOUNT_ID=seu_account_id
CLOUDFLARE_ACCESS_KEY_ID=sua_access_key_id
CLOUDFLARE_SECRET_ACCESS_KEY=sua_secret_access_key
CLOUDFLARE_BUCKET_NAME=seu_bucket
CLOUDFLARE_PUBLIC_URL=https://pub-xxxxx.r2.dev
```

### Web (.env)

```env
# Backend API
VITE_BACKEND_URL=http://localhost:3000

# Frontend URLs
VITE_FRONTEND_URL=http://localhost:5173
VITE_FRONTEND_HOST=localhost:5173
```

---

## 🐳 Docker
### Executar com Docker Compose
#### Backend + PostgreSQL

```bash
cd server
docker-compose up -d
```

Serviços disponíveis:
- API: `http://localhost:3000`
- PostgreSQL: `localhost:5432`

#### Frontend

```bash
cd web
docker-compose up -d
```

Serviço disponível:
- Web: `http://localhost:5173`

---

## 📊 Performance

### Backend

- **Cursor-based pagination** para export CSV
- **Streaming** de dados (não carrega tudo na memória)
- **Parallel uploads** para Cloudflare R2
- **Índices de banco de dados** em campos críticos
- **Connection pooling** PostgreSQL

### Frontend

- **Code splitting** automático com Vite
- **Lazy loading** de rotas
- **Debounce** em re-fetching automático
- **Optimistic updates** no estado local

---

## 🎨 Acessibilidade (A11y)

- ✅ Labels ARIA em todos os componentes interativos
- ✅ `aria-live` para atualizações dinâmicas
- ✅ `aria-busy` para estados de loading
- ✅ Navegação por teclado completa
- ✅ Tooltips descritivos (`title`)
- ✅ Contraste de cores WCAG 2.1

---

## 🔒 Segurança

- ✅ Validação de entrada (backend + frontend)
- ✅ Sanitização de nomes de arquivo
- ✅ Proteção contra SQL injection (ORM)
- ✅ CORS configurado
- ✅ Environment variables para credenciais
- ✅ Bloqueio de palavras reservadas

---

## 📝 Licença

Este projeto está sob a licença ISC.

---

## 👨‍💻 Autor

**Gustavo Felipe**  
📧 Email: zegustavo149@gmail.com<br>
🔗 LinkedIn: [Gustavo Melo](www.linkedin.com/in/jgustavofmespindola)<br>
🔗 GitHub: [@GustavoFelipe-95](https://github.com/GustavoFelipe-95)

---

## 🙏 Agradecimentos

- **Rocketseat** pelo desafio FTR
- Comunidade open-source pelas ferramentas incríveis

---

<div align="center">
**⭐ Se este projeto foi útil, considere dar uma estrela!**
</div>
