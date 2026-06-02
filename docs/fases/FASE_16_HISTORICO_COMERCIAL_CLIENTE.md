# Fase 16 — Histórico comercial do cliente

## 1. Objetivo

Transformar o placeholder de Histórico comercial no detalhe do cliente em uma linha do tempo real do relacionamento comercial.

A partir da Fase 16, o detalhe do cliente passará a consolidar eventos importantes já existentes no CRM, como atividades realizadas, tarefas concluídas e oportunidades criadas ou atualizadas.

## 2. Contexto das fases anteriores

A Fase 14 adicionou tarefas e atividades reais no detalhe do cliente.

A Fase 15 adicionou oportunidades comerciais reais no detalhe do cliente.

Após essas fases, a página de detalhe do cliente possui:

- Dados principais
- Endereço
- Contatos
- Tarefas agendadas
- Oportunidades abertas
- Atividades realizadas
- Placeholder de Histórico comercial

A Fase 16 fecha esse bloco inicial do detalhe do cliente, substituindo o placeholder por uma timeline consolidada.

## 3. Escopo da Fase 16

Nesta fase, vamos criar a primeira versão funcional do histórico comercial do cliente.

Escopo previsto:

- Criar documentação da fase
- Criar feature isolada `customerHistory`
- Criar tipos para eventos de histórico
- Criar utilitário para montar eventos derivados
- Criar componente visual de timeline
- Integrar histórico ao detalhe do cliente
- Consolidar atividades realizadas
- Consolidar tarefas concluídas
- Consolidar oportunidades criadas e atualizadas
- Ordenar eventos por data
- Filtrar eventos por `customerId` por meio das fontes já carregadas
- Exibir estado vazio quando não houver histórico

## 4. Fora de escopo nesta fase

Não será implementado nesta fase:

- LocalStorage próprio de histórico
- Fake API própria de histórico
- Hook próprio com React Query
- Audit log completo
- Registro de todas as edições antigas de oportunidade
- Histórico de pedidos/orçamentos
- Histórico de notas fiscais
- Timeline com filtros avançados
- Exportação do histórico
- Integração com backend real
- Notificações automáticas
- Relatórios de produtividade

## 5. Decisão técnica

O histórico comercial será uma timeline derivada dos dados já existentes.

Será criada uma feature isolada:

`src/features/customerHistory/`

A feature terá:

- tipos próprios
- utilitário de composição
- componente visual de timeline

Não será criado localStorage próprio nesta fase.

Motivo:

- tarefas, atividades e oportunidades já possuem suas próprias fontes de dados
- duplicar histórico em outro storage pode gerar inconsistência
- o histórico da Fase 16 será uma visão consolidada, não um audit log
- no futuro, um backend real poderá fornecer um audit log completo se necessário

## 6. Diferença entre histórico derivado e audit log

### Histórico derivado

É uma timeline montada a partir de dados atuais do sistema.

Exemplos:

- atividade registrada
- tarefa concluída
- oportunidade criada
- oportunidade atualizada

### Audit log

É um registro permanente de cada alteração feita no sistema.

Exemplos:

- alteração de valor antigo para valor novo
- mudança de etapa
- alteração de status
- usuário que fez a alteração
- data exata da alteração
- antes/depois da modificação

Nesta fase será implementado apenas histórico derivado.

## 7. Fontes de dados da timeline

### Atividades

Podem gerar eventos usando:

- date
- time
- type
- channel
- result
- details
- createdAt

### Tarefas concluídas

Devem gerar eventos apenas quando:

- status === "concluida"

Podem usar:

- title
- date
- time
- channel
- details
- completedAt

### Oportunidades

Podem gerar eventos de:

- oportunidade criada
- oportunidade atualizada

Campos úteis:

- title
- value
- funnel
- stage
- status
- label
- createdAt
- updatedAt
- closedAt

Observação:

Como a oportunidade preserva apenas o último `updatedAt`, a timeline consegue exibir a última atualização, mas não todas as edições históricas.

## 8. Modelagem inicial recomendada

Tipos previstos:

- CustomerHistoryEventType
- CustomerHistoryEventSource
- CustomerHistoryEvent

Tipos de evento previstos:

- activity_registered
- task_completed
- opportunity_created
- opportunity_updated
- opportunity_closed

Fontes previstas:

- activity
- task
- opportunity
- order
- invoice
- system

Campos previstos para CustomerHistoryEvent:

- id
- customerId
- type
- source
- title
- description
- dateTime
- metadata
- relatedId

## 9. Estratégia de ordenação

Os eventos devem ser ordenados por data/hora em ordem decrescente.

Eventos mais recentes aparecem primeiro.

Cuidados:

- atividades possuem date e time
- tarefas podem usar completedAt quando disponível
- oportunidades podem usar createdAt, updatedAt e closedAt
- datas inválidas devem ser tratadas com fallback seguro

## 10. Arquivos previstos para criação

- `src/features/customerHistory/types/customerHistory.types.ts`
- `src/features/customerHistory/utils/customerHistoryBuilders.ts`
- `src/features/customerHistory/components/CustomerCommercialHistoryCard.tsx`

## 11. Arquivos previstos para alteração

- `src/pages/CustomerDetailPage.tsx`
- `README.md`

## 12. Arquivos que devem ser preservados inicialmente

