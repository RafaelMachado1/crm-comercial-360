# Fase 15 — Oportunidades abertas no detalhe do cliente

## 1. Objetivo

Evoluir a página de detalhe do cliente para substituir o placeholder de Oportunidades abertas por uma funcionalidade real de oportunidades comerciais vinculadas ao cliente.

A partir da Fase 15, o detalhe do cliente começará a registrar oportunidades de venda, negociações em andamento, propostas abertas e possíveis negócios futuros.

## 2. Contexto da fase anterior

A Fase 14 concluiu a evolução de tarefas e atividades no detalhe do cliente com:

- Feature `customerInteractions`
- Card de tarefas agendadas
- Card de atividades realizadas
- Criação de tarefa
- Edição de tarefa
- Conclusão de tarefa
- Registro de atividade
- Edição de atividade
- Persistência no localStorage
- Filtro por `customerId`
- Tag `v1.5.0`

Após a Fase 14, a página de detalhe do cliente ainda mantém como placeholder:

- Oportunidades abertas
- Histórico comercial

## 3. Escopo da Fase 15

Nesta fase, vamos criar a primeira base funcional de oportunidades comerciais dentro do detalhe do cliente.

Escopo previsto:

- Criar documentação da fase
- Criar feature isolada `customerOpportunities`
- Criar tipos para oportunidades
- Criar opções de funil, etapa, status e etiquetas
- Criar mocks iniciais
- Criar fake API com localStorage próprio
- Criar service próprio
- Criar hook com React Query
- Criar card de oportunidades abertas
- Integrar oportunidades ao detalhe do cliente
- Criar drawer de oportunidade
- Criar formulário de oportunidade
- Criar oportunidade vinculada ao cliente
- Editar oportunidade
- Persistir dados no localStorage
- Filtrar oportunidades por `customerId`

## 4. Fora de escopo nesta fase

Não será implementado nesta fase:

- Kanban completo de oportunidades
- Página global de funis de vendas
- Drag and drop entre etapas
- Múltiplos funis configuráveis
- Geração de pedido a partir da oportunidade
- Geração de orçamento/proposta em PDF
- Histórico comercial completo
- Integração com backend real
- Integração com calendário
- Notificações
- Relatórios de conversão
- Forecast comercial avançado
- Pipeline global da empresa

## 5. Decisão técnica

Oportunidades não serão salvas dentro do objeto `Customer`.

Será criada uma feature isolada:

`src/features/customerOpportunities/`

Motivo:

- Oportunidades têm ciclo comercial próprio
- Futuramente podem alimentar um Kanban/funil de vendas
- Futuramente podem se conectar ao módulo Pedidos
- O vínculo com o cliente será feito por `customerId`
- A persistência ficará separada da fake API de clientes e da feature customerInteractions
- O modelo fica mais próximo de uma arquitetura real de CRM

## 6. Diferença entre tarefa, atividade e oportunidade

### Tarefa

Uma tarefa representa uma ação futura ou pendente.

Exemplos:

- Ligar para o cliente
- Enviar proposta
- Fazer visita
- Retornar orçamento

### Atividade

Uma atividade representa algo que já aconteceu.

Exemplos:

- Ligação realizada
- Visita feita
- Proposta enviada
- Reunião concluída

### Oportunidade

Uma oportunidade representa uma possibilidade comercial em andamento.

Exemplos:

- Negociação aberta
- Proposta em análise
- Orçamento em andamento
- Possível venda futura
- Pedido em negociação

## 7. Modelagem inicial recomendada

Tipos previstos:

- CustomerOpportunity
- CustomerOpportunityStatus
- CustomerOpportunityStage
- CustomerOpportunityFunnel
- CustomerOpportunityLabel
- CustomerOpportunityFormValues

Campos previstos para oportunidade:

- id
- customerId
- title
- funnel
- stage
- value
- status
- label
- expectedCloseDate
- details
- createdAt
- updatedAt
- closedAt

Status previstos:

- aberta
- ganha
- perdida
- pausada
- cancelada

Funis previstos:

- vendas
- pos_venda
- renovacao

Etapas previstas:

- prospeccao
- qualificacao
- proposta
- negociacao
- fechamento

Etiquetas previstas:

- quente
- morna
- fria
- prioridade
- recorrente

## 8. Estratégia de persistência

A Fase 15 deverá criar uma fake API própria para oportunidades comerciais.

Chave de localStorage prevista:

- `crm-customer-opportunities`

A fake API deverá permitir:

