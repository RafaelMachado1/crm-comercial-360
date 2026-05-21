# Fase 05 — Comandos usados

## Criar branch da fase

```bash
git checkout -b feature/fase-05-useeffect-localstorage-crud
```

## Criar pasta da fase

```bash
mkdir -p estudos/fase-05-useeffect-localstorage-crud
```

## Criar arquivos de estudo

```bash
touch estudos/fase-05-useeffect-localstorage-crud/teoria.md
touch estudos/fase-05-useeffect-localstorage-crud/anotacoes.md
touch estudos/fase-05-useeffect-localstorage-crud/exercicios.md
touch estudos/fase-05-useeffect-localstorage-crud/desafios.md
touch estudos/fase-05-useeffect-localstorage-crud/checklist.md
touch estudos/fase-05-useeffect-localstorage-crud/comandos.md
```

## Rodar projeto

```bash
npm run dev
```

## Versionar a fase

```bash
git add .
git commit -m "feat: persist clients and add crud operations"
git tag -a v0.6.0 -m "Fase 05 concluída - useEffect localStorage API fake e CRUD"
git push -u origin feature/fase-05-useeffect-localstorage-crud
git push origin v0.6.0
```