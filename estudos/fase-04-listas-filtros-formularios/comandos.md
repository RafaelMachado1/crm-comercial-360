# Fase 04 — Comandos usados

## Criar branch da fase

```bash
git checkout -b feature/fase-04-listas-filtros-formularios
```

## Criar pasta da fase

```bash
mkdir -p estudos/fase-04-listas-filtros-formularios
```

## Criar arquivos de estudo

```bash
touch estudos/fase-04-listas-filtros-formularios/teoria.md
touch estudos/fase-04-listas-filtros-formularios/anotacoes.md
touch estudos/fase-04-listas-filtros-formularios/exercicios.md
touch estudos/fase-04-listas-filtros-formularios/desafios.md
touch estudos/fase-04-listas-filtros-formularios/checklist.md
touch estudos/fase-04-listas-filtros-formularios/comandos.md
```

## Rodar projeto

```bash
npm run dev
```

## Versionar a fase

```bash
git add .
git commit -m "feat: add controlled customer form and advanced filters"
git tag -a v0.5.0 -m "Fase 04 concluída - listas filtros e formulários controlados"
git push -u origin feature/fase-04-listas-filtros-formularios
git push origin v0.5.0
```