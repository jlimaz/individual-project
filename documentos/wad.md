# Web Application Document - Projeto Individual - Módulo 2 - Inteli

![Persona Carolina](/assets/tasky-banner.png)

#### Autor do projeto: José Antônio Ferreira de Lima

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

---

## <a name="c1"></a>1. Introdução

O Tasky é um sistema web de gerenciamento de tarefas projetado para profissionais que lidam com múltiplos projetos simultaneamente e precisam de uma ferramenta abrangente para organizar seu fluxo de trabalho. Diferentemente de outras soluções disponíveis no mercado, o Tasky oferece uma abordagem integrada que combina gerenciamento de tarefas com análise de produtividade e planejamento estratégico.

O sistema permite aos usuários criar, classificar e priorizar tarefas usando um sistema intuitivo de categorização. Os usuários podem dividir projetos complexos em subtarefas gerenciáveis, definir prazos realistas e monitorar o progresso através de painéis visuais personalizáveis. Uma funcionalidade diferencial do Tasky é a capacidade de integração com outras ferramentas essenciais de trabalho, como calendários, e-mails e plataformas de comunicação, eliminando a necessidade de alternar entre múltiplos aplicativos.

Além disso, o sistema oferece análises detalhadas de produtividade, identificando padrões de trabalho e sugerindo otimizações para aumentar a eficiência. O Tasky foi concebido para ser altamente personalizável, permitindo que cada usuário adapte a interface e funcionalidades às suas necessidades específicas de organização e detalhamento.

---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas

<div align="center">
<sub>FIGURA 1 - Persona (Carolina) </sub>
</div>
<div>

![Persona Carolina](/assets/persona-carolina.png)

<div align="center">
</div>
<div align="center">


<sub>FONTE: Produzido pelo autor, 2025</sub>
</div>

**Como o Tasky ajuda Carolina:**

O Tasky oferece a Carolina um sistema centralizado onde ela pode gerenciar todos os seus projetos e tarefas com o nível de detalhamento que ela necessita. A plataforma permite categorização avançada, integração com outras ferramentas que ela já utiliza e oferece relatórios de produtividade que ajudam Carolina a otimizar seu tempo e esforço. Com o Tasky, ela pode manter o controle completo sobre sua agenda profissional e pessoal sem precisar alternar entre diferentes aplicativos.

---

### 2.2. User Stories

- US01 | Como analista de projetos, quero poder categorizar minhas tarefas em   múltiplos níveis e dimensões (projeto, prazo, prioridade, área da vida), para que eu possa organizar meu trabalho de acordo com minha metodologia pessoal de produtividade

- US02 | Como profissional que gerencia múltiplos projetos, quero visualizar minhas tarefas em diferentes formatos (lista, quadro Kanban, calendário, timeline), para que eu possa adaptar a visualização conforme minha necessidade do momento.
- US03 | Como usuária de múltiplas ferramentas digitais, quero integrar o sistema  de tarefas com minhas outras plataformas de trabalho (email, calendário, Slack), para que eu possa centralizar informações sem perder atualizações importantes.

**Análise INVEST da US01:**

* **Independente:** Esta User Story pode ser implementada sem depender diretamente de outras funcionalidades. O sistema de categorização pode funcionar de forma autônoma, mesmo que outras features (como visualizações ou integrações) ainda não estejam implementadas.

* **Negociável:** A implementação pode ser ajustada em termos de quais níveis de categorização serão incluídos inicialmente. Podemos começar com categorização por projeto e prioridade, e adicionar dimensões adicionais em iterações futuras.

* **Valiosa:** Essa funcionalidade representa um diferencial claro para o usuário, pois atende diretamente à frustração da Carolina de "não conseguir classificar tarefas do jeito que precisa". É um valor tangível que aumenta significativamente a utilidade do sistema.

* **Estimável:** A equipe de desenvolvimento pode facilmente estimar o esforço necessário para criar diferentes níveis de categorização, pois envolve principalmente estruturas de dados e interfaces de usuário para seleção e filtragem - componentes com complexidade conhecida.

