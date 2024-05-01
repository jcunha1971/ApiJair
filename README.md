# API Jair


## Funcionalidades

- Registro de usuário: Os usuários podem se registrar fornecendo informações como nome, email e senha. O sistema verifica se o usuário já existe antes de criar um novo registro.
  <img src="https://i.imgur.com/BYTT3ci.png">
- Obter todos os usuários:   Esta rota permite obter uma lista de todos os usuários registrados no sistema. É útil para fins administrativos e pode ser acessada apenas por usuários autenticados.
 <img src="https://i.imgur.com/SaKa4S3.png"> 
- Obter usuário por ID: Esta rota permite obter informações detalhadas de um usuário específico com base em seu ID. É útil para recuperar detalhes de perfil de usuário ou para realizar operações específicas em usuários individuais.
  <img src="https://i.imgur.com/XIvjpIh.png">
- Atualizar usuário por ID: Esta rota permite atualizar as informações de um usuário específico com base em seu ID. Os campos que podem ser atualizados incluem nome, email e senha. Antes de atualizar o usuário, o sistema verifica se o ID fornecido corresponde a um usuário existente e se as credenciais fornecidas são válidas.
  <img src="https://i.imgur.com/8ol0CbQ.png">
- Excluir usuário por ID: Esta rota permite excluir um usuário específico com base em seu ID. Antes de excluir o usuário, o sistema verifica se o ID fornecido corresponde a um usuário existente no banco de dados.
  <img src="https://i.imgur.com/xUNo8Ti.png">
## Ferramentas utilizadas
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- Bcrypt.js
- Postman

## Configuração do Projeto

- Alterar a SecretKey do arquivo src/config/auth.json.
- criar o arquivo .env na raiz do projeto e adicionar DB_USER, DB_PASSWORD, DB_NAME e DB_CLUSTER para a conexão com o banco de dados.