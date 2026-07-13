# Fase 21 — Funil Kanban de Oportunidades

## Status

Funcionalmente concluída na branch `feature/fase-21-funil-kanban-oportunidades`.

A fase ainda aguarda auditoria técnica, build, revisão visual/manual e versionamento manual.

## Ponto de partida

- Versão oficial anterior: `v1.11.0`
- Fase anterior: Fase 20 — Reformulação da UX Cliente 360

## Objetivo da fase

Transformar a rota `/vendas` em um Funil Kanban real de oportunidades, integrado ao Cliente 360 e capaz de concentrar a gestão comercial das oportunidades abertas.

## Escopo implementado

A Fase 21 entregou uma tela funcional de Kanban em `/vendas`, com carregamento global das oportunidades, colunas por etapa, cards com dados comerciais, filtros, busca, criação, edição, exclusão e movimentação por drag and drop.

As etapas implementadas no funil são:

- Prospecção
- Qualificação
- Proposta
- Negociação
- Fechamento

## Entregas por bloco

### Bloco 1 — Shell funcional do Kanban

- Transformação da rota `/vendas` de placeholder para tela funcional.
- Carregamento global de oportunidades.
- Agrupamento por etapa do funil.
- Renderização de colunas e cards.
- Resolução do cliente vinculado ao card.
- Leitura de `clienteId` e `oportunidadeId` via query params.
- Destaque da oportunidade aberta a partir do Cliente 360.

### Bloco 2 — Exclusão no Cliente 360 e Kanban

- Exclusão de oportunidade no Cliente 360.
- Exclusão de oportunidade no Kanban.
- Confirmação antes de excluir.
- Sincronização via a mesma base `localStorage`.
- Remoção refletida nos dois contextos.

### Bloco 3 — Mudança de etapa

- Atualização do campo `stage` da oportunidade.
- Atualização de `updatedAt` ao mudar etapa.
- Reorganização automática dos cards entre colunas.
- Atualização de contadores e totais por coluna.

### Bloco 4 — Criação e edição no Kanban

- Botão `Criar oportunidade` em `/vendas`.
- Drawer/formulário para criação e edição.
- Seleção obrigatória de cliente ao criar pelo Kanban.
- Edição de cliente, título, funil, etapa, valor, status, etiqueta, previsão de fechamento e detalhes.
- Atualização da coluna quando a etapa é alterada na edição.

### Bloco 5 — Filtros

- Filtro por cliente.
- Filtro por funil.
- Filtro por status.
- Filtro por etiqueta.
- Botão `Limpar filtros`.
- Métricas, contadores e totais refletindo os filtros ativos.

### Bloco 6 — Busca

- Busca textual simples combinada com os filtros.
- Busca por título, cliente, status, etiqueta, detalhes e demais campos previstos.
- Métricas e colunas refletindo busca + filtros.
- Limpeza da busca junto com os filtros.

### Bloco 7 — Drag and drop

- Movimentação de cards entre colunas por HTML5 Drag and Drop nativo.
- Atualização de `stage` e `updatedAt` ao soltar em outra coluna.
- Preservação de filtros, busca e destaque durante a movimentação.
- Prevenção de atualização ao soltar na mesma coluna.
- Ajuste para evitar recarregamento visual do Kanban após o drop.

### Ajustes finais

- Remoção dos botões manuais `Voltar` e `Avançar` após o drag and drop.
- Inclusão da indicação discreta `Arraste para mudar de etapa` nos cards.
- Preservação das ações `Editar`, `Excluir` e `Voltar ao cliente`.
- Ajuste de cache/query para evitar loading global após mudança de etapa.

## Dados exibidos nos cards

Cada card de oportunidade exibe:

- título da oportunidade;
- cliente vinculado;
- valor;
- funil;
- status;
- etiqueta;
- previsão de fechamento, quando existir;
- data de atualização, quando existir.

## Regras de negócio consolidadas

- O campo `stage` define a coluna da oportunidade no Kanban.
- Oportunidades podem ser criadas no Cliente 360.
- Oportunidades podem ser criadas no Kanban, com cliente obrigatório.
- Oportunidades criadas no Cliente 360 aparecem no Kanban.
- Oportunidades criadas no Kanban aparecem no Cliente 360 quando vinculadas ao cliente.
- Oportunidades podem ser editadas no Kanban.
- Oportunidades podem ser excluídas no Cliente 360 e no Kanban.
- A exclusão usa confirmação antes da remoção.
- A base de dados local é compartilhada via `crm-customer-opportunities`.
- A mudança de etapa atualiza `updatedAt`.
- Mudar etapa não altera `status` automaticamente.
- Mudar etapa não marca oportunidade como ganha ou perdida.
- Filtros e busca afetam apenas a visualização, sem alterar dados.

## Integração com Cliente 360

O Cliente 360 navega para o Kanban usando:

```txt
/vendas?clienteId=ID&oportunidadeId=ID
```

Na tela `/vendas`, essa origem permite:

- indicar o cliente de origem;
- destacar visualmente a oportunidade aberta;
- exibir o botão para voltar ao cliente de origem;
- manter o board global sem filtro automático pelo `clienteId` da URL.

## Fora de escopo nesta fase

- Dashboard comercial do funil.
- Relatórios gerenciais.
- Permissões.
- Backend real.
- Autenticação real.
- Paginação.
- Automação de status ganho/perdido.
- Documentos comerciais.

## Próximos passos

Antes do versionamento da Fase 21:

1. Auditoria técnica.
2. `npm run build`.
3. Revisão visual/manual em `/vendas` e Cliente 360.
4. Commit manual.
5. Merge manual.
6. Tag manual.
7. Push manual.

## Próxima fase sugerida

Fase 22 — Agenda Comercial de Tarefas, com foco em organizar tarefas, follow-ups e compromissos comerciais em uma agenda centralizada.
