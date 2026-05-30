# Fase 14 — Tarefas e atividades no detalhe do cliente

## 1. Objetivo

Evoluir a página de detalhe do cliente para funcionar como uma central inicial de relacionamento comercial, adicionando a base para tarefas agendadas e atividades realizadas vinculadas ao cliente.

A partir da Fase 14, o detalhe do cliente começará a registrar não apenas dados cadastrais, mas também ações comerciais futuras e histórico de interações realizadas.

## 2. Contexto da fase anterior

A Fase 13 criou a página de detalhe profissional do cliente com:

- Rota `/clientes/:clienteId`
- Página `CustomerDetailPage`
- Cards de dados principais
- Card de endereço principal
- Card de contatos
- Placeholders para tarefas, oportunidades, pedidos e histórico
- Botão `Ver detalhes` na lista de clientes
- Botão `Alterar` dentro do detalhe
- Drawer de edição real no detalhe
- Persistência dos dados do cliente no localStorage
- Tag `v1.4.0`

## 3. Escopo da Fase 14

Nesta fase, vamos criar a primeira base funcional de relacionamento comercial dentro do detalhe do cliente.

Escopo previsto:

- Criar documentação da fase
- Criar feature isolada `customerInteractions`
- Criar tipos para tarefas e atividades
- Criar opções de status, canais e resultados
- Criar mocks iniciais
- Criar fake API com localStorage próprio
- Criar service próprio
- Criar hook com React Query
- Criar card de tarefas agendadas
- Criar card de atividades realizadas
- Integrar tarefas ao detalhe do cliente
- Integrar atividades ao detalhe do cliente
- Criar drawer de tarefa
- Criar drawer de atividade
- Criar tarefa vinculada a cliente
- Editar tarefa
- Marcar tarefa como realizada
- Registrar atividade manualmente
- Persistir dados no localStorage
- Filtrar tarefas e atividades por `customerId`

## 4. Fora de escopo nesta fase

Não será implementado nesta fase:

- Página global `/atividades` completa
- Kanban de oportunidades
- Pedidos reais
- Orçamentos reais
- Histórico comercial completo com todos os eventos do cliente
- Integração com backend real
- Integração com agenda externa
- Notificações
- Lembretes automáticos
- Recorrência de tarefas
- Upload de anexos
- Relatórios de produtividade
- Integração com e-mail ou WhatsApp
- Integração com calendário

## 5. Decisão técnica

Tarefas e atividades não serão salvas dentro do objeto `Customer`.

Será criada uma feature isolada:

`src/features/customerInteractions/`

Motivo:

- Tarefas e atividades são registros operacionais, não dados cadastrais
- A feature poderá alimentar tanto o detalhe do cliente quanto a futura página global `/atividades`
- O vínculo com o cliente será feito por `customerId`
- A persistência ficará separada da fake API de clientes
- O modelo fica mais próximo de uma arquitetura real de CRM

## 6. Diferença entre tarefa e atividade

### Tarefa

Uma tarefa representa uma ação futura ou pendente.

Exemplos:

- Ligar para o cliente
- Enviar proposta
- Fazer visita
- Retornar orçamento
- Confirmar pedido
- Cobrar retorno

Campos previstos:

- id
- customerId
- title
- dueDate
- dueTime
- channel
- details
- status
- createdAt
- updatedAt
- completedAt

### Atividade

Uma atividade representa algo que já aconteceu.

Exemplos:

- Ligação realizada
- Visita feita
- Proposta enviada
- Reunião concluída
- Cliente retornou contato
- Pedido acompanhado

Campos previstos:

- id
- customerId
- type
- date
- time
- channel
- result
- details
- createdAt

## 7. Modelagem inicial recomendada

Tipos previstos:

- CustomerTask
- CustomerActivity
- InteractionChannel
- CustomerTaskStatus
- CustomerActivityType
- CustomerActivityResult

Canais previstos:

- telefone
- whatsapp
- email
- visita
- reunião
- outro

Status de tarefa previstos:

- pendente
- concluida
- atrasada
- cancelada

Tipos de atividade previstos:

- ligacao
- whatsapp
- email
- visita
- reuniao
- proposta
- pedido
- observacao

Resultados previstos:

- positivo
- neutro
- negativo
- sem_retorno
- reagendar
- concluido

## 8. Estratégia de persistência

A Fase 14 deverá criar uma fake API própria para interações comerciais.

Chaves de localStorage previstas:

- `crm-customer-tasks`
- `crm-customer-activities`

A fake API deverá permitir:

Tarefas:

- buscar tarefas por cliente
- criar tarefa
- atualizar tarefa
- marcar tarefa como concluída
- excluir ou cancelar tarefa, se entrar no escopo

Atividades:

- buscar atividades por cliente
- registrar atividade
- atualizar atividade, se necessário

## 9. Arquivos previstos para criação

