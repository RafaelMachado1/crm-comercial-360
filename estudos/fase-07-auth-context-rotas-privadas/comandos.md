# Fase 07 — Comandos usados

## Criar branch da fase

```bash
git checkout -b feature/fase-07-auth-context-rotas-privadas
```

## Criar pasta da fase

```bash
mkdir -p estudos/fase-07-auth-context-rotas-privadas
```

## Criar arquivos de estudo

```bash
touch estudos/fase-07-auth-context-rotas-privadas/teoria.md
touch estudos/fase-07-auth-context-rotas-privadas/anotacoes.md
touch estudos/fase-07-auth-context-rotas-privadas/exercicios.md
touch estudos/fase-07-auth-context-rotas-privadas/desafios.md
touch estudos/fase-07-auth-context-rotas-privadas/checklist.md
touch estudos/fase-07-auth-context-rotas-privadas/comandos.md
```

## Rodar projeto

```bash
npm run dev
```

## Versionar a fase

```bash
git add .
git commit -m "feat: add fake authentication and private routes"
git tag -a v0.8.0 -m "Fase 07 concluída - autenticação fake Context API e rotas privadas"
git push -u origin feature/fase-07-auth-context-rotas-privadas
git push origin v0.8.0
```