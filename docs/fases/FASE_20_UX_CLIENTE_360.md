# Fase 20 — Reformulação da UX Cliente 360

## Status

Funcionalmente concluída, aguardando versionamento manual.

## Objetivo

Transformar `/clientes/:clienteId` em uma visão Cliente 360 funcional, limpa e inspirada na experiência do Mercos, com implementação própria e foco em uso comercial real.

## Entregas implementadas

### 1. Topo básico do cliente

- nome do cliente
- botão Alterar
- e-mail
- endereço principal
- ação Visualizar mapa
- cadastro completo recolhível

### 2. Seção Tarefas

- criação de tarefa via drawer lateral
- edição de tarefa
- conclusão de tarefa
- registro do resultado da conclusão
- tarefa tratada como ação futura

### 3. Seção Oportunidades Abertas

- criação de oportunidade via drawer lateral
- oportunidade vinculada ao cliente
- oportunidade preparada para o futuro Funil Kanban
- clique navega para `/vendas`
- exclusão não acontece no Cliente 360

### 4. Seção Pedidos e Atividades

- histórico operacional do cliente
- botão Criar pedido navega para `/pedidos/novo?clienteId=ID`
- item de pedido/orçamento navega para `/pedidos/:pedidoId`
- pedido não abre drawer dentro do cliente
- atividade pode ser registrada via drawer
- atividade pode ser editada e excluída pelo representante
- pedidos e orçamentos não são excluídos no Cliente 360

### 5. Seção Notas Fiscais

- número da nota
- emissão
- valor
- pedido vinculado
- botões XML e PDF
- dados mockados
- sem integração fiscal real

### 6. Seção Produtos Mais Comprados

- ranking de produtos comprados pelo cliente
- nome do produto
- SKU ou código
- imagem ou placeholder
- quantidade comprada
- referência aos últimos 6 meses

### 7. Coluna lateral direita

- Resumo
- Portal do Cliente
- Limite de Crédito
- Títulos

### 8. Resumo lateral

- ranking do cliente
- valor comprado
- quantidade de pedidos
- ticket médio
- dias sem comprar
- leitura considerando apenas pedidos do tipo venda ou pedido

### 9. Portal do Cliente

- card visual e preparatório
- sem funcionalidade real nesta fase

### 10. Limite de Crédito

- card visual
- limite disponível
- limite total
- fallback `Não definido` quando não houver dado real
- sem regra financeira real

### 11. Títulos

- abas `A receber` e `Recebidos`
- adicionar título
- editar título
- excluir título
- menu de três pontinhos
- valor
- vencimento
- documento
- data de pagamento
- observação
- vínculo com pedido quando existir
- dados em localStorage e mock

### 12. Ajustes de layout

- layout superior em 70/30
- coluna esquerda com cliente, tarefas, oportunidades e pedidos/atividades
- coluna direita com resumo, portal, limite e títulos
- notas fiscais e produtos mais comprados em largura total abaixo do bloco superior
- lateral direita rolando junto com a página
- botões Ver mais e Ver menos ajustados
- listas com scroll interno controlado

## Regras de negócio consolidadas

- Cliente 360 é visão de resumo e atalhos
- Pedidos são gerenciados no módulo Pedidos
- Pedido ou orçamento no cliente é apenas resumo e atalho
- Criar pedido pelo cliente navega para `/pedidos/novo?clienteId=ID`
- Clicar em pedido navega para `/pedidos/:pedidoId`
- Oportunidade criada no cliente alimenta o futuro Funil Kanban
- Oportunidade só será excluída no Kanban
- Tarefas são ações futuras
- Atividades são ações realizadas
- Atividade pode ser excluída pelo representante
- Pedido ou orçamento só poderá ser excluído por usuário master ou administrador futuramente
- Notas fiscais, limite de crédito, portal e títulos ainda não têm backend real
- O sistema ainda usa fake APIs, localStorage e mocks

## Fora de escopo da Fase 20

- Funil Kanban completo
- Agenda Comercial completa
- backend e API real
- login real
- permissões reais
- dashboard por perfil
- importação de produtos
- deploy
- design global final

## Próximos passos

- versionamento manual da Fase 20
- próxima fase planejada: Fase 21 — Funil Kanban de Oportunidades
