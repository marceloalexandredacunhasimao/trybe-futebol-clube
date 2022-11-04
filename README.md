# Trybe Futebol Clube

## Sobre o projeto

O TFC é um site informativo sobre partidas e classificações de futebol!

Neste projeto foi implementado um back-end dockerizado utilizando modelagem de dados através do Sequelize para ser integrado a um front-end já fornecido pela Trybe (escola de programação online). As tabelas usadas para verificar o funcionamento do projeto são populadas com jogos de futebol fictícios.

Com o Trybe Futebol Clube é possível adicionar, finalizar e editar partidas, consultar placares e classificação. Foram implementados diferentes níveis de acesso, de modo que o usuário comum pode fazer consultas, mas para fazer alterações como criar, editar e finalizar partidas é necessário fazer login como administrador.

Para implementar o projeto foram utilizados conceitos de Docker, Node.js, TypeScript, Express e Sequelize. O projeto foi implementado utilizadando a arquitetura MSC e para fazer as validações das senhas criptografadas do banco de dados foi utilizada a biblioteca JWT. O frontend e os arquivos .yml, .sql, .sh deste projeto foram fornecidos pela Trybe. Os testes unitários foram desenvolvidos utilizando Mocha, Chai e Sinon.

## Configurações mínimas para execução do projeto

Na sua máquina deve ter:

* Sistema Operacional Distribuição Unix
* Node versão >=16.15.0 LTS
* Docker
* Docker-compose versão >=1.29.2

## Orientações para a execução do projeto

Faça o clone do projeto:

    git clone git@github.com:marceloalexandredacunhasimao/trybe-futebol-clube.git

Inicialize a execução do projeto:

    cd trybe-futebol-clube
    npm run compose:up

O funcionamento do projeto pode ser verificado inserindo o endereço http://127.0.0.1/3000 no navegador ou por meio de requisições feitas diretamente para o back-end na porta 3001.

O banco de dados é pré-populado com dois usuários para testes. Para fazer login como administrador utilize o e-mail "admin@admin.com" e a senha "secret_admin", para fazer login como usuário comum utilize o e-mail "user@user.com" e senha "secret_user".
