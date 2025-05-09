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

### 3.1. Modelagem do banco de dados  (Semana 3)

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

---

### 3.1.1 BD e Models (Semana 5)

*Conteúdo a ser preenchido na Semana 5*

### 3.2. Arquitetura (Semana 5)

*Conteúdo a ser preenchido na Semana 5*

### 3.3. Wireframes (Semana 03)

*Conteúdo a ser preenchido na Semana 3*

### 3.4. Guia de estilos (Semana 05)

*Conteúdo a ser preenchido na Semana 5*

### 3.5. Protótipo de alta fidelidade (Semana 05)

*Conteúdo a ser preenchido na Semana 5*

### 3.6. WebAPI e endpoints (Semana 05)

*Conteúdo a ser preenchido na Semana 5*

### 3.7 Interface e Navegação (Semana 07)

*Conteúdo a ser preenchido na Semana 7*

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

*Conteúdo a ser preenchido na Semana 8*

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

*Conteúdo a ser preenchido na Semana 8*

## <a name="c5"></a>5. Referências

*Referências a serem adicionadas conforme o desenvolvimento do projeto*