- buscar oportunidades por cliente
- criar oportunidade
- atualizar oportunidade
- encerrar oportunidade como ganha, perdida, pausada ou cancelada se entrar no escopo
- persistir alterações no localStorage

## 9. Arquivos previstos para criação

- `src/features/customerOpportunities/types/customerOpportunity.types.ts`
- `src/features/customerOpportunities/data/customerOpportunityOptions.ts`
- `src/features/customerOpportunities/data/customerOpportunityMockData.ts`
- `src/features/customerOpportunities/services/customerOpportunityFakeApi.ts`
- `src/features/customerOpportunities/services/customerOpportunityService.ts`
- `src/features/customerOpportunities/hooks/useCustomerOpportunities.ts`
- `src/features/customerOpportunities/components/CustomerOpportunitiesCard.tsx`
- `src/features/customerOpportunities/components/CustomerOpportunityDrawer.tsx`
- `src/features/customerOpportunities/components/CustomerOpportunityForm.tsx`

Schemas previstos para etapa posterior, se necessário:

- `src/features/customerOpportunities/schemas/customerOpportunitySchema.ts`

## 10. Arquivos previstos para alteração

- `src/pages/CustomerDetailPage.tsx`
- `README.md`

## 11. Arquivos que devem ser preservados inicialmente

- `src/types/crm.ts`
- `src/features/customerInteractions/*`
- `src/hooks/useCustomers.ts`
- `src/services/customerService.ts`
- `src/services/clientesFakeApi.ts`
- `src/data/mockData.ts`
- `src/pages/ClientesPage.tsx`
- `src/App.tsx`
- `package.json`
- `package-lock.json`

## 12. Plano de execução em blocos

### Bloco 1 — Diagnóstico inicial

- Confirmar branch
- Confirmar base v1.5.0
- Analisar CustomerDetailPage
- Analisar placeholder atual
- Analisar tipos existentes
- Analisar fake APIs existentes
- Definir estratégia técnica

### Bloco 2 — Documentação da fase

- Criar `docs/fases/FASE_15_OPORTUNIDADES_CLIENTE.md`
- Documentar escopo
- Documentar fora de escopo
- Documentar modelagem
- Documentar plano em blocos
- Documentar riscos

### Bloco 3 — Estrutura, tipos e opções

Criar estrutura base:

- `src/features/customerOpportunities/`
- `types/`
- `data/`
- `services/`
- `hooks/`
- `components/`
- `schemas/`

Criar tipos e opções:

- CustomerOpportunity
- CustomerOpportunityStatus
- CustomerOpportunityStage
- CustomerOpportunityFunnel
- CustomerOpportunityLabel
- CustomerOpportunityFormValues

### Bloco 4 — Fake API e service

Criar:

- mock data inicial
- fake API com localStorage
- service de oportunidades

### Bloco 5 — Hook com React Query

Criar hook para:

- listar oportunidades por cliente
- criar oportunidade
- atualizar oportunidade

### Bloco 6 — Card de oportunidades abertas

Criar card visual de oportunidades com:

- estado vazio
- lista de oportunidades
- valor
- funil
- etapa
- status
- etiqueta
- data prevista de fechamento
- botão criar oportunidade
- botão editar oportunidade

### Bloco 7 — Integração inicial no detalhe

Substituir placeholder de oportunidades por card real na CustomerDetailPage.

### Bloco 8 — Drawer/formulário de oportunidade

Criar drawer e formulário para:

- criar oportunidade
- editar oportunidade
- preencher título, funil, etapa, valor, status, etiqueta, data prevista e detalhes

### Bloco 9 — Conectar criação/edição

Permitir:

- criar oportunidade real
- editar oportunidade real
- persistir no localStorage
- atualizar o card

### Bloco 10 — Validação manual

Validar:

- criar oportunidade
- editar oportunidade
- atualizar página com F5
- confirmar persistência
- confirmar filtro por customerId

### Bloco 11 — README

Atualizar README com a Fase 15.

### Bloco 12 — Validação final, commit e tag

- Rodar `npx tsc --noEmit`
- Rodar `npm run dev`
- Validar git status
- Criar commit
- Criar tag `v1.6.0`
- Push da branch
- Push da tag
- Merge na main

## 13. Riscos identificados

- Misturar oportunidade com tarefa/atividade
- Reutilizar o tipo global Opportunity sem modelagem adequada
- Criar oportunidade dentro do Customer e acoplar dados operacionais ao cadastro
- Criar lógica demais dentro da CustomerDetailPage
- Não filtrar corretamente por customerId
- Confundir etapa de oportunidade com status da oportunidade
- Crescer o escopo tentando criar Kanban nesta fase
- Criar modelagem que dificulte o futuro módulo Funis de Vendas
- Duplicar conceito de pedido/orçamento antes do módulo Pedidos estar pronto

