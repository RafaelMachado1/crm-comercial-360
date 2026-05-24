# Fase 10 — Comandos usados

## Criar branch da fase

```bash
git checkout -b feature/fase-10-ecosistema
```

## Criar pasta da fase

```bash
mkdir -p estudos/fase-10-ecosistema
```

## Criar arquivos de estudo

```bash
touch estudos/fase-10-ecosistema/teoria.md
touch estudos/fase-10-ecosistema/anotacoes.md
touch estudos/fase-10-ecosistema/exercicios.md
touch estudos/fase-10-ecosistema/desafios.md
touch estudos/fase-10-ecosistema/checklist.md
touch estudos/fase-10-ecosistema/comandos.md
```

## Bibliotecas previstas na fase

```bash
npm install react-hook-form zod @hookform/resolvers
npm install axios
npm install @tanstack/react-query
npm install zustand
npm install recharts
npm install @tanstack/react-table
npm install date-fns
```

## Observação importante

As bibliotecas acima não serão instaladas todas de uma vez.

Vamos instalar cada uma somente quando chegar o momento de aplicar no projeto.

## Rodar projeto

```bash
npm run dev
```

## Verificar TypeScript

```bash
npx tsc --noEmit
```

## Versionamento final da fase

```bash
git add .
git commit -m "feat: add professional react ecosystem libraries"
git tag -a v1.1.0 -m "Versão 1.1.0 - bibliotecas profissionais do ecossistema React"
git push -u origin feature/fase-10-ecosistema
git push origin v1.1.0
```

## Merge na main

```bash
git checkout main
git merge feature/fase-10-ecosistema
git push origin main
```

---

## Bibliotecas instaladas durante a fase

```bash
npm install react-hook-form zod @hookform/resolvers
npm install sonner
npm install axios
npm install @tanstack/react-query
npm install zustand
npm install recharts
npm install @tanstack/react-table
npm install date-fns
```

## Bibliotecas avaliadas e deixadas para fase futura

```txt
Tailwind CSS
Shadcn/UI
```

## Motivo

Tailwind CSS e Shadcn/UI foram deixados para a Fase 12, pois essa fase será focada exclusivamente em design moderno, futurista e experiência visual.