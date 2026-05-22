# Fase 06 — Comandos usados

## Criar branch da fase

```bash
git checkout -b feature/fase-06-react-router-layout
```

## Criar pasta da fase

```bash
mkdir -p estudos/fase-06-react-router-layout
```

## Criar arquivos de estudo

```bash
touch estudos/fase-06-react-router-layout/teoria.md
touch estudos/fase-06-react-router-layout/anotacoes.md
touch estudos/fase-06-react-router-layout/exercicios.md
touch estudos/fase-06-react-router-layout/desafios.md
touch estudos/fase-06-react-router-layout/checklist.md
touch estudos/fase-06-react-router-layout/comandos.md
```

## Instalar React Router

```bash
npm install react-router-dom
```

## Rodar projeto

```bash
npm run dev
```

## Versionar a fase

```bash
git add .
git commit -m "feat: add react router pages and main layout"
git tag -a v0.7.0 -m "Fase 06 concluída - React Router páginas e layout"
git push -u origin feature/fase-06-react-router-layout
git push origin v0.7.0
```