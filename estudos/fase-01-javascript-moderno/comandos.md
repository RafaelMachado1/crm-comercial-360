# Fase 01 — Comandos usados

## 1. Criar branch da fase

```bash
git checkout -b feature/fase-01-js-react
```

## 2. Criar estrutura de estudos da Fase 01

```bash
mkdir -p estudos/fase-01-javascript-moderno
```

## 3. Criar arquivos de estudo da Fase 01

```bash
touch estudos/fase-01-javascript-moderno/teoria.md
touch estudos/fase-01-javascript-moderno/anotacoes.md
touch estudos/fase-01-javascript-moderno/exercicios.js
touch estudos/fase-01-javascript-moderno/desafios.js
touch estudos/fase-01-javascript-moderno/checklist.md
touch estudos/fase-01-javascript-moderno/comandos.md
```

## 4. Criar mock oficial do projeto

```bash
touch src/data/mockData.js
```

## 5. Abrir arquivos no VS Code

```bash
code estudos/fase-01-javascript-moderno/teoria.md
code estudos/fase-01-javascript-moderno/anotacoes.md
code estudos/fase-01-javascript-moderno/exercicios.js
code estudos/fase-01-javascript-moderno/desafios.js
code estudos/fase-01-javascript-moderno/checklist.md
code estudos/fase-01-javascript-moderno/comandos.md
code src/data/mockData.js
```

## 6. Rodar exercícios com Node

```bash
node estudos/fase-01-javascript-moderno/exercicios.js
```

## 7. Rodar desafios com Node

```bash
node estudos/fase-01-javascript-moderno/desafios.js
```

## 8. Rodar o projeto React em localhost

```bash
npm run dev
```

Acessar no navegador:

```txt
http://localhost:5173/
```

## 9. Parar o servidor local

```bash
Ctrl + C
```

## 10. Verificar alterações no Git

```bash
git status
```

## 11. Adicionar arquivos da Fase 01

```bash
git add estudos/fase-01-javascript-moderno src/data/mockData.js README.md
```

Se houver outros arquivos modificados da fase, usar:

```bash
git add .
```

## 12. Criar commit da Fase 01

```bash
git commit -m "feat: add mock commercial data and javascript exercises"
```

## 13. Criar tag da Fase 01

```bash
git tag -a v0.2.0 -m "Fase 01 concluída - JavaScript moderno aplicado ao React"
```

## 14. Enviar branch para o GitHub

```bash
git push -u origin feature/fase-01-js-react
```

## 15. Enviar tag para o GitHub

```bash
git push origin v0.2.0
```

## 16. Voltar para a main

```bash
git checkout main
```

## 17. Fazer merge da Fase 01 na main

```bash
git merge feature/fase-01-js-react
```

## 18. Enviar main atualizada para o GitHub

```bash
git push origin main
```

---

# Observação importante

A pasta `estudos/fase-01-javascript-moderno/` contém os arquivos de estudo, exercícios e desafios.

O arquivo `src/data/mockData.js` pertence ao projeto React e será usado futuramente na aplicação.

Nesta fase, os exercícios não importam arquivos do `src/`, para manter estudo e aplicação separados.