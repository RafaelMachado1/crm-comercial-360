# Fase 17 — Pedidos e orçamentos dentro do cliente

## 1. Objetivo

Criar a primeira base funcional de pedidos e orçamentos vinculados ao cliente dentro da página de detalhe do cliente.

A partir da Fase 17, o CRM passou a registrar registros comerciais estruturados, como orçamentos em aberto, propostas enviadas, pedidos aprovados, pedidos recusados e pedidos cancelados.

## 2. Contexto das fases anteriores

A Fase 14 adicionou tarefas e atividades reais no detalhe do cliente.

A Fase 15 adicionou oportunidades comerciais reais no detalhe do cliente.

A Fase 16 adicionou histórico comercial real derivado de tarefas, atividades e oportunidades.

Após essas fases, a página de detalhe do cliente possuía:

- Dados principais
- Endereço
- Contatos
- Tarefas agendadas
- Oportunidades abertas
- Atividades realizadas
- Histórico comercial

A Fase 17 iniciou a camada comercial de pedidos e orçamentos vinculados ao cliente e fechou essa base inicial com uma implementação funcional.

## 3. Escopo implementado

Nesta fase, foi criada a primeira versão funcional de pedidos/orçamentos no detalhe do cliente.

Entregas realizadas:

- Criar documentação da fase
- Criar feature isolada `customerOrders`
- Criar tipos para pedidos/orçamentos
- Criar opções de tipo e status
- Criar mocks iniciais
- Criar fake API com localStorage próprio
- Criar service próprio
- Criar hook com React Query
- Criar card visual de pedidos/orçamentos
- Integrar o card ao detalhe do cliente
- Criar drawer de pedido/orçamento
- Criar formulário de pedido/orçamento
- Criar pedido/orçamento vinculado ao cliente
- Editar pedido/orçamento
- Persistir dados no localStorage
- Filtrar dados por `customerId`
- Integrar eventos de pedidos/orçamentos ao histórico comercial

## 4. Fora de escopo nesta fase

Não foi implementado nesta fase:

- Módulo global completo de pedidos
- Rota própria de pedidos
- Item de sidebar para pedidos
- Seleção de produtos dentro do pedido
- Itens de pedido
- Cálculo automático por produto
- Desconto por item
- Impostos
- Frete
- Geração de PDF
- Envio de proposta por e-mail
- Conversão de oportunidade em pedido
- Conversão de orçamento em venda faturada
- Integração com estoque
- Integração com nota fiscal
- Backend real
- Relatórios de pedidos
- Dashboard financeiro

## 5. Decisão técnica

Foi criada uma feature isolada:

`src/features/customerOrders/`

Motivos:

- O escopo da fase era cliente-específico
- A experiência inicial aconteceria dentro do detalhe do cliente
- O projeto já usava features isoladas para interações, oportunidades e histórico
- A feature pode evoluir futuramente para um módulo global de pedidos
- Evita misturar pedido comercial estruturado com atividade do tipo "pedido"
- Evita misturar pedido/orçamento com oportunidade comercial

Nesta fase, não foi criado um módulo global `orders`.

## 6. Diferença entre atividade, oportunidade e pedido/orçamento

### Atividade

Representa uma interação comercial realizada.

Exemplos:

- Ligação feita
- Visita realizada
- Proposta enviada
- Reunião concluída

### Oportunidade

Representa uma possibilidade comercial em andamento.

Exemplos:

- Negociação aberta
- Proposta em análise
- Possível venda futura
- Pedido em negociação

### Pedido/orçamento

Representa um documento ou registro comercial mais estruturado.

Exemplos:

- Orçamento em rascunho
- Orçamento enviado
- Pedido aprovado
- Pedido recusado
- Pedido cancelado

## 7. Modelagem criada

Tipos criados:

- CustomerOrderType
- CustomerOrderStatus
- CustomerOrder
- CustomerOrderFormValues

Tipos de registro:

- orcamento
- pedido

Status:

- rascunho
- enviado
- em_analise
- aprovado
- recusado
- cancelado

Campos para `CustomerOrder`:

- id
- customerId
- title
- type
- status
- totalValue
- expectedCloseDate
- issuedAt
- approvedAt
- canceledAt
- details
- createdAt
- updatedAt

Campos para `CustomerOrderFormValues`:

- title
- type
- status
- totalValue
- expectedCloseDate
- issuedAt
- details

Observação:

Nesta fase, o valor total é informado manualmente. A seleção de produtos e itens do pedido ficou para fase futura.

## 8. Estratégia de persistência

A Fase 17 usa uma fake API própria para pedidos/orçamentos.

Chave de localStorage usada:

- `crm-customer-orders`

A fake API permite:

- buscar pedidos/orçamentos por cliente
- criar pedido/orçamento
- atualizar pedido/orçamento
- persistir alterações no localStorage
- filtrar registros por `customerId`

## 9. Criação e edição

A criação funciona assim:

- `CustomerOrdersCard` dispara o callback de criação
- `CustomerDetailPage` abre `CustomerOrderDrawer` em modo `create`
- `CustomerOrderForm` recebe valores vazios controlados
- o submit gera `CustomerOrder` com `id`, `customerId`, `createdAt` e `updatedAt`
- o pedido/orçamento é persistido via hook/service/fake API
- a lista do card e o histórico são atualizados pelo React Query e pelo estado derivado

