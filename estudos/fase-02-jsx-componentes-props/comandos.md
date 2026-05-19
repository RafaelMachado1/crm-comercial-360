# Fase 02 — Comandos usados

## Criar branch da fase

```bash
git checkout -b feature/fase-02-componentes
```

## Criar pasta da fase

```bash
mkdir -p estudos/fase-02-jsx-componentes-props
```

## Criar arquivos de estudo

```bash
touch estudos/fase-02-jsx-componentes-props/teoria.md
touch estudos/fase-02-jsx-componentes-props/anotacoes.md
touch estudos/fase-02-jsx-componentes-props/exercicios.md
touch estudos/fase-02-jsx-componentes-props/desafios.md
touch estudos/fase-02-jsx-componentes-props/checklist.md
touch estudos/fase-02-jsx-componentes-props/comandos.md
```

## Rodar o projeto

```bash
npm run dev
```

## Versionar a fase

```bash
git add .
git commit -m "feat: create reusable layout and crm components"
git tag -a v0.3.0 -m "Fase 02 concluída - JSX componentes props e children"
git push -u origin feature/fase-02-componentes
git push origin v0.3.0
```