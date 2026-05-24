# Fase 07 — Anotações pessoais

## O que vou estudar nesta fase

Nesta fase, vou estudar autenticação fake, Context API e rotas privadas.

## O que preciso entender bem

- Autenticação fake simula login sem backend.
- Context API permite compartilhar usuário logado na aplicação.
- Provider disponibiliza dados para os componentes filhos.
- `useContext` permite consumir dados do contexto.
- `localStorage` mantém o usuário logado após atualizar a página.
- Rotas privadas protegem páginas internas.
- `Navigate` redireciona o usuário.
- `Outlet` renderiza rotas filhas protegidas.
- Logout remove usuário do state e do localStorage.

## Como isso será aplicado no CRM

Nesta fase, vou criar:

- página de login;
- contexto de autenticação;
- usuário fake;
- login;
- logout;
- rotas privadas;
- exibição do usuário logado no Header;
- persistência do login no navegador.

## Observação

Esta fase é importante porque aproxima o CRM de um sistema real, com controle de acesso e proteção das páginas internas.