# Plano passo a passo - CRM Comercial 360

## Estado atual

- `main` oficial em `v1.9.0`
- branch atual da Fase 19: `feature/fase-19-itens-pedidos-orcamentos`
- Fase 19 funcionalmente concluída, aguardando auditoria final e versionamento

## Decisão central

- Pedidos como módulo próprio
- Cliente como visão 360
- Produtos como base
- Tarefas como agenda
- Oportunidades como funil
- Histórico como linha do tempo

## Sequência da Fase 19

1. Documentar arquitetura
2. Criar menu Pedidos na sidebar
3. Criar rota `/pedidos`
4. Criar página Pedidos
5. Listar pedidos globais
6. Criar `/pedidos/novo`
7. Permitir cliente pré-selecionado por query param
8. Reaproveitar `CustomerOrderForm` e `CustomerOrderItemsEditor`
9. Criar/editar pedido com itens
10. Simplificar `CustomerDetailPage`
11. Manter no cliente apenas atalhos e histórico
12. Validar fluxo completo
13. Atualizar README
14. Auditoria final
15. Commit/tag/merge manual

## Próximos passos depois da Fase 19

- Fase 20: conversão de orçamento em pedido ou organização comercial do ciclo de vendas
- Fase futura: PDF, impressão e envio
- Fase futura: backend Spring Boot
- Fase futura: autenticação real
- Fase futura: permissões e perfis de acesso
- Fase futura: relatórios comerciais mais completos

## Regra de trabalho

- uma fase por vez
- diagnóstico antes de código
- documentação antes de implementação
- validação TypeScript
- validação visual
- README só no final da fase
- Codex não faz commit/tag/push/merge

## Fora de escopo imediato

- WhatsApp
- ERP
- nota fiscal
- baixa real de estoque
- financeiro
- títulos
- portal do cliente
- dashboard real avançado
