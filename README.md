# Emporium API

<h2>Para instalação </h2>
<p align="right"><img alt="npm" src="https://img.shields.io/badge/-NPM-CB3837?style=flat-square&logo=npm&logoColor=white" /></p>

- Execute yarn ou npm install
- Certifique-se de ter uma instância postgres rodando, seja pelo pg admin ou pelo docker (passos de criação da imagem no docker a seguir)
- Certifique-se que os dados de conexão de seu banco estejam corretos em src/app.modules.ts
- Ou conecte-se a um banco na nuvem
- Ao executar yarn start:dev as tabelas já serão refletidas no banco

<h2>Gerar intância no docker </h2>
<p align="right"><img alt="Docker" src="https://img.shields.io/badge/-Docker-46a2f1?style=flat-square&logo=docker&logoColor=white" /></p>

-  Você pode seguir este tutorial para instalá-lo e configurá-lo: [Instalando e configurando docker com postgres](https://docs.google.com/document/d/17_IfLPRJUvhAKDF__8gc729dWeQ3AaD-QHiLoYLzHtQ/edit)
- Para consumo visual do database, recomendo o gerenciado SQL Table Plus

<h2>O que falta no projeto </h2>
<p align="right"><img alt="NestJs" src="https://img.shields.io/badge/-NestJs-ea2845?style=flat-square&logo=nestjs&logoColor=white" /></p>

- Finalizar os testes unitários dos módulos: article, content, topic, trail, auth
- Atingir 100% no coverage após finalizar as implementações dos testes unitários

Atual 55,37%:

![image](https://github.com/thayaneBomfims/emporium-api/assets/63521435/dfafafd1-bab3-478a-a1fe-b4ff667ca99d)


Desenvolvedores: Thayane Bomfim
