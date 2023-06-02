# Emporium API

Para instalação:

- Execute yarn ou npm install
- Certifique-se de ter uma instância postgres rodando, seja pelo pg admin ou pelo docker (passos de criação da imagem no docker a seguir)
- Certifique-se que os dados de conexão de seu banco estejam corretos em src/app.modules.ts
- Rode o comando yarn typeorm migration:run quando seu banco estiver conectado para refletir as tabelas

Gerar intância no docker:

-  Você pode seguir este tutorial para instalá-lo e configurá-lo: [Instalando e configurando docker com postgres](https://docs.google.com/document/d/17_IfLPRJUvhAKDF__8gc729dWeQ3AaD-QHiLoYLzHtQ/edit)
Para consumo visual do database, recomendo o gerenciado SQL Table Plus

O que falta no projeto:

- Finalizar catchs, throw errors e exceções nos métodos da service e controller
- Finalizar e personalizar retornos das rotas, assim como status
- Inserir autenticação com JWT e proteger as rotas necessárias
- Realizar os testes unitários dos métodos do projeto
- Realizar teste integrado final com todas as rotas conversando

Desenvolvedores: Thayane Bomfim
