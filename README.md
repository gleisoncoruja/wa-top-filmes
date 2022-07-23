# WA Top Filmes
## Teste Avaliativo WA
<br>
<br>

## Sobre o sistema

O backend busca via API do TMDB os 50 filmes que estão em alta e armazena na base de dados do sistema (<a href="https://www.mongodb.com/atlas/database" target="_blank"> MongoDB Atlas </a> ) essa busca e inserção na base de dados só ocorre ao clicar no botão <strong>Atualizar Base de Dados</strong> que faz um POST para o endpoint responsável por essa função.

Com a base de dados preenchida não precisamos mais ficar consumindo a API do <a href="https://www.themoviedb.org/" target="_blank">TMDB</a> pois já temos os dados em nossa database, assim toda requisição é feita através da
<a href="https://api-watopfilmes.netlify.app/" target="_blank"> nossa api </a> buscará as informações direto da nossa base de dados.

O sistema de paginação foi feito no backend, a cada página são retornado 10 filmes.

Front-End desenvolvido em ReactJS com uso do redux e react-router-dom.
Back-End desenvolvido em Node versão 16.15.0 com uso do Express.

## Versão demo online do frontend
<a href="https://watopfilmes.netlify.app/" target="_blank"> WA Top Filmes </a>

## Versão demo online do backend
<a href="https://api-watopfilmes.netlify.app/" target="_blank"> WA API Top Filmes </a>

## Veja algumas imagens abaixo e em seguida o  tutorial de instalação
<br>
<br>
<img src="./github/gif.gif" alt="imagem do sistema" />
<br>
<br>
<img src="./github/gif2.gif" alt="imagem do sistema" />
<br>
<br>
<br>

## Instalação do Back-End

Renomeie o arquivo `.env-copy` para `.env` e em seguida preencha-o com as informações necessárias para a conexão com o banco de dados <a href="https://www.mongodb.com/atlas/database" target="_blank"> MongoDB Atlas </a>, também será necessária uma API KEY do <a href="https://www.themoviedb.org/" target="_blank">TMDB</a>

Caso não saiba como gerar uma API KEY do <a href="https://www.themoviedb.org/" target="_blank">TMDB</a> veja o vídeo abaixo

<a href="https://www.youtube.com/watch?v=mO3gvkiLkio" target="_blank">Como criar API KEY do TMDB</a>



No prompt de comando navegue até a pasta do backend e execute o comando `npm i` aguarde até o final da instalação das dependências.

Para executar o backend digite o comando `npm run server` as tabelas serão criadas automaticamente no banco de dados. 

OBS: Lembre-se de criar um banco de dados previamente!

A versão do Node utilizada foi a `16.15.0`


## Instalação do front-end

No prompt de comando navegue até a pasta frontend, em seguida digite o comando `npm i` e aguarde a instalação das depedências.

Para executar o projeto, basta digitar o comando `npm start`


Pronto, agora seu sistema já está prontinho para ser utlizado.