- `src/features/customerInteractions/types/customerInteraction.types.ts`
- `src/features/customerInteractions/data/customerInteractionMockData.ts`
- `src/features/customerInteractions/services/customerInteractionFakeApi.ts`
- `src/features/customerInteractions/services/customerInteractionService.ts`
- `src/features/customerInteractions/hooks/useCustomerInteractions.ts`
- `src/features/customerInteractions/components/CustomerTasksCard.tsx`
- `src/features/customerInteractions/components/CustomerActivitiesCard.tsx`
- `src/features/customerInteractions/components/CustomerTaskDrawer.tsx`
- `src/features/customerInteractions/components/CustomerActivityDrawer.tsx`
- `src/features/customerInteractions/components/CustomerTaskForm.tsx`
- `src/features/customerInteractions/components/CustomerActivityForm.tsx`

Schemas previstos para etapa posterior:

- `src/features/customerInteractions/schemas/customerTaskSchema.ts`
- `src/features/customerInteractions/schemas/customerActivitySchema.ts`

## 10. Arquivos previstos para alteração

- `src/pages/CustomerDetailPage.tsx`
- `README.md`

Opcionalmente, em fase posterior:

- `src/pages/AtividadesPage.tsx`

## 11. Arquivos que devem ser preservados inicialmente

- `src/types/crm.ts`
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
- Confirmar base v1.4.0
- Analisar CustomerDetailPage
- Analisar placeholders atuais
- Analisar tipos existentes
- Analisar fake APIs existentes
- Definir estratégia técnica

### Bloco 2 — Documentação da fase

- Criar `docs/fases/FASE_14_TAREFAS_ATIVIDADES_CLIENTE.md`
- Documentar escopo
- Documentar fora de escopo
- Documentar modelagem
- Documentar plano em blocos
- Documentar riscos

### Bloco 3 — Estrutura, tipos e opções

Criar estrutura base:

- `src/features/customerInteractions/`
- `types/`
- `data/`
- `services/`
- `hooks/`
- `components/`

Criar tipos e opções:

- CustomerTask
- CustomerActivity
- InteractionChannel
- CustomerTaskStatus
- CustomerActivityType
- CustomerActivityResult

### Bloco 4 — Fake API e service

Criar:

- mock data inicial
- fake API com localStorage
- service de tarefas e atividades

### Bloco 5 — Hook com React Query

Criar hook para:

- listar tarefas por cliente
- listar atividades por cliente
- criar tarefa
- atualizar tarefa
- concluir tarefa
- registrar atividade

### Bloco 6 — Card de tarefas

Criar card visual de tarefas agendadas com:

- estado vazio
- lista de tarefas
- status
- data/hora
- canal
- botão criar tarefa
- botão marcar como realizada

### Bloco 7 — Card de atividades

Criar card visual de atividades realizadas com:

- estado vazio
- lista de atividades
- data/hora
- tipo
- canal
- resultado
- botão registrar atividade

### Bloco 8 — Integração inicial no detalhe

Substituir placeholders de tarefas e atividades por cards reais na CustomerDetailPage.

### Bloco 9 — Drawer de tarefa

Criar drawer para:

- criar tarefa
- editar tarefa
- preencher data, hora, canal, título e detalhes

### Bloco 10 — Concluir tarefa

Permitir marcar tarefa como concluída.

Ao concluir, avaliar se uma atividade correspondente deve ser criada automaticamente.

### Bloco 11 — Drawer de atividade

Criar drawer para registrar atividade manualmente.

### Bloco 12 — Validação manual

Validar:

- criar tarefa
- editar tarefa
- concluir tarefa
- registrar atividade
- atualizar página com F5
- confirmar persistência
- confirmar filtro por cliente

### Bloco 13 — README

Atualizar README com a Fase 14.

### Bloco 14 — Validação final, commit e tag

- Rodar `npx tsc --noEmit`
- Rodar `npm run dev`
- Validar git status
- Criar commit
- Criar tag `v1.5.0`
- Push da branch
- Push da tag
- Merge na main

## 13. Riscos identificados

- Misturar dados cadastrais do cliente com dados operacionais
- Reutilizar o tipo global Activity sem avaliar compatibilidade
- Acoplar tarefas diretamente ao Customer
- Criar lógica demais dentro da CustomerDetailPage
- Perder separação entre tarefa futura e atividade realizada
- Criar localStorage sem chave clara
- Não filtrar corretamente por customerId
- Quebrar refresh se a fake API não hidratar dados corretamente
- Duplicar dados entre tarefa concluída e atividade registrada
- Crescer demais o escopo da fase

## 14. Critérios de aceite

A Fase 14 será considerada concluída quando:

