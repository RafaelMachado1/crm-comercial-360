# Roadmap - CRM Comercial 360

## Estado atual

O CRM Comercial 360 evoluiu de um estudo em React para uma aplicação comercial real para representantes comerciais.

Versões recentes concluídas:

- `v1.8.0` - Pedidos e orçamentos dentro do cliente
- `v1.9.0` - Módulo real de Produtos

Fase atual:

- Fase 19 - Módulo Pedidos com itens reais e Cliente 360

## O que a Fase 19 entregou

- módulo Pedidos real na sidebar
- listagem global de pedidos e orçamentos
- detalhe operacional do pedido/orçamento
- criação de pedido/orçamento com cliente vinculado
- cliente 360 conectado ao módulo por atalhos
- produtos reais como itens do pedido
- total automático calculado pelos itens
- compatibilidade com registros antigos sem produtos

## Arquitetura de módulos

### 1. Dashboard / Indicadores

Área de visão executiva e indicadores comerciais.

### 2. Clientes / Cliente 360

Cadastro, dados completos, visão 360, histórico, resumo comercial e atalhos para ações.

### 3. Pedidos

Módulo próprio para listagem global, criação, edição, cliente vinculado, itens, produtos, quantidade, subtotal e total automático.

### 4. Produtos

Base de produtos reais com SKU, fabricante, categoria, unidade, preço, estoque, status, descrição e imagem por URL.

### 5. Tarefas / Agenda

Agenda comercial, follow-up e rotina de relacionamento.

### 6. Oportunidades / Funil

Funil comercial, etapas, valores, previsões e acompanhamento de oportunidades.

### 7. Histórico comercial / Linha do tempo

Linha do tempo consolidada do cliente com atividades, tarefas, oportunidades, pedidos e eventos comerciais.

### 8. Vendas / Relatórios

Relatórios comerciais e visão consolidada de vendas.

### 9. Financeiro futuro

Títulos, pagamentos, limite de crédito e informações financeiras.

### 10. Integrações futuras

WhatsApp, ERP, nota fiscal, relatórios avançados e integrações externas.

## Próximas fases planejadas

- Fase 20 - Conversão de orçamento em pedido ou organização comercial do ciclo de vendas
- Fase 21 - Cliente 360 refinado e atalhos adicionais
- Fase 22 - Tarefas como agenda real
- Fase 23 - Oportunidades/Funil real
- Fase 24 - Histórico comercial consolidado
- Fase 25 - Indicadores comerciais reais
- Fases futuras - PDF, impressão, envio, backend real, autenticação, permissões e integrações externas

## Direção de produto

Clientes devem concentrar a visão 360 e os atalhos de ação.

Pedidos devem concentrar o fluxo completo de criação, edição, itens, produtos e totais.

Produtos devem ser a base comercial reutilizável.

Tarefas, oportunidades e histórico devem evoluir como módulos próprios conectados ao cliente.
