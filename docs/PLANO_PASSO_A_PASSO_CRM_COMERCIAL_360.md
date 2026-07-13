# Plano passo a passo - CRM Comercial 360

## Estado atual

- `main` oficial em `v1.11.0`
- branch atual da Fase 21: `feature/fase-21-funil-kanban-oportunidades`
- Fase 20 concluída e versionada em `v1.11.0`
- Fase 21 funcionalmente concluída, aguardando auditoria e versionamento manual
- futura versão esperada após o fechamento da Fase 21: `v1.12.0`

## Decisão central

- Cliente como visão 360
- Pedidos como módulo próprio
- Produtos como base
- Tarefas como agenda
- Oportunidades como funil
- Histórico como linha do tempo

## Fase 20

A Fase 20 foi concluída e versionada como `v1.11.0`. O foco foi a reformulação da UX do Cliente 360, com reorganização do layout, lateral comercial, títulos, notas fiscais e ranking de produtos.

## Fase 21

A Fase 21 foi concluída funcionalmente na branch `feature/fase-21-funil-kanban-oportunidades`.

O foco foi transformar `/vendas` em um Funil Kanban real de oportunidades, integrado ao Cliente 360.

Entregas principais:

- Kanban por etapas em `/vendas`
- cards de oportunidade por etapa
- criação e edição de oportunidades no Kanban
- exclusão no Cliente 360 e no Kanban
- drag and drop para mudança de etapa
- integração com `/vendas?clienteId=ID&oportunidadeId=ID`
- destaque da oportunidade vinda do Cliente 360
- botão para voltar ao cliente de origem
- filtros por cliente, funil, status e etiqueta
- busca textual
- métricas, contadores e totais refletindo filtros, busca e movimentações

## Regra de trabalho

- uma fase por vez
- diagnóstico antes de código
- documentação antes de implementação
- testes manuais antes de fechar a fase
- auditoria antes do versionamento
- versionamento manual com Rafael
- Codex não faz commit, tag, push ou merge

## Pendência atual

- auditoria técnica da Fase 21
- `npm run build`
- auditoria visual/manual da Fase 21
- versionamento manual da Fase 21

## Próximo passo operacional

1. Auditoria técnica.
2. Build.
3. Auditoria visual/manual.
4. Versionamento manual.
5. Início da Fase 22.

## Próximo passo depois do versionamento da Fase 21

- Fase 22: Agenda Comercial de Tarefas

## Próximos passos planejados

- Fase 22: Agenda Comercial de Tarefas
- Fase 23: Pedidos e Orçamentos avançado
- Fase 24: Importação de Produtos
- Fase 25: Cadastro inicial da empresa / Conta
- Fase 26: Login e Autenticação
- Fase 27: Usuários, vendedores e permissões
- Fase 28: Atribuição de clientes a vendedores
- Fase 29: Dashboard do gestor e dashboard do vendedor
- Fase 30: Configurações do sistema
- Marco: Deploy do Frontend MVP para portfólio
- Fase 31: Refatoração técnica e limpeza de código
- Fase 32: Preparação para API e Backend
- Fase 33: Backend/API
- Fase 34: Integração Frontend + Backend
- Fase 35: Relatórios e indicadores gerenciais
- Fase 36: Integrações e automações
- Fase 37: Design Global / App Shell / Polimento visual final

## Fora de escopo imediato da Fase 21

- dashboard comercial do funil
- relatórios gerenciais
- permissões
- usuários
- backend
- autenticação real
- paginação
- automações de status ganho/perdido