A edição funciona assim:

- `CustomerOrdersCard` dispara o callback de edição com o pedido selecionado
- `CustomerDetailPage` abre `CustomerOrderDrawer` em modo `edit`
- o formulário recebe os valores mapeados do registro existente
- o submit preserva o `id` e o `customerId`
- os campos editáveis são atualizados e o `updatedAt` é recalculado
- o registro é persistido e refletido no card e no histórico

## 10. Filtro por customerId

O filtro por cliente funciona em duas camadas:

- a fake API de pedidos busca todos os registros e devolve somente os que pertencem ao `customerId` informado
- o hook `useCustomerOrders(customerId)` usa a query key `['customerOrders', customerId]` e mantém o cache separado por cliente

Isso garante que cada página de detalhe enxerga somente os pedidos/orçamentos vinculados ao cliente atual.

## 11. Relação com histórico comercial

O histórico comercial já existia desde a Fase 16 e reserva a origem `order`.

Nesta fase, pedidos/orçamentos passaram a alimentar o histórico comercial de forma derivada, sem audit log real.

Eventos implementados:

- pedido/orçamento criado ou atualizado no estado atual
- pedido/orçamento aprovado
- pedido/orçamento recusado
- pedido/orçamento cancelado

Decisão final:

- Primeiro criar a feature `customerOrders`
- Depois integrar ao histórico comercial em sub-bloco separado
- A integração foi concluída nesta fase com evento derivado do estado atual

## 12. Evento de histórico criado

Evento criado para pedidos/orçamentos:

- `order_registered`

Source usado:

- `order`

Ordenação do evento:

- `approvedAt` quando status é `aprovado`
- `canceledAt` quando status é `cancelado` ou `recusado`
- `issuedAt` quando disponível
- `updatedAt` como fallback
- `createdAt` como fallback final

## 13. Arquivos criados

- `src/features/customerOrders/types/customerOrder.types.ts`
- `src/features/customerOrders/data/customerOrderOptions.ts`
- `src/features/customerOrders/data/customerOrderMockData.ts`
- `src/features/customerOrders/services/customerOrderFakeApi.ts`
- `src/features/customerOrders/services/customerOrderService.ts`
- `src/features/customerOrders/hooks/useCustomerOrders.ts`
- `src/features/customerOrders/components/CustomerOrdersCard.tsx`
- `src/features/customerOrders/components/CustomerOrderForm.tsx`
- `src/features/customerOrders/components/CustomerOrderDrawer.tsx`

## 14. Arquivos alterados

- `docs/fases/FASE_17_PEDIDOS_ORCAMENTOS_CLIENTE.md`
- `src/features/customerHistory/types/customerHistory.types.ts`
- `src/features/customerHistory/utils/customerHistoryBuilders.ts`
- `src/features/customerHistory/components/CustomerCommercialHistoryCard.tsx`
- `src/pages/CustomerDetailPage.tsx`

## 15. Validação manual

A validação manual foi realizada no navegador com sucesso.

Validações confirmadas:

- a página de detalhe do cliente abre sem tela branca
- o card Pedidos e orçamentos aparece corretamente
- a criação de pedido/orçamento funciona
- a edição de pedido/orçamento funciona
- os dados persistem no localStorage após F5
- os registros aparecem somente no cliente correto
- o histórico comercial continua mostrando tarefas, atividades e oportunidades
- o histórico comercial passa a exibir evento de pedido/orçamento

## 16. Resultado técnico

Resultado técnico final da fase:

- `npx tsc --noEmit` sem erros
- `npm run dev` sem erros

## 17. Pendências futuras

Ficam para fases futuras:

- produtos dentro do orçamento
- itens do pedido
- quantidades
- subtotal
- total automático
- compartilhar WhatsApp
- transformar orçamento em pedido
- preparar envio ERP
- melhorar UX do detalhe do cliente

## 18. Status final da fase

Status final:

- implementação concluída
- aguardando atualização do README
- aguardando validação final
- aguardando commit
- aguardando tag

## 19. Checklist técnico

- [x] Branch da fase criada
- [x] Diagnóstico inicial realizado
- [x] Documento da fase criado
- [x] Feature customerOrders criada
- [x] Tipos de pedidos/orçamentos criados
- [x] Opções de tipo e status criadas
- [x] Mock data criado
- [x] Fake API criada
- [x] Service criado
- [x] Hook com React Query criado
- [x] Card de pedidos/orçamentos criado
- [x] Card integrado ao CustomerDetailPage
- [x] Drawer de pedido/orçamento criado
- [x] Formulário de pedido/orçamento criado
- [x] Criação de pedido/orçamento funcionando
- [x] Edição de pedido/orçamento funcionando
- [x] Persistência no localStorage funcionando
- [x] Filtro por customerId funcionando
- [x] Integração com histórico comercial implementada
- [x] Evento `order_registered` implementado
- [x] Validação manual realizada
- [x] `npx tsc --noEmit` executado sem erros
- [x] `npm run dev` executado sem erros
- [ ] README atualizado
- [ ] Validação final documentada
- [ ] Commit criado
- [ ] Tag criada
- [ ] Branch enviada ao GitHub
- [ ] Tag enviada ao GitHub
- [ ] Merge realizado na main
