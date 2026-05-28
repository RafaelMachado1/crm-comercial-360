# Fase 12 — Clientes profissional

## 1. Identificação da fase

Projeto: CRM Comercial 360  
Fase: Fase 12  
Nome: Clientes profissional  
Branch: feature/fase-12-clientes-profissional  
Tag final prevista: v1.3.0  
Commit previsto: feat: improve customer management experience  
Status: Em preparação para implementação  

---

## 2. Objetivo da fase

Transformar a página Clientes em uma área profissional de gestão de carteira, aproximando o CRM Comercial 360 de um CRM real.

A Fase 12 deve evoluir a experiência de clientes com lista profissional, busca, filtros, cadastro completo, edição e resumo visual da carteira, sem implementar ainda o detalhe completo do cliente, tarefas, pedidos, oportunidades ou integrações reais.

---

## 3. Escopo da fase

Nesta fase serão implementados ou preparados:

- Lista profissional de clientes
- Botão + Cadastrar cliente
- Drawer ou modal de cadastro completo
- Pessoa Jurídica e Pessoa Física
- Campos principais do cliente
- Endereço principal
- Endereços adicionais
- Contatos do cliente
- Botão Alterar para edição
- Nome do cliente clicável, preparando navegação futura
- Busca por nome ou CNPJ/CPF
- Filtros por cidade, estado, e-mail e segmento, se viável nesta fase
- Card lateral Carteira de clientes
- Botão/opção Detalhar carteira, sem obrigatoriedade de tela real nesta fase
- Integração com fake API/localStorage existente, se compatível
- Estrutura inicial da feature customers, seguindo arquitetura por features
- Documentação da fase

---

## 4. Fora do escopo

Não faz parte desta fase:

- Página completa de detalhe do cliente
- Rota /app/clientes/:clienteId
- Tarefas dentro do cliente
- Registro de atividades dentro do cliente
- Oportunidades abertas dentro do cliente
- Pedidos e orçamentos dentro do cliente
- Notas fiscais
- Produtos mais comprados
- Limite de crédito
- Títulos financeiros
- Integração com backend real
- Integração com ERP
- Integração com OMIE
- Autenticação JWT real
- Migração completa das rotas para /app
- Redesign premium final
- Correção definitiva do CSS global
- Criação de testes automatizados

Esses pontos ficam para fases futuras, principalmente Fase 13, Fase 15, Fase 16, Fase 18 e Fase 19.

---

## 5. Estado atual encontrado no projeto

Arquivos verificados nesta etapa:

- src/pages/ClientesPage.tsx
- src/App.tsx
- src/components/layout/MainLayout.tsx
- src/components/layout/Sidebar.tsx
- src/data/mockData.ts
- src/services/customerService.ts
- src/services/clientesFakeApi.ts
- src/hooks/useCustomers.ts
- src/hooks/useCustomerFilters.ts
- src/stores/customerFiltersStore.ts
- src/types/crm.ts
- src/schemas/customerSchema.ts
- package.json

Resultado da leitura:

