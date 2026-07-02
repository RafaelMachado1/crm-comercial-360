# Roadmap - CRM Comercial 360

## Estado atual

O CRM Comercial 360 evoluiu de um estudo em React para uma aplicação comercial real para representantes comerciais e equipes comerciais.

Versão oficial atual:

- `v1.10.0` - Módulo Pedidos com itens reais e Cliente 360

Fase atual:

- Fase 20 - Reformulação da UX Cliente 360
- status: funcionalmente concluída, aguardando versionamento manual

## Histórico consolidado das fases executadas

### Fases 01 a 10 - Base de estudo e fundação técnica

- Fase 01 - JavaScript moderno para React: base de estudo com map, filter, reduce, Promises e fundamentos de lógica comercial
- Fase 02 - JSX, componentes, props e children: primeiros componentes reutilizáveis e estrutura em blocos
- Fase 03 - State, eventos e renderização condicional: interações reais de UI e comportamento dinâmico
- Fase 04 - Listas, filtros e formulários controlados: filtros, formulários e manipulação de coleções
- Fase 05 - useEffect, localStorage, API fake e CRUD: persistência inicial e CRUD com localStorage
- Fase 06 - React Router, páginas e layout: rotas, páginas e app shell inicial
- Fase 07 - Autenticação fake, Context API e rotas privadas: login simulado e proteção de acesso
- Fase 08 - Hooks customizados e organização profissional: base mais modular e organizada
- Fase 09 - Migração para React com TypeScript: tipagem do projeto e migração estrutural
- Fase 10 - Bibliotecas de mercado e experiência profissional: stack mais próxima de um CRM real

### Fases 11 a 20 - Evolução para produto real

- Fase 11 - Dashboard avançado: indicadores, filtros e visão gerencial mais madura
- Fase 12 - Clientes profissionais: listagem e cadastro com campos comerciais mais ricos
- Fase 13 - Detalhe do cliente: criação da página `/clientes/:clienteId`
- Fase 14 - Tarefas e atividades do cliente: ações futuras e histórico de execução
- Fase 15 - Oportunidades do cliente: funil preliminar dentro do Cliente 360
- Fase 16 - Histórico comercial do cliente: timeline derivada dos eventos comerciais
- Fase 17 - Pedidos e orçamentos no cliente: início do módulo operacional de pedidos
- Fase 18 - Módulo real de produtos: catálogo funcional com fake API/localStorage
- Fase 19 - Itens reais em pedidos e orçamentos: itens de produto, total automático e rotas próprias
- Fase 20 - Reformulação da UX Cliente 360: nova visão 360 com lateral, títulos, notas fiscais e ranking de produtos

## O que a Fase 19 entregou

- módulo Pedidos real na sidebar
- listagem global de pedidos e orçamentos
- detalhe operacional do pedido/orçamento
- criação de pedido/orçamento com cliente vinculado
- cliente 360 conectado ao módulo por atalhos
- produtos reais como itens do pedido
- total automático calculado pelos itens
- compatibilidade com registros antigos sem produtos

## Direção de produto

### 1. Clientes / Cliente 360

Visão 360 do cliente com dados principais, histórico, pedidos, tarefas, oportunidades e atalhos de ação.

### 2. Pedidos

Módulo próprio para listagem global, criação, edição, cliente vinculado, itens, produtos, quantidade, subtotal e total automático.

### 3. Produtos

Base de produtos reais com SKU, fabricante, categoria, unidade, preço, estoque, status, descrição e imagem por URL.

### 4. Oportunidades / Funil Kanban

Pipeline visual de oportunidades com etapas e acompanhamento comercial.

### 5. Tarefas / Agenda Comercial

Rotina comercial, follow-up, compromissos e organização diária da equipe.

### 6. Design geral das páginas

Padronização visual e refinamento da experiência em todas as telas do sistema.

### 7. Gestão da empresa

Cadastro inicial da empresa, gestor master, configuração da empresa e cadastro de vendedores.

### 8. Acesso e visibilidade

Perfis de acesso, permissões, atribuição de clientes a vendedores e visões distintas para gestor e vendedor.

### 9. Dashboard do gestor

Visão consolidada da empresa com todos os vendedores, clientes, oportunidades, tarefas, pedidos, orçamentos e indicadores.

### 10. Dashboard do vendedor

Visão limitada à carteira própria do vendedor.

### 11. Produtos em massa

Importação de produtos em massa para evitar cadastro manual item a item.

### 12. Conversão e documentos comerciais

Conversão de orçamento em pedido, numeração comercial, impressão em PDF, envio por WhatsApp e e-mail, ciclo comercial do pedido e relatórios.

### 13. Backend real

Preparação para backend, autenticação real, empresas e usuários no backend.

## Roadmap futuro aprovado

- Fase 21 - Funil Kanban de Oportunidades
- Fase 22 - Agenda Comercial
- Fase 23 - Pedidos e Orçamentos avançado
- Fase 24 - Importação de Produtos
- Fase 25 - Cadastro inicial da empresa / Conta
- Fase 26 - Login e Autenticação
- Fase 27 - Usuários, vendedores e permissões
- Fase 28 - Atribuição de clientes a vendedores
- Fase 29 - Dashboard do gestor e dashboard do vendedor
- Fase 30 - Configurações do sistema
- Marco - Deploy do Frontend MVP para portfólio
- Fase 31 - Refatoração técnica e limpeza de código
- Fase 32 - Preparação para API e Backend
- Fase 33 - Backend/API
- Fase 34 - Integração Frontend + Backend
- Fase 35 - Relatórios e indicadores gerenciais
- Fase 36 - Integrações e automações
- Fase 37 - Design Global / App Shell / Polimento visual final

## Estratégia aprovada

- primeiro completar as principais funcionalidades de frontend
- depois fazer deploy do Frontend MVP para portfólio
- deixar claro que os dados são mockados/localStorage
- depois evoluir para API/backend real
- deixar o polimento visual global para depois das funcionalidades principais

## Direção de produto

O CRM será para empresas e equipes comerciais, não apenas para representante individual.

O primeiro cadastro cria a empresa/tenant e o gestor master.

Vendedores serão cadastrados depois pelo gestor.

O gestor verá todos os vendedores, clientes, oportunidades, tarefas, pedidos, orçamentos e indicadores.

O vendedor verá apenas sua própria base.

Clientes precisam ser atribuídos a vendedores.

A área do gestor será o dashboard principal da empresa.

O dashboard do vendedor será limitado à própria carteira.

A importação de produtos em massa será necessária para evitar cadastro manual um por um.
