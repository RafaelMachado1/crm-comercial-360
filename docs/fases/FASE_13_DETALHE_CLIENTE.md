# Fase 13 — Detalhe profissional do cliente

## 1. Objetivo

Criar a base da página/tela de detalhe profissional do cliente no CRM Comercial 360.

A partir da lista profissional de clientes criada na Fase 12, o clique no nome do cliente deverá levar para uma rota de detalhe, permitindo visualizar informações completas do cliente e preparar a evolução futura de relacionamento comercial.

## 2. Contexto da fase anterior

A Fase 12 criou a área profissional de Clientes com:

- Lista profissional em cards
- Busca e filtros
- Card Carteira de clientes
- Drawer de cadastro
- Drawer de edição
- Dados principais
- Endereço principal
- Contatos
- Cadastro real com persistência
- Edição real com persistência
- Compatibilidade com clientes antigos no localStorage
- Tag v1.3.0

## 3. Escopo da Fase 13

Nesta fase, vamos criar a estrutura inicial da página de detalhe do cliente.

Escopo previsto:

- Criar documentação da fase
- Criar página CustomerDetailPage
- Criar rota /clientes/:clienteId
- Conectar clique no nome do cliente para navegar ao detalhe
- Buscar cliente pelo id usando useCustomers
- Adaptar Customer para ProfessionalCustomer
- Exibir estado de carregamento
- Exibir estado de erro
- Exibir estado de cliente não encontrado
- Exibir cabeçalho profissional do cliente
- Exibir card de dados principais
- Exibir card de endereço principal
- Exibir card de contatos
- Exibir seções placeholder para evolução futura:
  - Tarefas agendadas
  - Oportunidades abertas
  - Pedidos e atividades
  - Histórico comercial
  - Notas fiscais futuras
  - Produtos mais comprados futuramente

## 4. Fora de escopo nesta fase

Não será implementado nesta fase:

- Persistência de tarefas
- Persistência de oportunidades
- Persistência de pedidos
- Persistência de atividades
- CRUD completo de contatos dentro do detalhe
- CRUD completo de endereços dentro do detalhe
- Integração com backend real
- Integração com ERP
- Integração com emissão de notas fiscais
- Dashboard individual do cliente com métricas reais
- Rota com prefixo /app
- Refatoração global de rotas

## 5. Decisão de rota

A rota escolhida para esta fase será:

/clientes/:clienteId

Motivo:

O projeto atualmente usa rotas internas sem prefixo /app, como:

- /
- /clientes
- /produtos
- /atividades
- /vendas

Portanto, usar /clientes/:clienteId mantém consistência com o padrão atual do projeto.

## 6. Estratégia técnica

A página de detalhe deverá:

1. Usar useParams do react-router-dom para capturar clienteId.
2. Converter clienteId para number.
3. Usar useCustomers para carregar a lista atual.
4. Procurar o cliente com customers.find(customer => customer.id === Number(clienteId)).
5. Usar adaptCustomerToProfessionalCustomer para adaptar o Customer global para ProfessionalCustomer.
6. Renderizar os componentes visuais do detalhe.
7. Exibir fallback caso o cliente não exista.

## 7. Arquivos previstos para criação

- src/pages/CustomerDetailPage.tsx
- src/features/customers/components/CustomerDetailHeader.tsx
- src/features/customers/components/CustomerDetailMainDataCard.tsx
- src/features/customers/components/CustomerDetailAddressCard.tsx
- src/features/customers/components/CustomerDetailContactsCard.tsx
- src/features/customers/components/CustomerDetailPlaceholderSection.tsx

## 8. Arquivos previstos para alteração

- src/App.tsx
- src/pages/ClientesPage.tsx
- README.md

## 9. Arquivos que devem ser preservados inicialmente

- src/types/crm.ts
- src/schemas/customerSchema.ts
- src/services/customerService.ts
- src/services/clientesFakeApi.ts
- src/hooks/useCustomers.ts
- src/stores/customerFiltersStore.ts
- src/data/mockData.ts
- package.json
- package-lock.json

## 10. Plano de execução em blocos

### Bloco 1 — Diagnóstico inicial

- Confirmar branch
- Confirmar base v1.3.0
- Analisar rotas
- Analisar ClientesPage
- Analisar feature customers
- Definir rota de detalhe

### Bloco 2 — Documentação da fase

- Criar docs/fases/FASE_13_DETALHE_CLIENTE.md
- Documentar escopo
- Documentar fora de escopo
- Documentar plano de execução
- Documentar riscos

### Bloco 3 — Componentes visuais isolados

Criar componentes sem integrar rota ainda:

- CustomerDetailHeader
- CustomerDetailMainDataCard
- CustomerDetailAddressCard
- CustomerDetailContactsCard
- CustomerDetailPlaceholderSection

### Bloco 4 — Página de detalhe isolada

Criar CustomerDetailPage com:

- useParams
- useCustomers
- loading
- erro
- cliente não encontrado
- adaptação para ProfessionalCustomer
- renderização dos componentes de detalhe

### Bloco 5 — Rota de detalhe

Alterar App.tsx para registrar:

/clientes/:clienteId

### Bloco 6 — Navegação a partir da lista

Alterar ClientesPage.tsx para trocar o toast do handleSelectCustomer por navegação:

navigate(`/clientes/${customer.id}`)

### Bloco 7 — Validação visual

Validar:

- abrir /clientes
- clicar no nome do cliente
- navegar para detalhe
- acessar /clientes/:id diretamente
- acessar cliente inexistente
- voltar para lista
- testar refresh na página de detalhe

### Bloco 8 — Ajustes finais

Ajustar textos, layout e estados vazios se necessário.

