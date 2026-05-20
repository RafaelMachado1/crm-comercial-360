# Fase 03 — Comandos usados

## Criar branch da fase

```bash
git checkout -b feature/fase-03-state-eventos
```

## Criar pasta da fase

```bash
mkdir -p estudos/fase-03-state-eventos
```

## Criar arquivos de estudo

```bash
touch estudos/fase-03-state-eventos/teoria.md
touch estudos/fase-03-state-eventos/anotacoes.md
touch estudos/fase-03-state-eventos/exercicios.md
touch estudos/fase-03-state-eventos/desafios.md
touch estudos/fase-03-state-eventos/checklist.md
touch estudos/fase-03-state-eventos/comandos.md
```

## Rodar o projeto

```bash
npm run dev
```

## Versionar a fase

```bash
git add .
git commit -m "feat: add crm interactions with state and events"
git tag -a v0.4.0 -m "Fase 03 concluída - state eventos e renderização condicional"
git push -u origin feature/fase-03-state-eventos
git push origin v0.4.0
```