# Racha Contas

Divisor de despesas domésticas para duas pessoas. Construído com Next.js, TypeScript, Tailwind CSS e SQLite.

## Início rápido — Docker (recomendado)

**Requisito:** [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Windows/Mac) ou Docker Engine + Docker Compose (Linux).

```bash
git clone <url-do-repo> racha-contas
cd racha-contas
docker compose up --build
```

Abra **http://localhost:3000** no navegador.

O banco de dados fica em `./data/expenses.db` na sua máquina e persiste entre reinicializações.

**Próximas vezes** (imagem já construída):
```bash
docker compose up
```

**Parar:**
```bash
docker compose down
```

---

## Início manual — sem Docker

**Requisitos:**
- Node.js 20 ou 22
- Ferramentas de compilação nativas para o `better-sqlite3`:
  - **Linux:** `python3`, `make`, `g++` (geralmente pré-instalados)
  - **macOS:** Xcode Command Line Tools (`xcode-select --install`)
  - **Windows:** [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) (selecionar "Desktop development with C++")

```bash
git clone <url-do-repo> racha-contas
cd racha-contas
npm install
npm run build
npm start
```

Para desenvolvimento com hot reload:
```bash
npm run dev
```

Acesso pela rede local (celular, outro computador):
```bash
npm start -- -H 0.0.0.0
```

---

## Dados e backup

- Banco de dados: `./data/expenses.db` (SQLite, arquivo único)
- Para fazer backup: copie `./data/expenses.db` para outro local
- Os arquivos `.db-shm` e `.db-wal` são auxiliares do modo WAL — se o app estiver rodando, copie os três juntos; se estiver parado, só `expenses.db` já basta

## Solução de problemas

**Erro de porta ocupada**
Mude a porta no `docker-compose.yml` (`"3001:3000"`) ou use `npm start -- -p 3001`.

**Erro de módulo nativo após trocar versão do Node.js**
Recompile o `better-sqlite3` com `npm install`.