- Tarefas forem exibidas no detalhe do cliente
- Atividades forem exibidas no detalhe do cliente
- Tarefa puder ser criada
- Tarefa puder ser editada
- Tarefa puder ser marcada como realizada
- Atividade puder ser registrada
- Dados forem filtrados por cliente
- Dados persistirem no localStorage
- Dados continuarem após F5
- Estados vazios forem exibidos corretamente
- TypeScript passar sem erros
- Vite iniciar sem erro
- README for atualizado
- Commit for criado
- Tag `v1.5.0` for criada

## 15. Versionamento previsto

Branch:

`feature/fase-14-tarefas-atividades-cliente`

Commit previsto:

`feat: add customer tasks and activities`

Tag prevista:

`v1.5.0`

Mensagem da tag prevista:

`Versão 1.5.0 - tarefas e atividades no detalhe do cliente`

## 16. Checklist técnico

- [x] Branch da fase criada
- [x] Diagnóstico inicial realizado
- [ ] Documento da fase criado
- [x] Estrutura da feature customerInteractions criada
- [x] Tipos de tarefa criados
- [x] Tipos de atividade criados
- [x] Opções de canais, status, tipos e resultados criadas
- [x] Mock data criado
- [x] Fake API criada
- [x] Service criado
- [x] Hook com React Query criado
- [x] Card de tarefas criado
- [x] Card de atividades criado
- [x] Cards integrados ao CustomerDetailPage
- [x] Drawer de tarefa criado
- [x] Criação de tarefa funcionando
- [x] Edição de tarefa funcionando
- [x] Conclusão de tarefa funcionando
- [x] Drawer de atividade criado
- [x] Registro de atividade funcionando
- [x] Edição de atividade funcionando
- [x] Persistência no localStorage funcionando
- [x] Filtro por customerId funcionando
- [ ] Validação manual realizada
- [ ] README atualizado
- [ ] npx tsc --noEmit executado sem erros
- [ ] npm run dev executado sem erros
- [ ] Commit criado
- [ ] Tag v1.5.0 criada
- [ ] Branch enviada ao GitHub
- [ ] Tag enviada ao GitHub
- [ ] Merge realizado na main


## 17. Validação parcial — cards de tarefas e atividades

A integração inicial dos cards de tarefas e atividades no detalhe do cliente foi validada manualmente.

Resultados confirmados:

- A página de detalhe do cliente abre corretamente
- O card Tarefas agendadas é exibido
- O card Atividades realizadas é exibido
- As tarefas são carregadas por customerId
- As atividades são carregadas por customerId
- Os dados mockados aparecem corretamente
- Os canais, status e resultados aparecem com labels legíveis
- O botão Criar tarefa aparece no card de tarefas
- O botão Registrar atividade aparece no card de atividades
- Os botões Editar aparecem nos cards
- O layout dos cards ficou coerente com a página de detalhe
- O TypeScript foi validado com npx tsc --noEmit
- O Vite iniciou sem erro

Observação:

Nesta etapa, os botões Criar tarefa, Editar tarefa, Registrar atividade e Editar atividade ainda funcionam como placeholders ou ações parciais. A criação e edição real serão implementadas em etapas posteriores.


## 18. Validação parcial — criação, edição e conclusão de tarefas

A criação, edição e conclusão de tarefas dentro do detalhe do cliente foram validadas manualmente.

Resultados confirmados:

- O botão Criar tarefa abre o drawer de tarefa
- O drawer de tarefa funciona em modo criação
- A validação de título obrigatório funciona
- Uma nova tarefa pode ser criada
- A tarefa criada aparece no card Tarefas agendadas
- O botão Editar abre o drawer preenchido com os dados da tarefa
- A tarefa pode ser editada
- O botão Marcar como realizada conclui a tarefa
- O status da tarefa é atualizado para concluída
- As alterações persistem no localStorage
- Os dados continuam salvos após atualizar a página com F5
- O TypeScript foi validado com npx tsc --noEmit
- O Vite iniciou sem erro

Observação:

Nesta etapa, a conclusão de tarefa ainda não cria automaticamente uma atividade realizada. Essa integração poderá ser avaliada em etapa posterior.


## 19. Validação parcial — registro e edição de atividades

O registro e a edição de atividades dentro do detalhe do cliente foram validados manualmente.

Resultados confirmados:

- O botão Registrar atividade abre o drawer de atividade
- O drawer de atividade funciona em modo criação
- A validação de data obrigatória funciona
- A validação de hora obrigatória funciona
- Uma nova atividade pode ser registrada
- A atividade registrada aparece no card Atividades realizadas
- O botão Editar abre o drawer preenchido com os dados da atividade
- A atividade pode ser editada
- As alterações persistem no localStorage
- Os dados continuam salvos após atualizar a página com F5
- O TypeScript foi validado com npx tsc --noEmit
- O Vite iniciou sem erro

Observação:

Nesta etapa, as atividades são registradas manualmente. A criação automática de atividade ao concluir uma tarefa poderá ser avaliada em fase futura.