- Existe uma página atual de Clientes em src/pages/ClientesPage.tsx.
- A ClientesPage usa React Hook Form com zodResolver e customerSchema.
- A ClientesPage usa sonner para feedback via toast.
- A ClientesPage usa componentes globais já existentes: ClienteTable, ClienteModal, ClienteFilters, ClienteForm, CardIndicador, PageTitle e Section.
- A ClientesPage usa os hooks globais useCustomers e useCustomerFilters.
- A ClientesPage mantém estados locais para cliente prioritário, cliente selecionado em modal e cliente em edição.
- A ClientesPage exibe indicadores de clientes cadastrados e clientes ativos.
- O cadastro e a edição atuais são feitos em um formulário inline por ClienteForm, não em drawer/modal.
- A tabela atual recebe clientes filtrados, cliente prioritário, ações de prioridade, detalhes, edição e exclusão.
- Existe customerService em src/services/customerService.ts.
- O customerService usa mockData como base inicial e delega operações para clientesFakeApi.
- Existe fake API em src/services/clientesFakeApi.ts.
- A fake API usa a chave crm-clientes no localStorage por meio de utils/localStorage.
- A fake API simula espera assíncrona e implementa buscar, criar, atualizar e excluir clientes.
- Existe hook useCustomers em src/hooks/useCustomers.ts.
- useCustomers usa React Query com queryKey ["customers"], useQuery, useMutation e queryClient.setQueryData.
- useCustomers expõe customers, loading, error, loadCustomers, createCustomer, updateCustomer, deleteCustomer, clearError e simulateError.
- Existe hook useCustomerFilters em src/hooks/useCustomerFilters.ts.
- useCustomerFilters usa Zustand via useCustomerFiltersStore e aplica filterCustomers de utils/customerUtils.
- Existe store Zustand em src/stores/customerFiltersStore.ts com persistência em crm-customer-filters.
- Os filtros atuais persistidos são searchTerm, selectedStatus e selectedSegment.
- Existe mockData com três clientes iniciais e produtos em src/data/mockData.ts.
- O tipo Customer atual está em src/types/crm.ts e contém id, nome, cidade, segmento, status, totalComprado, dataCadastro e ultimaInteracao.
- O status atual do cliente é "ativo", "pendente" ou "inativo".
- O schema atual em src/schemas/customerSchema.ts valida nome, cidade, segmento e status.
- Rotas estão centralizadas em src/App.tsx.
- A rota atual de Clientes é /clientes e renderiza ClientesPage dentro de MainLayout.
- Não existe rota /app/clientes nem rota de detalhe /app/clientes/:clienteId.
- O layout principal está em src/components/layout/MainLayout.tsx.
- O MainLayout usa Header, Sidebar e useToggle para controlar abertura da sidebar.
- A Sidebar está em src/components/layout/Sidebar.tsx e possui links para Dashboard, Clientes, Produtos, Atividades e Vendas.
- O package.json confirma dependências compatíveis com a fase: React, Vite, TypeScript, Tailwind CSS, React Hook Form, Zod, React Query, Zustand, React Router, Sonner e Recharts.
- O package.json possui scripts dev, build, lint e preview; não há script tsc dedicado.
- Em src/types foi encontrado apenas src/types/crm.ts.
- Em src/schemas foi encontrado apenas src/schemas/customerSchema.ts.

Arquivos solicitados que não foram encontrados:

- Nenhum dos arquivos solicitados deixou de ser encontrado.

Pontos de atenção:

- O modelo atual de Customer é simples e ainda não contempla PJ/PF, CNPJ/CPF, e-mail, telefone, endereço, contatos ou segmentações profissionais completas.
- A busca atual depende de filterCustomers em utils/customerUtils e dos campos disponíveis no Customer atual.
- A implementação deve preservar compatibilidade com localStorage existente ou tratar migração gradual dos dados salvos em crm-clientes.
- A página atual ainda possui textos e estrutura herdados de fases anteriores, incluindo label "Roadmap React • Fase 10".
- A Fase 12 deve evitar alterar App.tsx, Sidebar e MainLayout, pois a navegação atual já atende ao acesso por /clientes.

---

## 6. Decisão de arquitetura

A Fase 12 seguirá arquitetura por features.

As pastas globais continuam existindo e não devem ser removidas:

- src/components
- src/hooks
- src/services
- src/types
- src/utils
- src/data
- src/schemas
- src/stores

A nova estrutura específica da feature Clientes poderá ser criada em:

src/features/customers

Essa estrutura será usada para componentes e arquivos específicos do módulo Clientes.

Regra prática:

- Componente genérico permanece em src/components
- Componente específico de clientes fica em src/features/customers/components
- Tipos específicos de clientes ficam em src/features/customers/types
- Schemas específicos de clientes ficam em src/features/customers/schemas
- Hooks específicos de clientes ficam em src/features/customers/hooks
- Services específicos de clientes ficam em src/features/customers/services
- Utils específicos de clientes ficam em src/features/customers/utils

Como já existem arquivos globais relacionados a clientes, a migração deve ser cuidadosa. Não mover arquivos antigos sem necessidade. Priorizar criação gradual e integração segura.

---

## 7. Estratégia segura de implementação

Como o projeto já existe, a implementação deve ser feita em blocos pequenos.

A Fase 12 não deve tentar refatorar o projeto inteiro. O foco será evoluir a página Clientes com o mínimo de risco.

Estratégia:

