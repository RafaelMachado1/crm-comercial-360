# Fase 18 — Módulo real de Produtos

## Status

Em andamento

## Objetivo

Transformar a área de Produtos em um módulo real, funcional e persistente, preparado para uso comercial dentro do CRM e para consumo futuro em pedidos e orçamentos.

A Fase 18 marca a saída do modelo legada/estático atual e a entrada de uma feature isolada, com tipagem profissional, fake API própria, hook com React Query e interface de cadastro, edição e busca.

O módulo já foi implementado e validado no navegador nesta fase, com listagem, busca, cadastro, edição, persistência e apresentação visual ajustadas para uso comercial.

## Contexto

Hoje a rota \/produtos já existe, mas a experiência ainda está presa ao modelo antigo do projeto.

A página atual de Produtos:

- usa dados mockados de \`src/data/mockData.ts\`
- renderiza o componente legado \`src/components/crm/ProdutoCard.tsx\`
- não possui persistência
- não possui busca
- não possui cadastro
- não possui edição
- não possui camada própria de domínio

Além disso, o tipo \`Product\` atual em \`src/types/crm.ts\` é simples demais para representar um produto comercial real.

A Fase 18 existe para corrigir isso sem misturar o novo domínio com pedidos/orçamentos antes da hora.

Na implementação concluída, a página \/produtos passou a usar a feature nova de Products em vez do modelo legado.

## Estado atual antes da fase

Situação encontrada no diagnóstico:

- a rota \/produtos já está registrada
- a rota está protegida por \`PrivateRoute\`
- a rota é exibida dentro de \`MainLayout\`
- a navegação para Produtos já existe no \`Sidebar\`
- \`src/pages/ProdutosPage.tsx\` ainda é estática
- a página usa \`produtos\` de \`src/data/mockData.ts\`
- a página renderiza \`src/components/crm/ProdutoCard.tsx\`
- não existe \`src/features/products/\`
- o tipo legado \`Product\` existe em \`src/types/crm.ts\`
- o \`Product\` legado possui apenas \`id\`, \`nome\`, \`categoria\`, \`preco\` e \`estoque\`
- não existe fake API de produtos
- não existe service de produtos
- não existe hook de produtos com React Query
- não existe persistência própria para produtos

## Escopo da Fase 18

Nesta fase, entra o seguinte:

- criar a feature \`src/features/products/\`
- criar o tipo profissional de produto
- criar campos como código/SKU, nome, marca/fabricante, categoria, unidade, preço, estoque, descrição, status e imagem por URL
- criar opções de categoria, unidade e status
- criar mock data realista
- criar fake API com localStorage
- criar service
- criar hook com React Query
- refatorar a página \/produtos
- criar busca por nome, código e SKU
- criar cadastro de produto
- criar edição de produto
- persistir produtos após F5
- criar estados de loading, vazio e erro, se fizer sentido
- validar no navegador
- atualizar a documentação final da fase
- atualizar o README somente ao final da fase

Entregas concluídas nesta fase:

- criação da feature \`src/features/products/\`
- criação do tipo \`ProfessionalProduct\`
- criação de \`ProductFormValues\`, \`CreateProductInput\`, \`UpdateProductInput\` e \`ProductFilters\`
- criação das opções de categoria, unidade e status
- criação de mock data realista
- criação de fake API com \`localStorage\`
- uso da chave \`crm-products\`
- criação de service
- criação de hook \`useProducts\` com TanStack Query
- criação dos componentes \`ProductCard\`, \`ProductSearchBar\`, \`ProductEmptyState\`, \`ProductFormContent\` e \`ProductFormDrawer\`
- refatoração da página \/produtos
- listagem em formato vertical
- ordenação alfabética por nome
- busca por nome, SKU/código, descrição e fabricante/marca
- cadastro de produto
- edição de produto
- persistência após F5
- exibição de imagem por URL
- fallback visual \`Sem imagem\`
- exibição de \`Fabricante: nome da marca\`
- campos \`Preço\` e \`Estoque\` com digitação manual sem spinners/setas
- indicadores de total de produtos, ativos, inativos e valor em estoque
- validação técnica com \`npx tsc --noEmit\` sem erros
- validação visual no navegador

## Fora de escopo

Não entra na Fase 18:

- itens dentro de pedidos/orçamentos
- quantidade de produtos dentro do orçamento
- botões \`+\` e \`-\` para adicionar ou remover produtos no orçamento
- subtotal por item
- total automático do orçamento
- compartilhamento por WhatsApp
- conversão orçamento -> pedido
- ERP
- backend real
- upload real de imagem
- storage de arquivo
- Kanban
- agenda
- dashboard real
- vendas real

## Decisões técnicas

Decisões registradas para esta fase:

- a nova feature será criada em \`src/features/products/\`
- o novo tipo ficará separado do \`Product\` legado
- o \`Product\` legado em \`src/types/crm.ts\` será mantido intacto nesta fase
- o nome sugerido para o novo tipo é \`ProfessionalProduct\`
- a chave sugerida para \`localStorage\` é \`crm-products\`
- a rota \/produtos será mantida
- \`MainLayout\`, \`PrivateRoute\` e \`Sidebar\` não devem ser alterados nesta fase, salvo necessidade real
- \`src/data/mockData.ts\` e \`src/components/crm/ProdutoCard.tsx\` devem ser preservados como legado temporário
- a integração com pedidos/orçamentos fica para a Fase 19

Observação:

- os botões \`+\` e \`-\` para itens de pedido/orçamento ficam reservados para a Fase 19, junto da integração de produtos dentro dos pedidos e orçamentos.

## Estrutura prevista

Estrutura prevista para a nova feature:

\`\`\`txt
src/features/products/
├── components/
│   ├── ProductCard.tsx
│   ├── ProductEmptyState.tsx
│   ├── ProductFormContent.tsx
│   ├── ProductFormDrawer.tsx
│   └── ProductSearchBar.tsx
├── data/
│   ├── productMockData.ts
│   └── productOptions.ts
├── hooks/
│   └── useProducts.ts
├── schemas/
│   └── productSchema.ts
├── services/
│   ├── productFakeApi.ts
│   └── productService.ts
├── types/
│   └── product.types.ts
└── utils/
    └── productAdapters.ts
\`\`\`

## Arquivos previstos para criação

Arquivos prováveis desta fase:

- \`docs/fases/FASE_18_MODULO_REAL_PRODUTOS.md\`
- \`src/features/products/types/product.types.ts\`
- \`src/features/products/data/productMockData.ts\`
- \`src/features/products/data/productOptions.ts\`
- \`src/features/products/schemas/productSchema.ts\`
- \`src/features/products/services/productFakeApi.ts\`
- \`src/features/products/services/productService.ts\`
- \`src/features/products/hooks/useProducts.ts\`
- \`src/features/products/components/ProductCard.tsx\`
- \`src/features/products/components/ProductEmptyState.tsx\`
- \`src/features/products/components/ProductFormContent.tsx\`
- \`src/features/products/components/ProductFormDrawer.tsx\`
- \`src/features/products/components/ProductSearchBar.tsx\`
- \`src/features/products/utils/productAdapters.ts\`

## Arquivos previstos para alteração

Nesta etapa inicial, somente a documentação será criada.

Em etapas seguintes da Fase 18, os arquivos abaixo provavelmente serão alterados:

- \`src/pages/ProdutosPage.tsx\`
- \`src/data/mockData.ts\`
- \`src/types/crm.ts\`
- \`src/components/crm/ProdutoCard.tsx\`
- \`src/components/charts/ProdutosEstoqueChart.tsx\`
- \`README.md\`

Obs.: nesta fase inicial, esses arquivos devem permanecer intactos.

## Plano de implementação por blocos

### Bloco 1 — Documentação inicial

- criar a documentação inicial da Fase 18
- registrar escopo, fora de escopo e decisões técnicas
- alinhar a fase com o padrão das documentações anteriores

### Bloco 2 — Types, options e mock data

- criar o tipo profissional de produto
- definir SKU, marca/fabricante, imagem por URL, categoria, unidade, status e demais campos
- criar opções reutilizáveis
- criar mock data realista

### Bloco 3 — Fake API, service e hook

- criar fake API com \`localStorage\`
- criar service de produtos
- criar hook com React Query
- organizar mutations e cache

### Bloco 4 — Componentes de UI

- criar card de produto
- criar busca por nome, código e SKU
- criar formulário de cadastro e edição
- criar estado vazio
- exibir imagem ou fallback no card
- exibir fabricante no card
- permitir URL de imagem no formulário

### Bloco 5 — Refatoração da ProdutosPage

- trocar a página legada pela feature nova
- manter a rota \/produtos
- preservar a experiência de navegação já existente
- adicionar indicadores simples de total, ativos, inativos e valor em estoque
- ordenar a listagem alfabeticamente por nome
- manter a busca local por nome, SKU, descrição e fabricante

### Bloco 6 — Validação no navegador

- validar listagem
- validar busca
- validar criação
- validar edição
- validar persistência após F5
- validar exibição de imagem e fallback
- validar o texto de fabricante no card
- validar digitação manual em preço e estoque

### Bloco 7 — Atualização final de docs e README

- revisar a documentação da fase
- atualizar o README ao final da entrega
- preparar o fechamento oficial da Fase 18

## Critérios de validação

Critérios esperados para considerar a fase validada:

- \`npx tsc --noEmit\` sem erros
- abrir \/produtos sem falha de navegação
- listar produtos corretamente em ordem alfabética
- buscar produto por nome, código, SKU, descrição ou fabricante
- criar produto novo
- editar produto existente
- manter persistência após F5
- exibir imagem por URL ou fallback \`Sem imagem\`
- exibir \`Fabricante: nome da marca\` quando a marca existir
- permitir digitação manual em preço e estoque sem spinners visuais
- exibir loading, vazio ou erro quando aplicável
- não quebrar pedidos/orçamentos
- não alterar o comportamento de outras rotas

## Riscos técnicos

Riscos que precisam ser acompanhados na implementação:

- conflito entre o \`Product\` legado e o novo tipo profissional
- quebra da página \/produtos durante a migração
- inconsistência de \`localStorage\` com dados antigos
- excesso de escopo na primeira versão do módulo
- acoplamento prematuro com pedidos/orçamentos
- inconsistência entre nomes em português e inglês
- duplicação de regras entre mock, fake API e service
- inconsistência de UX entre o módulo novo e o resto do CRM

## Checklist da Fase 18

- [x] Criar documentação inicial
- [x] Criar types
- [x] Criar options
- [x] Criar mock data
- [x] Criar fake API
- [x] Criar service
- [x] Criar hook
- [x] Criar componentes
- [x] Refatorar ProdutosPage
- [x] Validar TypeScript
- [x] Validar no navegador
- [ ] Atualizar documentação final
- [ ] Atualizar README
- [ ] Commit/tag manual pelo Rafael
