# in-box-api


API de controle de CPF em lista negra. Podendo adicionar, remover e listar os CPFs. Com isso pode ser verificado se o CPF está ou não na lista. Retornando "FREE" para o que estiver fora da lista e "BLOCK" para o CPF que estiver na lista.

### Atenção para uso!

  - O controle de CPF não está com autenticação ainda. Sendo assim não há uma solicitação de usuário logado.
  - O controle de status conta requisições inválidas também, quando fizer a Verificação. Caso não seja do interesse faça um bloquei de envido de CPF incompletos, ao menos.


#### Dados técnicos

API usa algumas das bibliotecas open source:

* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework
* [nodemon](https://www.npmjs.com/package/nodemon) - manter o servidor rodando
* [iscpf](https://www.npmjs.com/package/iscpf) - verificador de CPF válido
* [string-mask](https://www.npmjs.com/package/string-mask) - Confirmação de montagem de máscara do CPF
* [mongoose](https://www.npmjs.com/package/mongoose) - Drive de acesso ao banco [MongoDB](https://www.mongodb.com/)

#### Dados técnicos para Teste Unitário

API usa algumas das bibliotecas open source:

* [chai](https://www.npmjs.com/package/chai) Framework de teste de javascript
* [istanbul](https://github.com/gotwarlost/istanbul#readme) Relatório de cobertura do teste
* [mocha](https://www.npmjs.com/package/mocha) Recurso de implementação de teste em javascript
* [supertest](https://www.npmjs.com/package/supertest) Recurso de acesso ao servidor para execuçaõ do teste

#### Instalação

API requer [Node.js](https://nodejs.org/) v8+ para rodar.

##### 1- Instalando dependências.

```sh
$ npm install
```

##### 2- Debugando

Com o banco rodando e configurando os dados de acesso no arquivo 
> /config/settings.js 

*5.* `mongoUrl: util.format('mongodb://%s/in-box-api', process.env.DB || 'localhost'),`

Feito isso, o processo pode ser executado:

```sh
$ npm start
```

#### Em Produção

No ambiente de produção recomenda-se utilizar o Docker. Segue os passos para o *build* de imagem e rodar o container. Nesse caso não precisa do banco, pois a imagem utiliza o banco interno.
Atenção: o container necessitará da porta **3000** de saída.

##### 1- Build image

```sh
$ docker image build -t [NOME_DA_IMAGE] .
```

##### 2- Rodar o container

```sh
$ docker container run -d --name [NOME_DO_CONTAINER] -P 3000:3000 --restart="always" [NOME_DA_IMAGE]
```

Verifica se está respondendo executando um método **GET** pela URL: 
> 127.0.0.1:3000/v1/cpfs .



License
----

MIT


**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