1. Analisar a ClientesPage atual antes de alterar.
2. Criar documentação e checklist.
3. Criar estrutura isolada da feature customers.
4. Criar tipos profissionais de cliente sem quebrar tipos existentes.
5. Criar componentes visuais isolados antes de integrar.
6. Criar o drawer/modal de cadastro em blocos pequenos.
7. Integrar a lista profissional na página.
8. Integrar cadastro/edição com fake API somente após validação dos componentes.
9. Testar visualmente no navegador.
10. Validar TypeScript a cada bloco.
11. Atualizar README apenas no fechamento.
12. Criar commit e tag somente no final.

---

## 8. Arquivos que provavelmente serão lidos

- src/pages/ClientesPage.tsx
- src/App.tsx
- src/components/layout/MainLayout.tsx
- src/components/layout/Sidebar.tsx
- src/data/mockData.ts
- src/services/customerService.ts
- src/services/clientesFakeApi.ts
- src/hooks/useCustomers.ts
- src/hooks/useCustomerFilters.ts
- src/stores/customerFiltersStore.ts
- src/types
- src/schemas
- package.json
- README.md

---

## 9. Arquivos que provavelmente serão criados

A implementação poderá criar:

- src/features/customers/components/CustomerList.tsx
- src/features/customers/components/CustomerListItem.tsx
- src/features/customers/components/CustomerSearchBar.tsx
- src/features/customers/components/CustomerPortfolioSidebar.tsx
- src/features/customers/components/CustomerFormDrawer.tsx
- src/features/customers/components/CustomerMainDataSection.tsx
- src/features/customers/components/CustomerAddressSection.tsx
- src/features/customers/components/CustomerContactsSection.tsx
- src/features/customers/types/customer.types.ts
- src/features/customers/schemas/customerSchema.ts
- src/features/customers/utils/customerUtils.ts

Somente se for necessário e aprovado em etapa específica, poderão ser criados:

- src/features/customers/hooks/useCustomerForm.ts
- src/features/customers/services/customerFeatureService.ts
- src/features/customers/data/customerOptions.ts

---

## 10. Arquivos que provavelmente serão alterados

A implementação poderá alterar:

- src/pages/ClientesPage.tsx

Somente se necessário e aprovado antes, poderá alterar:

- src/services/customerService.ts
- src/services/clientesFakeApi.ts
- src/hooks/useCustomers.ts
- src/hooks/useCustomerFilters.ts
- src/stores/customerFiltersStore.ts
- src/data/mockData.ts
- src/types relacionados a clientes
- src/schemas relacionados a clientes

Arquivos que devem ser evitados nesta fase:

- src/App.tsx
- src/components/layout/Sidebar.tsx
- src/components/layout/MainLayout.tsx
- src/App.css
- src/index.css
- vite.config.js
- package.json
- package-lock.json

---

## 11. Ordem de implementação planejada

### Bloco 1 — Analisar ClientesPage atual

Objetivo:
Entender exatamente como a página Clientes funciona hoje antes de modificar.

Tarefas:
- Ler ClientesPage atual
- Identificar imports
- Identificar hooks usados
- Identificar serviços usados
- Identificar tipos e schemas usados
- Identificar estados locais
- Identificar componentes usados
- Identificar pontos de risco
- Propor plano de integração

Critério:
- Nenhum arquivo alterado
- Plano claro antes de codar

---

### Bloco 2 — Criar estrutura da feature customers

Objetivo:
Criar a estrutura isolada da feature Clientes.

Tarefas:
- Criar src/features/customers
- Criar subpastas components, types, schemas, utils
- Criar arquivos base mínimos
- Não integrar na página ainda

Critério:
- TypeScript sem erro
- Nenhum arquivo existente alterado

---

### Bloco 3 — Criar tipos e schema profissional de cliente

Objetivo:
Modelar cliente profissional para suportar PJ/PF, endereços e contatos.

Tarefas:
- Criar tipo CustomerPersonType
- Criar tipo CustomerContact
- Criar tipo CustomerAddress
- Criar tipo ProfessionalCustomer
- Criar schema base com Zod, se compatível com o projeto atual
- Evitar quebrar tipos antigos

Critério:
- Tipos isolados
- Schema isolado
- TypeScript sem erro

---

### Bloco 4 — Criar componentes de lista profissional

