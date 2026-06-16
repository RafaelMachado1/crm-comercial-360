# Fase 19 - Módulo Pedidos com itens reais e Cliente 360

## Status

Implementação funcional concluída e aprovada em testes manuais; aguardando auditoria final/versionamento.

## Nome da fase

Fase 19 - Módulo Pedidos com itens reais e Cliente 360

## Resumo executivo

A Fase 19 reorganizou o CRM Comercial 360 para separar o fluxo operacional de pedidos em um módulo próprio e manter o Cliente como visão 360, com histórico, resumo e atalhos.

O desenho aprovado evitou concentrar criação e edição pesada de pedidos dentro de `CustomerDetailPage`. O cliente passou a servir como ponto de contexto e navegação, enquanto a operação de pedidos foi movida para o módulo Pedidos.

## Decisão arquitetural

- Pedidos virou módulo próprio na sidebar.
- Cliente virou visão 360 com atalhos, histórico e resumo comercial.
- Criação e edição pesada de pedido saiu do cliente.
- O fluxo principal de criação agora mora em `/pedidos/novo`.
- Quando necessário, o cliente apenas pré-seleciona o contexto com `/pedidos/novo?clienteId=ID`.

## Rotas criadas

- `/pedidos`
- `/pedidos/:pedidoId`
- `/pedidos/novo`
- `/pedidos/novo?clienteId=ID`

## Arquivos principais criados

- `src/pages/PedidosPage.tsx`
- `src/pages/PedidoDetailPage.tsx`
- `src/pages/NewPedidoPage.tsx`
- `src/features/customerOrders/hooks/useAllCustomerOrders.ts`
- `src/features/customerOrders/components/CustomerOrderProductPicker.tsx`
- `src/features/customerOrders/components/CustomerOrderItemRow.tsx`
- `src/features/customerOrders/components/CustomerOrderItemsEditor.tsx`
- `src/features/customerOrders/utils/customerOrderItemCalculations.ts`

## Arquivos principais alterados

- `src/App.tsx`
- `src/components/layout/Sidebar.tsx`
- `src/pages/CustomerDetailPage.tsx`
- `src/features/customerOrders/types/customerOrder.types.ts`
- `src/features/customerOrders/data/customerOrderMockData.ts`
- `src/features/customerOrders/services/customerOrderFakeApi.ts`
- `src/features/customerOrders/services/customerOrderService.ts`
- `src/features/customerOrders/components/CustomerOrderForm.tsx`
- `src/features/customerOrders/components/CustomerOrderDrawer.tsx`

## Regras de negócio consolidadas

- produtos obrigatórios para salvar pedido e orçamento;
- total sempre calculado pela soma dos itens;
- sem valor manual como fluxo normal;
- orçamento continua editável no detalhe;
- pedido salvo/gerado fica somente leitura para itens;
- registros antigos sem produtos são tratados como pendência ou inconsistência;
- o cliente funciona como resumo/atalho, não como tela pesada de criação.

## Testes manuais aprovados

- `/pedidos`
- `/pedidos/:pedidoId`
- `/pedidos/novo`
- `/pedidos/novo?clienteId=ID`
- criação de orçamento
- criação de pedido
- produto obrigatório
- cliente obrigatório
- título obrigatório
- redirecionamento após salvar
- pedido bloqueado
- orçamento editável
- botão `Criar pedido/orçamento` no cliente
- botão `Editar` nos cards do cliente

## Validações técnicas

- `npx tsc --noEmit` passou sem erros nos blocos recentes.
- `npm run build` já havia passado antes da retomada com apenas alerta de chunk grande.
- a auditoria final ainda será rodada novamente antes do fechamento.

## Próximo passo

- auditoria final
- `npm run build`
- `git diff` e conferência final
- commit/tag/merge manual pelo Rafael

## Checklist da Fase 19

- [x] Criar documentação inicial
- [x] Criar `CustomerOrderItem`
- [x] Adicionar `items` ao `CustomerOrder`
- [x] Criar utilitários de cálculo
- [x] Atualizar mock data
- [x] Atualizar fake API com compatibilidade
- [x] Revisar service/hook
- [x] Criar seletor de produtos
- [x] Criar editor de itens
- [x] Criar linha de item com `+` e `-`
- [x] Reposicionar Pedidos como módulo próprio
- [x] Criar rota `/pedidos`
- [x] Adicionar Pedidos na sidebar
- [x] Criar listagem global de pedidos
- [x] Criar fluxo `/pedidos/novo`
- [x] Criar novo pedido via `clienteId`
- [x] Conectar Cliente 360 ao módulo Pedidos
- [x] Remover abertura prática do drawer antigo pelo cliente
- [x] Validar `npx tsc --noEmit`
- [ ] Auditoria final
- [ ] `npm run build`
- [ ] Fechamento manual da fase