- `src/features/customerInteractions/*`
- `src/features/customerOpportunities/*`
- `src/features/customers/*`
- `src/types/crm.ts`
- `src/App.tsx`
- `src/pages/ClientesPage.tsx`
- `src/services/*`
- `src/hooks/*`
- `package.json`
- `package-lock.json`

## 13. Plano de execução em blocos

### Bloco 1 — Diagnóstico inicial

- Confirmar branch
- Confirmar base v1.6.0
- Analisar CustomerDetailPage
- Analisar dados já disponíveis
- Analisar placeholder atual
- Definir estratégia técnica

### Bloco 2 — Documentação da fase

- Criar `docs/fases/FASE_16_HISTORICO_COMERCIAL_CLIENTE.md`
- Documentar escopo
- Documentar fora de escopo
- Documentar fontes de dados
- Documentar riscos
- Documentar critérios de aceite

### Bloco 3 — Tipos e builder de histórico

Criar:

- tipos de histórico
- função de montagem da timeline
- normalização de eventos
- ordenação por data/hora

### Bloco 4 — Card visual de histórico comercial

Criar:

- card de timeline
- estado vazio
- lista de eventos
- título do evento
- descrição
- data/hora
- origem do evento

### Bloco 5 — Integração no detalhe

Substituir placeholder Histórico comercial pelo card real.

### Bloco 6 — Validação visual

Validar:

- atividades no histórico
- tarefas concluídas no histórico
- oportunidades no histórico
- ordenação por data
- estado vazio
- responsividade básica

### Bloco 7 — Documentar validação

Atualizar documentação da fase com a validação manual.

### Bloco 8 — README

Atualizar README com a Fase 16.

### Bloco 9 — Validação final, commit e tag

- Rodar `npx tsc --noEmit`
- Rodar `npm run dev`
- Validar git status
- Criar commit
- Criar tag `v1.7.0`
- Push da branch
- Push da tag
- Merge na main

## 14. Riscos identificados

- Confundir timeline derivada com audit log completo
- Duplicar eventos de oportunidade quando `createdAt === updatedAt`
- Exibir tarefas ainda pendentes como histórico realizado
- Ordenar incorretamente datas de atividade compostas por date e time
- Criar localStorage próprio e gerar inconsistência entre fontes
- Crescer o escopo tentando incluir pedidos/orçamentos ainda inexistentes
- Criar lógica demais dentro da CustomerDetailPage
- Não tratar datas inválidas ou vazias

## 15. Critérios de aceite

A Fase 16 será considerada concluída quando:

- Histórico comercial for exibido no detalhe do cliente
- Placeholder de Histórico comercial for substituído
- Atividades realizadas aparecerem na timeline
- Tarefas concluídas aparecerem na timeline
- Oportunidades aparecerem na timeline
- Eventos forem ordenados por data/hora
- Estado vazio funcionar corretamente
- O histórico for derivado dos dados existentes
- Não houver localStorage próprio de histórico
- TypeScript passar sem erros
- Vite iniciar sem erro
- README for atualizado
- Commit for criado
- Tag `v1.7.0` for criada

## 16. Versionamento previsto

Branch:

`feature/fase-16-historico-comercial-cliente`

Commit previsto:

`feat: add customer commercial history`

Tag prevista:

`v1.7.0`

Mensagem da tag prevista:

`Versão 1.7.0 - histórico comercial do cliente`

## 17. Checklist técnico

- [x] Branch da fase criada
- [x] Diagnóstico inicial realizado
- [x] Documento da fase criado
- [x] Feature customerHistory criada
- [x] Tipos de histórico criados
- [x] Builder de eventos criado
- [x] Ordenação de eventos criada
- [x] Card de histórico comercial criado
- [x] Card integrado ao CustomerDetailPage
- [x] Placeholder Histórico comercial substituído
- [x] Atividades exibidas na timeline
- [x] Tarefas concluídas exibidas na timeline
- [x] Oportunidades exibidas na timeline
- [x] Estado vazio validado
- [x] Ordenação validada
- [x] Validação manual realizada
- [ ] README atualizado
- [ ] `npx tsc --noEmit` executado sem erros
- [ ] `npm run dev` executado sem erros
- [ ] Commit criado
- [ ] Tag v1.7.0 criada
- [ ] Branch enviada ao GitHub
- [ ] Tag enviada ao GitHub
- [ ] Merge realizado na main

## 18. Validação parcial — histórico comercial

A integração do histórico comercial no detalhe do cliente foi validada manualmente.

Resultados confirmados:

- O placeholder Histórico comercial foi removido
- O card Histórico comercial é exibido no detalhe do cliente
- A timeline mostra eventos reais derivados dos dados existentes
- Atividades realizadas aparecem no histórico
- Tarefas concluídas aparecem no histórico
- Oportunidades aparecem no histórico
- Os eventos são exibidos do mais recente para o mais antigo
- Criar uma nova atividade atualiza o histórico
- Criar ou editar uma oportunidade atualiza o histórico
- Concluir uma tarefa atualiza o histórico
- Após atualizar a página com F5, o histórico continua correto
- O histórico é derivado das fontes persistidas
- Não foi criado localStorage próprio de histórico
- O TypeScript foi validado com `npx tsc --noEmit`
- O Vite iniciou sem erro

Observação:

O histórico comercial desta fase é uma timeline derivada, não um audit log completo. Ele consolida o estado atual de atividades, tarefas concluídas e oportunidades, mas ainda não registra todas as alterações antigas de forma imutável.

