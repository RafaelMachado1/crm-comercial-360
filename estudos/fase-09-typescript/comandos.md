# Fase 09 — Comandos usados

## Criar branch da fase

```bash
git checkout -b feature/fase-09-typescript
```

## Instalar TypeScript e tipos do React

```bash
npm install -D typescript @types/react @types/react-dom
```

## Criar pasta da fase

```bash
mkdir -p estudos/fase-09-typescript
```

## Criar arquivos de estudo

```bash
touch estudos/fase-09-typescript/teoria.md
touch estudos/fase-09-typescript/anotacoes.md
touch estudos/fase-09-typescript/exercicios.md
touch estudos/fase-09-typescript/desafios.md
touch estudos/fase-09-typescript/checklist.md
touch estudos/fase-09-typescript/comandos.md
```

## Rodar projeto

```bash
npm run dev
```

## Verificar erros de TypeScript

```bash
npx tsc --noEmit
```

## Versionamento final da fase

```bash
git add .
git commit -m "refactor: migrate crm project to typescript"
git tag -a v1.0.0 -m "Versão 1.0.0 - CRM React migrado para TypeScript"
git push -u origin feature/fase-09-typescript
git push origin v1.0.0
```

## Merge na main

```bash
git checkout main
git merge feature/fase-09-typescript
git push origin main
```