* **Small (Pequena):** A funcionalidade é suficientemente delimitada para ser implementada em um único sprint. Pode ser dividida em sub-itens ainda menores se necessário (ex: primeiro implementar categorização por projeto, depois por prioridade, etc).

* **Testável:** É possível verificar objetivamente se a funcionalidade atende aos requisitos através de testes como: "O usuário consegue criar uma nova categoria?", "As tarefas podem ser filtradas por múltiplas categorias simultaneamente?", "As categorias são persistidas corretamente no banco de dados?".

---

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados

<div align="center">
<sub>FIGURA 2 - Modelagem Database </sub>
</div>
<div>

![Modelagem Database](/assets/model-db.png)

<div align="center">
</div>
<div align="center">


<sub>FONTE: Produzido pelo autor, 2025</sub>
</div>

#### 3.1.1. Visão Geral

O modelo representa um sistema de **gerenciamento de tarefas**, permitindo o cadastro de usuários, atribuição de tarefas, categorização, controle de estados, além de anexos e comentários.

#### 3.1.2 Tabelas e Atributos

##### 1. **Users**
Armazena informações dos usuários do sistema.

- `id`: Identificador único do usuário (PK).
- `name`: Nome do usuário.
- `email`: E-mail do usuário (único e obrigatório).
- `password_hash`: Senha criptografada.
- `profile_photo`: URL da foto de perfil.
- `created_at`: Data de criação do usuário.

##### 2. **Tasks**
Contém as tarefas do sistema.

- `id`: Identificador único da tarefa (PK).
- `title`: Título da tarefa.
- `description`: Descrição detalhada.
- `created_at`: Data de criação.
- `due_date`: Data limite.
- `priority`: Prioridade (ex: baixa, média, alta).
- `category_id`: Chave estrangeira para a tabela `Categories`.
- `state_id`: Chave estrangeira para a tabela `States`.
- `supertask_id`: Auto-relacionamento para indicar subtarefas.

##### 3. **Categories**
Define categorias para agrupar tarefas.

- `id`: Identificador único (PK).
- `name`: Nome da categoria.

##### 4. **States**
Define os estados de uma tarefa (ex: "Pendente", "Concluída").

- `id`: Identificador único (PK).
- `name`: Nome do estado.

##### 5. **UserTask**
Tabela de associação entre usuários e tarefas (muitos-para-muitos).

- `id`: Identificador único (PK).
- `task_id`: Referência à tarefa.
- `user_id`: Referência ao usuário.
- `assigned_at`: Data de atribuição da tarefa ao usuário.

##### 6. **Comments**
Permite que os usuários comentem em tarefas.

- `id`: Identificador único (PK).
- `task_id`: Tarefa associada ao comentário.
- `user_id`: Autor do comentário.
- `message`: Conteúdo do comentário.
- `created_at`: Data do comentário.

##### 7. **Attachments**
Anexos relacionados às tarefas.

- `id`: Identificador único (PK).
- `task_id`: Tarefa associada ao anexo.
- `file_url`: URL do arquivo anexado.
- `uploaded_at`: Data de envio.

#### 3.1.3 Cardinalidade das Relações

- **Users ↔ UserTask ↔ Tasks**: Relação muitos-para-muitos.  
  Um usuário pode estar associado a várias tarefas e uma tarefa pode ter vários usuários atribuídos.

- **Tasks ↔ Categories**: Relação muitos-para-um.  
  Uma tarefa pertence a uma única categoria, mas uma categoria pode agrupar várias tarefas.

- **Tasks ↔ States**: Relação muitos-para-um.  
  Cada tarefa possui um único estado, mas um estado pode ser usado por várias tarefas.

- **Tasks ↔ Comments** e **Users ↔ Comments**: Relação um-para-muitos.  
  Uma tarefa pode ter vários comentários e um usuário pode comentar em várias tarefas.

- **Tasks ↔ Attachments**: Relação um-para-muitos.  
  Uma tarefa pode ter diversos arquivos anexados.

- **Tasks ↔ Tasks (supertask_id)**: Auto-relacionamento um-para-muitos.  
  Permite a criação de subtarefas ligadas a uma supertarefa.

