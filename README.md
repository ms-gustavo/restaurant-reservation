<h1>Restaurant Reservation System</h1>

   <h2>Descrição</h2>
    <p>Este é um sistema de reservas para restaurantes, que visa gerenciar reservas de clientes de forma eficiente. O sistema controla a capacidade máxima do restaurante e permite o cancelamento de reservas, com o backend sendo responsável por toda a lógica e controle.</p>

   <h2>Funcionalidades</h2>
    <ul>
        <li>Criação de reservas com controle de capacidade máxima do restaurante.</li>
        <li>Cancelamento de reservas com liberação da capacidade.</li>
        <li>Sistema preparado para futuras implementações de módulos, como cardápio e controle de estoque.</li>
    </ul>

   <h2>Estrutura do Projeto</h2>
    <pre>
prisma/
 └── migrations/
src/
 └── container/
     └── index.ts
 └── modules/
     └── reservations/
         └── controllers/
         └── dtos/
         └── mocks/
         └── repositories/
         └── routes/
         └── useCases/
 └── shared/
     └── errors/
     └── http/
     └── middlewares/
     └── prisma/
 └── .env.example
 └── jest.config.js
 └── package.json
 └── tsconfig.json
    </pre>

  <h2>Pré-requisitos</h2>
    <ul>
        <li><a href="https://nodejs.org/">Node.js</a> versão 14 ou superior</li>
        <li><a href="https://www.prisma.io/">Prisma</a> para gerenciamento de banco de dados</li>
    </ul>

  <h2>Instalação</h2>
    <ol>
        <li>Clone o repositório:</li>
        <pre><code>git clone https://github.com/ms-gustavo/restaurant-reservation-system.git</code></pre>
        <li>Instale as dependências:</li>
        <pre><code>npm install</code></pre>
        <li>Configure o arquivo de variáveis de ambiente:</li>
        <pre><code>cp .env.example .env</code></pre>
        <li>Execute as migrações do Prisma:</li>
        <pre><code>npx prisma migrate dev</code></pre>
    </ol>

  <h2>Execução do Projeto</h2>
    <p>Após realizar a instalação e configuração, execute o projeto com o comando:</p>
    <pre><code>npm run dev</code></pre>

   <h2>Testes</h2>
    <p>Os testes unitários foram implementados utilizando o framework <strong>Jest</strong>. Para rodar os testes, utilize o comando:</p>
    <pre><code>npm run test</code></pre>

  <h2>Contribuições</h2>
    <p>Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests no repositório.</p>

   <h2>Licença</h2>
    <p>Este projeto está licenciado sob a licença MIT.</p>
