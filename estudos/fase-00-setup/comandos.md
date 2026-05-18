# Fase 00 — Comandos usados

## Criar projeto React com Vite

```bash
npm create vite@latest crm-comercial-360 -- --template react
```

## Entrar na pasta do projeto

```bash
cd crm-comercial-360
```

## Instalar dependências

```bash
npm install
```

## Rodar o projeto localmente

```bash
npm run dev
```

## Criar pastas iniciais

```bash
mkdir -p docs
mkdir -p estudos/fase-00-setup
mkdir -p src/components
mkdir -p src/pages
mkdir -p src/assets
mkdir -p src/styles
mkdir -p src/utils
mkdir -p src/data
```

## Criar arquivos de estudo da Fase 00

```bash
touch estudos/fase-00-setup/teoria.md
touch estudos/fase-00-setup/anotacoes.md
touch estudos/fase-00-setup/checklist.md
touch estudos/fase-00-setup/comandos.md
```

## Rodar Git

```bash
git status
git add .
git commit -m "chore: setup react crm project with vite"
git tag -a v0.1.0 -m "Fase 00 concluída - setup inicial do projeto"
git push
git push origin v0.1.0
```