#### 3.1.4 Modelagem Física

O arquivo SQL com o schema pode ser encontrado [clicando aqui](../scripts/db.sql)

``` sql
CREATE TABLE "Users" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar(100),
  "email" varchar(100) UNIQUE NOT NULL,
  "password_hash" varchar(255) NOT NULL,
  "profile_photo" varchar(255),
  "created_at" datetime DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "Categories" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar(50)
);

CREATE TABLE "States" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar(50)
);

CREATE TABLE "Tasks" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "title" varchar(150),
  "description" text,
  "created_at" datetime DEFAULT (CURRENT_TIMESTAMP),
  "due_date" datetime,
  "priority" varchar(10),
  "category_id" int,
  "state_id" int,
  "supertask_id" int
);

CREATE TABLE "UserTask" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "task_id" int,
  "user_id" int,
  "assigned_at" datetime DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "Comments" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "task_id" int,
  "user_id" int,
  "message" text,
  "created_at" datetime DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "Attachments" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "task_id" int,
  "file_url" varchar(255),
  "uploaded_at" datetime DEFAULT (CURRENT_TIMESTAMP)
);

COMMENT ON COLUMN "Tasks"."priority" IS 'Low, Medium, High, Urgent';

ALTER TABLE "Tasks" ADD FOREIGN KEY ("category_id") REFERENCES "Categories" ("id");

ALTER TABLE "Tasks" ADD FOREIGN KEY ("state_id") REFERENCES "States" ("id");

ALTER TABLE "Tasks" ADD FOREIGN KEY ("supertask_id") REFERENCES "Tasks" ("id");

ALTER TABLE "UserTask" ADD FOREIGN KEY ("task_id") REFERENCES "Tasks" ("id");

ALTER TABLE "UserTask" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("id");

ALTER TABLE "Comments" ADD FOREIGN KEY ("task_id") REFERENCES "Tasks" ("id");

ALTER TABLE "Comments" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("id");

ALTER TABLE "Attachments" ADD FOREIGN KEY ("task_id") REFERENCES "Tasks" ("id"); 

```

---

### 3.1.1 BD e Models

<div align="center">
<sub>FIGURA 3 - Diagrama MVC </sub>
</div>
<div>

![Modelagem Database](/assets/diagrama-mvc.png)

<div align="center">
</div>
<div align="center">


<sub>FONTE: Produzido pelo autor, 2025</sub>
</div>

Na Semana 5, foi realizada a modelagem e criação do banco de dados para o sistema, visando organizar e estruturar as informações necessárias de forma eficiente. O modelo relacional foi implementado utilizando as seguintes tabelas principais:

Users: armazena os dados dos usuários, incluindo nome, e-mail (único), hash da senha, foto de perfil e data de criação.

Categories: define as categorias das tarefas, permitindo uma classificação mais organizada.

States: representa os estados das tarefas (como "em andamento", "concluída", etc.), permitindo o controle de progresso.

Tasks: tabela central do sistema, que armazena as tarefas com informações como título, descrição, data de criação, data de vencimento, prioridade (podendo ser "Low", "Medium", "High" ou "Urgent"), além de permitir a categorização, o estado atual e a possibilidade de ser uma subtarefa (através de uma referência a outra tarefa).

UserTask: representa a relação de atribuição entre usuários e tarefas, permitindo que uma mesma tarefa possa ser atribuída a diferentes usuários, com o registro da data de atribuição.

Além disso, foram definidas as chaves estrangeiras para garantir a integridade referencial entre as tabelas:

category_id e state_id na tabela Tasks referenciam, respectivamente, Categories e States.

supertask_id na tabela Tasks possibilita a criação de hierarquia entre tarefas.

user_id e task_id na tabela UserTask garantem a associação correta entre usuários e tarefas.

Esse modelo permite gerenciar tarefas com múltiplos usuários, categorização, controle de estado e hierarquia de subtarefas, assegurando flexibilidade e robustez para futuras funcionalidades do sistema.

### 3.2. Arquitetura (Semana 5)

*Conteúdo a ser preenchido na Semana 5*

### 3.3. Wireframes (Semana 03)