Objetivo:
Criar visual da lista de clientes sem integrar ainda.

Tarefas:
- Criar CustomerList
- Criar CustomerListItem
- Exibir nome, razão social/CNPJ, e-mail, cidade/UF e botão Alterar
- Nome clicável, mas sem navegação real obrigatória nesta fase

Critério:
- Componentes isolados
- TypeScript sem erro

---

### Bloco 5 — Criar busca e filtros

Objetivo:
Criar componentes para busca e filtros da carteira.

Tarefas:
- Criar CustomerSearchBar
- Campo de busca por nome ou CNPJ/CPF
- Filtros por cidade/estado/e-mail/segmento, se fizer sentido com dados existentes
- Não integrar ainda

Critério:
- Componentes isolados
- TypeScript sem erro

---

### Bloco 6 — Criar card lateral Carteira de clientes

Objetivo:
Criar resumo visual da carteira.

Tarefas:
- Criar CustomerPortfolioSidebar
- Exibir total de clientes
- Exibir ativos, inativos recentes, inativos antigos e prospects
- Botão Detalhar carteira sem ação real obrigatória

Critério:
- Componente isolado
- TypeScript sem erro

---

### Bloco 7 — Criar CustomerFormDrawer base

Objetivo:
Criar estrutura inicial do drawer/modal de cadastro e edição.

Tarefas:
- Criar CustomerFormDrawer
- Props de abertura/fechamento
- Modo create/edit
- Botões Salvar, Salvar e cadastrar outro e Cancelar
- Não conectar ainda com fake API

Critério:
- Drawer/modal abre quando integrado futuramente
- TypeScript sem erro

---

### Bloco 8 — Criar seção Dados principais

Objetivo:
Criar campos principais do cliente.

Campos previstos:
- Pessoa Jurídica/Pessoa Física
- CNPJ ou CPF
- Razão social ou nome
- Nome fantasia
- Telefone
- E-mail
- Inscrição estadual
- SUFRAMA
- Segmento
- Rede
- Informações adicionais

Critério:
- Campos renderizam
- TypeScript sem erro

---

### Bloco 9 — Criar seção Endereço principal

Objetivo:
Criar campos de endereço.

Campos previstos:
- CEP
- Endereço
- Número
- Complemento
- Bairro
- Cidade
- Estado

Critério:
- Campos renderizam
- TypeScript sem erro

---

### Bloco 10 — Criar seção Contatos

Objetivo:
Criar campos de contatos do cliente.

Campos previstos:
- Nome
- Cargo
- Telefone
- E-mail
- Adicionar contato

Critério:
- Campos renderizam
- TypeScript sem erro

---

### Bloco 11 — Integrar lista profissional na ClientesPage

Objetivo:
Substituir ou reorganizar a visualização atual com a nova lista profissional.

Tarefas:
- Alterar src/pages/ClientesPage.tsx
- Preservar hooks e serviços existentes quando possível
- Integrar CustomerList
- Integrar CustomerSearchBar
- Integrar CustomerPortfolioSidebar
- Não quebrar cadastro existente ainda, se houver

Critério:
- Página Clientes abre
- Lista aparece
- Busca visual aparece
- Card lateral aparece
- TypeScript sem erro

---

### Bloco 12 — Integrar cadastro e edição

Objetivo:
Conectar CustomerFormDrawer ao fluxo real/fake de clientes.

Tarefas:
- Botão + Cadastrar cliente abre drawer
- Botão Alterar abre drawer em modo edição
- Salvar cria/edita cliente usando fluxo existente, se possível
- Manter localStorage/fake API compatível
- Validar campos obrigatórios

Critério:
- Cadastro funciona
- Edição funciona
- Lista atualiza
- TypeScript sem erro

---

### Bloco 13 — Teste visual e ajustes

Objetivo:
Validar funcionamento no navegador.

Tarefas:
- Rodar npm run dev
- Testar abrir Clientes
- Testar busca
- Testar cadastrar
- Testar editar
- Testar layout responsivo básico
- Corrigir erros críticos

Critério:
- Página Clientes funcional
- Sem erro de TypeScript
- Sem erro crítico no navegador

---

### Bloco 14 — Documentar e versionar

Objetivo:
Fechar a Fase 12.

