# Fase 08 — Comandos usados

## Criar branch da fase

```bash
git checkout -b feature/fase-08-hooks-organizacao
```

## Criar pasta da fase

```bash
mkdir -p estudos/fase-08-hooks-organizacao
```

## Criar arquivos de estudo

```bash
touch estudos/fase-08-hooks-organizacao/teoria.md
touch estudos/fase-08-hooks-organizacao/anotacoes.md
touch estudos/fase-08-hooks-organizacao/exercicios.md
touch estudos/fase-08-hooks-organizacao/desafios.md
touch estudos/fase-08-hooks-organizacao/checklist.md
touch estudos/fase-08-hooks-organizacao/comandos.md
```

## Rodar projeto

```bash
npm run dev
```

## Versionamento final da fase

```bash
git add .
git commit -m "refactor: organize crm architecture and add custom hooks"
git tag -a v0.9.0 -m "Fase 08 concluída - hooks customizados e organização profissional"
git push -u origin feature/fase-08-hooks-organizacao
git push origin v0.9.0
```

## Merge na main

```bash
git checkout main
git merge feature/fase-08-hooks-organizacao
git push origin main
```