<div align="center">
<sub>FIGURA 4 - Wireframe </sub>
</div>
<div>

![Wireframe](/assets/wireframe.png)

<div align="center">
</div>
<div align="center">


<sub>FONTE: Produzido pelo autor, 2025</sub>
</div>

### 3.4. Guia de estilos (Semana 05)

O guia de estilos do Tasky foi desenvolvido para garantir uma identidade visual consistente e moderna em toda a aplicação, facilitando a usabilidade e promovendo uma experiência agradável ao usuário. Os principais elementos definidos incluem a paleta de cores, espaçamentos, tipografia e componentes visuais.

#### Paleta de Cores

A paleta de cores foi escolhida para transmitir profissionalismo, clareza e foco. Tons de azul e cinza predominam, proporcionando contraste adequado e facilitando a leitura das informações. As cores principais são utilizadas para destacar ações importantes, estados de tarefas e elementos interativos.

<div align="center">
  <img src="/assets/colors.jpg" alt="Guia de Cores Tasky">
  <br>
  <sub>FIGURA 7 - Paleta de cores do sistema Tasky</sub>
</div>

#### Espaçamento

O sistema de espaçamento foi definido para garantir harmonia e organização entre os elementos da interface. Margens e paddings seguem uma escala modular, facilitando a manutenção do layout e a responsividade em diferentes dispositivos.

<div align="center">
  <img src="/assets/spacing.jpg" alt="Guia de Espaçamento Tasky">
  <br>
  <sub>FIGURA 8 - Guia de espaçamento do sistema Tasky</sub>
</div>

#### Tipografia

A tipografia utilizada é limpa e moderna, priorizando a legibilidade. Títulos, subtítulos e textos seguem uma hierarquia clara, com tamanhos e pesos bem definidos para facilitar a navegação e o entendimento das informações.

#### Componentes Visuais

Botões, campos de formulário, cartões de tarefa e outros componentes seguem o padrão visual estabelecido, com cantos arredondados, sombras suaves e feedback visual em interações. O uso consistente desses elementos contribui para a identidade do Tasky e para a experiência do usuário.

O guia de estilos serve como referência para todo o desenvolvimento front-end, garantindo que novas telas e funcionalidades mantenham a coerência visual e a qualidade da interface.

### 3.5. Protótipo de alta fidelidade (Semana 05)

Nesta etapa do projeto, foram desenvolvidos protótipos de alta fidelidade para as principais telas do sistema Tasky, utilizando ferramentas de design digital para simular a experiência real do usuário. Os protótipos foram criados com base nos requisitos levantados nas etapas anteriores e refletem a identidade visual, a navegação e as funcionalidades essenciais da aplicação.

#### Tela de Login

<div align="center">
  <img src="/assets/login-prototype.png" alt="Protótipo de alta fidelidade - Login">
  <br>
  <sub>FIGURA 5 - Protótipo de alta fidelidade: Tela de Login</sub>
</div>

A tela de login apresenta uma interface limpa e objetiva, com destaque para o campo de autenticação do usuário. O layout prioriza a usabilidade, facilitando o acesso rápido ao sistema. Elementos visuais como o logo do Tasky e a paleta de cores institucional reforçam a identidade da aplicação.

#### Tela de Dashboard (Kanban)

<div align="center">
  <img src="/assets/dashboard-prototype.png" alt="Protótipo de alta fidelidade - Dashboard">
  <br>
  <sub>FIGURA 6 - Protótipo de alta fidelidade: Dashboard Kanban</sub>
</div>

O dashboard foi projetado para oferecer uma visão clara e organizada das tarefas do usuário, utilizando o formato Kanban. Cada coluna representa um estado da tarefa (A Fazer, Fazendo, Feito), permitindo o gerenciamento visual e intuitivo do fluxo de trabalho. Os cartões de tarefa exibem informações essenciais como título, prioridade e categoria, além de permitir ações rápidas como mover entre colunas. O design busca equilibrar simplicidade e eficiência, proporcionando uma experiência agradável e produtiva.

Esses protótipos serviram como referência visual para o desenvolvimento front-end, garantindo alinhamento entre o design proposto e a implementação final do sistema.

