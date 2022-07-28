<a href="https://huggy.io">
  <img src="https://www.huggy.io/imagens/new-logo-huggy-dark.svg" height="25" />
</a>

# Desafio técnico Huggy

Seja bem vindo ao repositório com o código de resolução do desafio tecnico para a vaga PHP Fullstack da [Huggy](https://huggy.io/).

Sinta-se a vontade para contribuir ou explorar o código

**[Estrutura do projeto](#estrutura-do-projeto)**<br>
**[Intalação](#instalação)**<br>
**[Requisitos](#requisitos)**<br>

## Estrutura do projeto

```
.
├── api                                # Aplicação backend Laravel
├── web                                # Aplicação frontend Vue.js
├── LICENSE                            # Licença (MIT) do projeto
├── README                             # README do projeto
└── api-huggy.postman_collection.json  # Coleção de request para consumo da API
```

## Instalação:

A instalação dos projetos pode ser dividida nas seguintes etapas

### Api

Antes de começar é importante verificar os requisitos para instalação do projeto aqui.

Após clonar o projeto vá para a pasta `api`. Uma vez dentro de `api` execute inicialmente:

```
composer install
```

Isto instalará as dependências do projeto.

Feito isso será necessário configurar as variáveis de ambiente do projeto. Para tal é necessário criar um arquivo `.env`.

O projeto já dispõe de um arquivo modelo, portanto, basta copiar `.env.example` para seu arquivo `.env` com:

```
cp .env.example .env
```

Após essa etapa adicione as variáveis para permitir uma conexão com o banco de dados. No seu arquivo .env procure por elas e as preencha. Deverá ficar parecido com isto:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=<nome_do_seu_schema>
DB_USERNAME=<username_do_banco_de_dados>
DB_PASSWORD=<senha_do_banco_de_dados>
```

Com essa etapa concluida, iremos executar os comandos para criar a chaves de criptografia do projeto e executar as migrations no banco de dados. Para isso execute:

```
php artisan key:generate;
php artisan passport:keys;
php artisan migrate;
```

Feito isso a api já estará pronta para testes. Execute `php artisan serve` para iniciar o servidor de desenvolvimento.

Você pode realizar testes na Api através de algum cliente de api como o _Postman_ ou o _Insominia_. Para tal será necessário gerar um token de autenticação executando e você pode fazer isso através do `php artisan tinker`. Na cli do _Tinker_ basta executar:

```
\App\Models\User::factory()->create()->createToken('api')->accessToken;
```

Isso irá criar um usuário e vincula-lo a um token de autenticação. Agora basta copiar o token, cola-lo no seu cliente de api e já será possível realizar seus testes na api.

Para permitar o login com a conta da _Huggy_ será necessário configurar as seguintes variáveis no `.env`:

```
HUGGY_CLIENT_ID=
HUGGY_CLIENT_SECRET=
HUGGY_REDIRECT=
HUGGY_AUTH_URL=
HUGGY_API_URL=
```

Os valores de `HUGGY_CLIENT_ID` e `HUGGY_CLIENT_SECRET` devem ser preenchidos com seus respectivos valores obtidos ao [criar um app na _Huggy_](https://help.huggy.io/api/como-autenticar-na-api-v-3).

Os valores de `HUGGY_AUTH_URL` e `HUGGY_API_URL` devem ser preenchidos respectivamente com os valores _https://auth.huggy.app_ e _https://api.huggy.app/v3_.

O valor de `HUGGY_REDIRECT` deverá ser preenchido com a url do cliente (aplicação web). Para o caso dessa sistema é interessante que seja utilizado um _túnel http_ utilizando o [_Ngrok_](https://ngrok.com/)

### Web

Para instalar as dependências do app web basta executar:

```
yarn install
```

Com as dependências do projeto devidamente instaladas será necessário configurar as variáveis de ambiente para possibilitar autenticação e consumo de dados na api. Assim como já foi feito com o arquivo `.env` da api basta copiar o modelo de `.env.example` executando:

```
cp .env.example .env
```

Para poder autenticar com login social utilizando a Huggy será necessário criar um app na huggy ou utilizar o app criado no passo anterior.

Preencha `VITE_HUGGY_AUTH_SERVICE_URL` com uma url no seguinte formato:

```
https://auth.huggy.app/oauth/authorize?scope=install_app%20read_agent_profile&response_type=code&client_id={client_id}
```

O valor de `{client_id}` deve ser correpondente ao id do cliente gerado na plataforma huggy. Veja mais detalhes [aqui](https://help.huggy.io/api/como-autenticar-na-api-v-3).

O valor de `VITE_BACKEND_SERVICE_URL` deve ser preenchido com a url do servidor da api, por exemplo: `http://localhost:8000`.

Para preencher os valores de `VITE_BACKEND_SERVICE_CLIENT_ID` e `VITE_BACKEND_SERVICE_CLIENT_SECRET` sera necessário executar no projeto da api o seguinte comando para gerar um client_id e um client_secret para a aplicação web:

```
php artisan passport:client
```

Preencha .env com os dados respectivos e basta executar `yarn dev`. Vale salientar que ao executar o comando acima só é necessário responde à pergunta `What should we name the client?:`.

Feito isso, para uma melhor experiência é interessante que seja utilizado o [_Ngrok_](https://ngrok.com/) para criar um tunel para que o endereço gerado possa ser utilizado como url de redirect nas configurações do app no painel da _Huggy_.

### Integração Huggy

Para realizar integrações com os processos de flow da huggy é necessário utilizar o [_Ngrok_](https://ngrok.com/) para expor o ambiente de desenvolvido local e criar um token para autenticar. Para tanto execute:

```
\App\Models\User::factory()->create()->createToken('api')->accessToken
```

Caso já hajam usuários cadastrados no banco de dados basta trocar o valor de `<id>` pelo id do usuário e executar:

```
\App\Models\User::find(<id>)->createToken('api')->accessToken;
```

## Requisitos

Este projeto foi desenvolvido utilizando as seguintes ferramentas:

### Frontend

* [Node v16.14.0](https://nodejs.org/en/)

* [Yarn v1.22.18](https://yarnpkg.com/)

* [Vue 3](https://vuejs.org/)

### Backend

* [PHP v8.1.8](https://www.php.net/)

* [Composer v2.3.10](https://getcomposer.org/)

* [Laravel 9](https://laravel.com/)

* [MySql v8.0.29](https://www.mysql.com/)
### Outras

* [Ngrok](https://ngrok.com/)

* [Huggy](https://www.huggy.io/)

* [Postman](https://www.postman.com/)

* [Insominia](https://insomnia.rest/)