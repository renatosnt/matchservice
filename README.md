
# Trabalho Prático de PDS

Agendamento de Serviços Locais.

## Membros
- Bruna Caroline Cardoso da Silva - 2021049404 - Fullstack
- Gabriel Teixeira - 2020054420 - Fullstack
- Michel Barros da Fonseca - 2020006906 - Fullstack
- Renato Santos - 2020006981 - Fullstack

## Escopo

### Objetivo do Sistema

Desenvolver uma plataforma que conecte usuários a prestadores de serviços locais de diversas categorias, permitindo agendar serviços de maneira eficiente, segura e confiável. O sistema visa facilitar o acesso a serviços essenciais, melhorar a gestão de agenda dos prestadores e proporcionar uma experiência de usuário que incentive a fidelização e o uso recorrente da plataforma.

### Principais Features
#### Para Usuários (Clientes):
Cadastro e Login: Perfis personalizados com autenticação segura.

Busca de Serviços: Busca avançada por categoria, localização, avaliação e disponibilidade.

Agendamento Online: Interface intuitiva para agendar serviços com base na disponibilidade do prestador.

Pagamentos Integrados: Sistema de pagamento seguro para realizar pagamentos online.

Avaliações e Comentários: Após a conclusão do serviço, os usuários podem avaliar os prestadores e deixar comentários.

Histórico de Serviços: Acesso fácil a histórico de agendamentos e serviços contratados.

#### Para Prestadores de Serviços:
Perfil do Prestador: Páginas de perfil com detalhes sobre os serviços oferecidos, preços, localização, horários disponíveis e avaliações.

Gerenciamento de Agenda: Ferramentas para gerenciar horários de trabalho, disponibilidade para agendamentos e acompanhamento de compromissos.

Recebimento de Pagamentos: Integração com sistemas de pagamento para recebimento direto na plataforma.

Notificações: Alertas sobre novos agendamentos, mudanças de horário, e avaliações recebidas.


## Tecnologias

### Backend
- Node.js 
- PostgreSQL

### Frontend
- React

## Backlog do Produto

- Como usuário gostaria de criar e acessar uma conta no sistema.
- Como cliente gostaria de visualizar os serviços disponíveis.
- Como prestador de serviço gostaria de anunciar meus serviços no meu perfil.
- Como cliente gostaria de filtrar os serviços disponíveis baseado em vários critérios.
- Como cliente gostaria de ver mais informações sobre o prestador de algum serviço.
- Como cliente gostaria de visualizar o número de telefone de um prestador de serviço para entrar em contato.
- Como prestador de serviço gostaria de ver o número de vezes que algum serviço meu foi visto por clientes.
- Como prestador de serviço gostaria de deletar serviços do meu perfil.
- Como cliente gostaria de ver o meu histórico de serviços visitados/solicitados.
- Como prestador de serviço gostaria de ver os meus serviços do ponto de vista de um cliente.
- Como prestador de serviço gostaria de disponibilizar meu calendário de dias disponíveis para os clientes.
- Como cliente gostaria de agendar o serviço na data especificada do prestador de serviço.
- Como cliente gostaria de ver os serviços que agendei com diversos prestadores de serviço.
- Como prestador de serviço gostaria de ver os meus serviços que foram agendados.
- Como prestador de serviço gostaria de cancelar os serviços agendados por quaisquer motivos.

## Backlog do Sprint

### história 1
### Como usuário, gostaria de criar e acessar uma conta no sistema.
  - Criar e estruturar a base de dados para armazenar usuários (Bruna)
  - Implementar a lógica de autenticação e criação de contas (Bruna)
  - Criar a interface de login e cadastro (Bruna)
### história 2
### Como cliente, gostaria de visualizar os serviços disponíveis.
  - Modelar e criar tabela para serviços, bem como implementar a sua relação com a tabela de prestadores de Serviço (Gabriel)
  - Criar a interface de listagem de serviços (Bruna)
  - Integrar a interface de listagem com a API de serviços (Bruna)
### história 3
### Como prestador de serviço gostaria de anunciar meus serviços no meu perfil.
- Adicionar, editar e remover serviços facilmente. (Renato)
- Incluir detalhes como nome, descrição, preço e fotos. (Renato)
- Confirmação visual de que as alterações foram salvas. (Renato)
### história 4
### Como cliente gostaria de ver mais informações sobre o prestador de algum serviço.
- Acesso a perfil completo do prestador com todos os serviços oferecidos. (Renato)
- Visualizar avaliações, comentários e portfólio de trabalhos anteriores. (Renato)
- Informações de contato claras para comunicação direta. (Renato)
### história 5
### Como cliente gostaria de filtrar os serviços disponíveis baseado em vários critérios.
- Implementar a lógica de busca de serviços. (Bruna)
- Implementar filtros por categoria de serviço. (Gabriel)
- Implementar filtros por localização do prestador de serviço. (Gabriel)
- Implementar filtros por avaliação do prestador de serviço. (Gabriel)
- Implementar filtros por horário de funcionamento do prestador. (Gabriel)
### história 6
### Como cliente gostaria de visualizar o número de telefone de um prestador de serviço para entrar em contato.
- Exibir, nas interfaces de um serviço e de perfil de um prestador, o número de telefone de tal prestador de serviço. (Gabriel).
### história 7
### Como prestador de serviço gostaria de deletar serviços do meu perfil.
- Implementar rota de DELETE para serviços na API. (Gabriel)
- Implementar validação da rota de DELETE (apenas o prestador de serviço criador de serviço X deve poder deletá-lo). (Gabriel)
- Criar um botão de delete, que deve ser exibido à um prestador de serviço, para cada um de seus serviços, quando acessar seu próprio perfil. (Gabriel)
- Implementar modal de confirmação de remoção do serviço. (Gabriel)
- Implementar tela/modal/pop-up de confirmação de remoção com sucesso. (Gabriel)
### história 8
### Como prestador de serviço gostaria de disponibilizar meu calendário de dias disponíveis para os clientes.
- Fornecer, no momento de criação de um serviço, a possibilidade de estabelecer datas de disponibilidade de serviço. (Gabriel)
- Exibir, em cada serviço, seus dias disponíveis. (Gabriel)
- Viabilizar a alterção da data de disponibilidade de um serviço, por parte do prestador de serviço. (Gabriel)