### 3.6. WebAPI e endpoints (Semana 05)

#### Usuários (/users)
- **POST /users** — Cria um novo usuário.
- **GET /users** — Lista todos os usuários.
- **PUT /users/:id** — Atualiza os dados de um usuário específico pelo ID.
- **DELETE /users/:id** — Remove um usuário específico pelo ID.

#### Categorias (/categories)
- **POST /categories** — Cria uma nova categoria.
- **GET /categories** — Lista todas as categorias cadastradas.
- **PUT /categories/:id** — Atualiza uma categoria específica pelo ID.
- **DELETE /categories/:id** — Exclui uma categoria específica pelo ID.

#### Estados (/states)
- **POST /states** — Cria um novo estado de tarefa.
- **GET /states** — Lista todos os estados.
- **PUT /states/:id** — Atualiza um estado específico pelo ID.
- **DELETE /states/:id** — Remove um estado específico pelo ID.

#### Tarefas (/tasks)
- **POST /tasks** — Cria uma nova tarefa.
- **GET /tasks** — Lista todas as tarefas cadastradas.
- **PUT /tasks/:id** — Atualiza uma tarefa específica pelo ID.
- **DELETE /tasks/:id** — Exclui uma tarefa específica pelo ID.

#### UserTask (/usertasks)
- **POST /usertasks** — Atribui uma tarefa a um usuário.
- **GET /usertasks** — Lista todas as atribuições de tarefas a usuários.
- **DELETE /usertasks/:id** — Remove uma atribuição específica pelo ID.

### 3.7 Interface e Navegação (Semana 07)

A interface do Tasky foi cuidadosamente projetada para proporcionar uma experiência intuitiva, moderna e eficiente ao usuário. O sistema adota uma navegação clara, com elementos visuais bem definidos e acessíveis, facilitando o gerenciamento de tarefas e a localização das principais funcionalidades.

#### Estrutura de Navegação

O Tasky utiliza uma barra lateral fixa (sidebar) que permanece visível em todas as telas principais da aplicação. Nela, o usuário encontra atalhos para as áreas essenciais, como o Dashboard (Home) e as Configurações. Os ícones e rótulos facilitam a identificação rápida de cada seção, tornando a navegação mais fluida e reduzindo o tempo para encontrar funcionalidades importantes.

#### Fluxo do Usuário

1. **Login:** O acesso ao sistema se inicia pela tela de login, que apresenta um layout limpo e objetivo, focado na autenticação do usuário.
2. **Dashboard Kanban:** Após o login, o usuário é direcionado ao dashboard principal, onde visualiza suas tarefas organizadas em colunas Kanban (A Fazer, Fazendo, Feito). Cada cartão de tarefa pode ser arrastado entre as colunas, permitindo o gerenciamento visual do progresso.
3. **Criação e Edição de Tarefas:** O botão "Nova Tasky" está sempre em destaque no dashboard, facilitando a criação de novas tarefas. Ao clicar, o usuário acessa um formulário simples e direto para cadastrar uma nova tarefa.
4. **Configurações:** Através do menu lateral, o usuário pode acessar a área de configurações para ajustar preferências do sistema e dados pessoais.

#### Usabilidade e Responsividade

A interface foi desenvolvida com foco em responsividade, adaptando-se a diferentes tamanhos de tela, desde desktops até dispositivos móveis. Os componentes se reorganizam automaticamente para garantir boa usabilidade em qualquer contexto. Elementos interativos, como botões e cartões, possuem feedback visual para reforçar as ações do usuário.

#### Exemplos Visuais

- **Sidebar:** Disponível em todas as páginas principais, com ícones e textos para facilitar a navegação.
- **Dashboard Kanban:** Colunas bem definidas, cartões de tarefa com informações essenciais e possibilidade de movimentação via drag-and-drop.
- **Botão de Nova Tasky:** Sempre visível e de fácil acesso, incentivando a criação contínua de tarefas.

A navegação clara e a interface amigável do Tasky contribuem para uma experiência eficiente, tornando o gerenciamento de tarefas mais produtivo e agradável para o usuário.