### Bloco 9 — README

Atualizar README com a Fase 13.

### Bloco 10 — Validação final, commit e tag

- Rodar npx tsc --noEmit
- Rodar npm run dev
- Validar git status
- Criar commit
- Criar tag v1.4.0
- Push da branch
- Push da tag
- Merge na main

## 11. Riscos identificados

- clienteId vem como string na rota, enquanto Customer.id é number
- cliente pode não existir no localStorage
- cliente antigo pode não ter todos os campos profissionais
- dados de contatos e endereço podem estar vazios
- rota /clientes/:clienteId pode conflitar se App.tsx estiver mal ordenado
- clicar no cliente deve preservar a lista sem quebrar filtros
- navegar direto para detalhe precisa funcionar mesmo após refresh
- se useCustomers estiver carregando, a tela precisa mostrar loading
- se ocorrer erro na fake API, a tela precisa mostrar estado de erro

## 12. Critérios de aceite

A Fase 13 será considerada concluída quando:

- /clientes/:clienteId funcionar
- clicar no nome do cliente abrir a página de detalhe
- página de detalhe exibir dados principais
- página de detalhe exibir endereço principal
- página de detalhe exibir contatos
- página de detalhe exibir placeholders futuros
- cliente inexistente exibir mensagem adequada
- refresh na página de detalhe funcionar
- npx tsc --noEmit passar sem erros
- npm run dev iniciar sem erro
- README for atualizado
- commit for criado
- tag v1.4.0 for criada

## 13. Versionamento previsto

Branch:

feature/fase-13-detalhe-cliente

Commit previsto:

feat: add customer detail page

Tag prevista:

v1.4.0

Mensagem da tag prevista:

Versão 1.4.0 - detalhe profissional do cliente

## 14. Checklist técnico

- [x] Branch da fase criada
- [x] Diagnóstico inicial realizado
- [ ] Documento da fase criado
- [ ] Componentes visuais isolados criados
- [ ] CustomerDetailPage criada
- [x] Rota /clientes/:clienteId registrada
- [x] Clique no cliente conectado à navegação
- [x] Estado de loading implementado
- [x] Estado de erro implementado
- [x] Estado de cliente não encontrado implementado
- [x] Dados principais exibidos
- [x] Endereço principal exibido
- [x] Contatos exibidos
- [x] Placeholders futuros exibidos
- [x] Validação visual realizada
- [x] UX da lista ajustada
- [x] Botão Ver detalhes definido como ação principal da lista
- [x] Nome do cliente removido como ação clicável
- [ ] README atualizado
- [ ] npx tsc --noEmit executado sem erros
- [ ] npm run dev executado sem erros
- [ ] Commit criado
- [ ] Tag v1.4.0 criada
- [ ] Branch enviada ao GitHub
- [ ] Tag enviada ao GitHub
- [ ] Merge realizado na main

## 15. Decisão de UX — visualização e edição do cliente

Durante a validação da Fase 13, foi definido que a tela de detalhe do cliente deve ser a central principal de gestão do relacionamento com o cliente.

A página de lista de clientes deve funcionar como uma visão rápida da carteira, permitindo localizar clientes, consultar informações resumidas e acessar o detalhe.

O fluxo recomendado passa a ser:

1. O usuário acessa a página Clientes.
2. O usuário clica no nome do cliente.
3. O sistema navega para /clientes/:clienteId.
4. A página de detalhe exibe dados completos do cliente.
5. O botão Alterar dentro do detalhe deve iniciar o fluxo de edição do cliente.

Com isso, a edição principal do cliente deve acontecer a partir da página de detalhe, e não apenas diretamente pela lista.

A decisão final sobre o botão Alterar existente na lista será tratada em etapa posterior. As opções consideradas são:

- manter o botão Alterar na lista como atalho rápido;
- trocar o botão Alterar por Ver detalhes;
- remover o botão Alterar da lista e deixar o nome do cliente como principal entrada.

A preferência inicial é concentrar a gestão completa dentro do detalhe do cliente, mantendo a lista mais limpa e orientada à consulta.

### Decisão final sobre a lista de clientes

Após validação do fluxo, foi decidido que a lista de clientes não terá o nome do cliente como elemento clicável.

A entrada oficial para a página de detalhe será o botão Ver detalhes.

Com isso, o fluxo final fica:

1. O usuário acessa /clientes.
2. O usuário localiza o cliente pela lista, busca ou filtros.
3. O usuário clica em Ver detalhes.
4. O sistema navega para /clientes/:clienteId.
5. A página de detalhe exibe os dados completos.
6. O usuário clica em Alterar dentro do detalhe para editar os dados do cliente.

Essa decisão evita duplicidade de ações, melhora a clareza da interface e concentra a edição dentro da página de detalhe.

## 16. Validação da navegação e edição no detalhe

A navegação da lista para o detalhe do cliente foi validada manualmente.

Resultados confirmados:

- A página /clientes abre corretamente
- O clique no botão Ver detalhes navega para /clientes/:clienteId
- A página de detalhe do cliente abre corretamente
- O cabeçalho do cliente é exibido
- Os dados principais são exibidos
- O endereço principal é exibido
- Os contatos são exibidos
- As seções futuras aparecem como placeholders
- O botão Voltar retorna para a lista de clientes
- O botão Alterar abre o drawer de edição dentro da página de detalhe
- Os campos do cliente podem ser editados
- Contatos podem ser adicionados e removidos
- O botão Salvar atualiza o cliente real
- Os dados persistem no localStorage
- Os dados continuam salvos após atualizar a página com F5

Essa validação confirma que a página de detalhe deixou de ser apenas visual e passou a funcionar como central inicial de gestão e edição do cliente.
