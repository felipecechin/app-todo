## Aplicação lista de tarefas

### Tecnologias utilizadas

Para construção da aplicação, foram utilizadas as tecnologias:

- Node 16.14.0 e Yarn 1.22.15
- Framework Express 4.18.2
- MongoDB 5.0.0

## Ao clonar repositório

1. Executar comando ``yarn`` para instalar dependências;
2. Criar arquivo ``.env`` baseado no arquivo ``.env.example``;
3. Definir parâmetros de conexão ao MongoDB no arquivo ``.env``;
4. Executar comando ``yarn start:dev`` para rodar API na porta 3333;
5. Rotas criadas da API:
    1. ``GET`` ``/todo`` -> para buscar tarefas;
        - Rota retorna as tarefas de forma paginada de 5 em 5.
    2. ``POST`` ``/todo`` -> para adicionar tarefa;
       1. Tarefa pode ser criada passando, por exemplo, o objeto JSON no Body da requisição: 
       ```json
          {
            "description": "Levar cachorro para passear"
          }
       ```
    3. ``PUT`` ``/todo/:id`` -> para atualizar tarefa;
        1. Tarefa pode ser finalizada passando, por exemplo, o objeto JSON no Body da requisição: 
       ```json
          {
            "done": true
          }
       ```
    5. ``DELETE`` ``/todo/:id`` -> para deletar tarefa;
    6. ``PATCH`` ``/todo/:id/start-doing`` -> para iniciar execução da tarefa;
    7. ``PATCH`` ``/todo/:id/finish-doing`` -> para finalizar execução da tarefa.