## 14. Critérios de aceite

A Fase 15 será considerada concluída quando:

- Oportunidades forem exibidas no detalhe do cliente
- Oportunidade puder ser criada
- Oportunidade puder ser editada
- Dados forem filtrados por cliente
- Dados persistirem no localStorage
- Dados continuarem após F5
- Estado vazio for exibido corretamente
- TypeScript passar sem erros
- Vite iniciar sem erro
- README for atualizado
- Commit for criado
- Tag `v1.6.0` for criada

## 15. Versionamento previsto

Branch:

`feature/fase-15-oportunidades-cliente`

Commit previsto:

`feat: add customer opportunities`

Tag prevista:

`v1.6.0`

Mensagem da tag prevista:

`Versão 1.6.0 - oportunidades abertas no detalhe do cliente`

## 16. Checklist técnico

- [x] Branch da fase criada
- [x] Diagnóstico inicial realizado
- [x] Documento da fase criado
- [x] Estrutura da feature customerOpportunities criada
- [x] Tipos de oportunidade criados
- [x] Opções de funil, etapa, status e etiqueta criadas
- [x] Mock data criado
- [x] Fake API criada
- [x] Service criado
- [x] Hook com React Query criado
- [x] Card de oportunidades criado
- [x] Card integrado ao CustomerDetailPage
- [x] Drawer de oportunidade criado
- [x] Formulário de oportunidade criado
- [x] Criação de oportunidade funcionando
- [x] Edição de oportunidade funcionando
- [x] Persistência no localStorage funcionando
- [x] Filtro por customerId funcionando
- [x] Validação manual realizada
- [ ] README atualizado
- [ ] `npx tsc --noEmit` executado sem erros
- [ ] `npm run dev` executado sem erros
- [ ] Commit criado
- [ ] Tag v1.6.0 criada
- [ ] Branch enviada ao GitHub
- [ ] Tag enviada ao GitHub
- [ ] Merge realizado na main



## 17. Validação parcial - card de oportunidades abertas

A integração inicial do card de oportunidades abertas no detalhe do cliente foi validada manualmente.

Resultados confirmados:

- A página de detalhe do cliente abre corretamente
- O card Oportunidades abertas é exibido
- As oportunidades são carregadas por customerId
- Os dados mockados aparecem corretamente
- O valor da oportunidade aparece formatado em Real brasileiro
- O funil aparece com label legível
- A etapa aparece com label legível
- O status aparece com label legível
- A etiqueta aparece com label legível
- A data prevista de fechamento aparece quando existe
- Os detalhes da oportunidade aparecem quando existem
- O botão Criar aparece no card
- O botão Editar aparece nas oportunidades
- O placeholder Histórico comercial continua presente
- O TypeScript foi validado com `npx tsc --noEmit`
- O Vite iniciou sem erro

Observação:

Nesta etapa, os botões Criar oportunidade e Editar oportunidade ainda funcionam como placeholders por toast. A criação e edição real serão implementadas em etapas posteriores.

Refinamentos futuros identificados:

- Avaliar renomear o botão "Criar" para "Criar oportunidade"
- Avaliar ajustar o texto do botão de atividades de "Registrador" para "Registrar"

## 18. Validação parcial - criação e edição de oportunidades

A criação e edição de oportunidades dentro do detalhe do cliente foram validadas manualmente.

Resultados confirmados:

- O botão Criar oportunidade abre o drawer de oportunidade
- O drawer funciona em modo criação
- A validação de título obrigatório funciona
- A validação de valor obrigatório/válido funciona
- Uma nova oportunidade pode ser criada
- A oportunidade criada aparece no card Oportunidades abertas
- O botão Editar abre o drawer preenchido com os dados da oportunidade
- A oportunidade pode ser editada
- As alterações aparecem imediatamente no card
- As alterações persistem no localStorage
- Os dados continuam salvos após atualizar a página com F5
- As oportunidades são filtradas por customerId
- O TypeScript foi validado com `npx tsc --noEmit`
- O Vite iniciou sem erro

Observação:

Nesta etapa, a abertura/fechamento formal de oportunidade como ganha, perdida, pausada ou cancelada ainda não foi conectada à UI. A fake API já possui base para encerramento, mas a interface de encerramento poderá ser avaliada em fase futura.