Tarefas:
- Atualizar README
- Atualizar documentação da fase, se necessário
- Rodar npx tsc --noEmit
- Rodar npm run dev
- Criar commit
- Criar tag v1.3.0

Critério:
- README atualizado
- Commit criado
- Tag v1.3.0 criada
- Working tree limpo

---

## 12. Checklist técnico da Fase 12

### Preparação

- [x] Branch feature/fase-12-clientes-profissional criada
- [x] Git limpo antes da implementação
- [x] Documento da fase criado
- [x] Estado atual da ClientesPage analisado

### Implementação

- [x] Bloco 1 — ClientesPage atual analisada
- [x] Bloco 2 — Estrutura da feature customers criada
- [x] Bloco 3 — Tipos e schema profissional de cliente criados
- [x] Bloco 4 — Lista profissional criada
- [x] Bloco 5 — Busca e filtros criados
- [x] Bloco 6 — Card lateral Carteira criado
- [x] Bloco 7 — CustomerFormDrawer base criado
- [x] Bloco 8 — Seção Dados principais criada
- [x] Bloco 9 — Seção Endereço principal criada
- [x] Bloco 10 — Seção Contatos criada
- [x] Bloco 11 — Lista profissional integrada na ClientesPage
- [x] Bloco 12 — Cadastro e edição integrados
- [ ] Bloco 13 — Teste visual e ajustes realizados
- [ ] Bloco 14 — README, commit e tag realizados

### Validação

- [x] Página Clientes abre sem erro
- [x] Lista profissional aparece
- [x] Busca por nome/CNPJ funciona
- [x] Filtros funcionam, se implementados
- [x] Botão + Cadastrar cliente funciona
- [x] Drawer/modal abre
- [x] Cadastro funciona
- [x] Edição funciona
- [x] Card Carteira aparece
- [x] Nome do cliente aparece como clicável
- [ ] Demais páginas continuam funcionando
- [x] npm run dev funciona
- [x] npx tsc --noEmit passa sem erro

### Fechamento

- [ ] README atualizado
- [ ] Commit criado
- [ ] Tag v1.3.0 criada
- [ ] Branch enviada para o GitHub
- [ ] Tag enviada para o GitHub
- [ ] Merge para main realizado

---

## 13. Critérios de conclusão da fase

A Fase 12 só será considerada concluída quando:

- A página Clientes estiver profissionalizada
- A lista profissional estiver funcionando
- O cadastro de cliente estiver disponível
- A edição de cliente estiver disponível
- A busca estiver funcionando
- O card Carteira estiver visível
- A estrutura de customers estiver organizada
- Nenhum outro módulo tiver sido quebrado
- O projeto rodar sem erro
- npx tsc --noEmit passar sem erro
- README estiver atualizado
- Commit da fase estiver criado
- Tag v1.3.0 estiver criada

---

## 14. Comandos de validação

Durante a fase:

npm run dev

npx tsc --noEmit

git status --short --branch

Fechamento da fase:

git add .
git commit -m "feat: improve customer management experience"
git tag -a v1.3.0 -m "Versão 1.3.0 - clientes profissional com busca carteira e gestão"

Push será feito fora do Codex, no terminal normal:

git push origin feature/fase-12-clientes-profissional
git push origin v1.3.0


---

## 15. Validação parcial da implementação

A implementação parcial da Fase 12 foi validada manualmente após a integração da nova experiência visual da página Clientes e da persistência real de cadastro e edição.

Resultados confirmados:

- Página Clientes abre sem erro
- Nova lista profissional renderiza corretamente
- Busca e filtros funcionam
- Card Carteira de clientes aparece
- Botão + Cadastrar cliente abre o drawer
- Botão Alterar abre o drawer em modo edição
- Formulário profissional renderiza as seções Dados principais, Endereço principal e Contatos
- Campos aceitam preenchimento
- Contatos podem ser adicionados e removidos
- Cadastro real funciona
- Edição real funciona
- Dados persistem no localStorage
- Dados continuam disponíveis após atualizar a página com F5
- TypeScript validado com npx tsc --noEmit
- Vite inicia sem erro

Observação:

A fase ainda não foi fechada. Antes do commit e da tag v1.3.0, ainda será feita uma revisão final, possível ajuste visual/UX, atualização do README e validação final do fluxo completo.
