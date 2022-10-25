const express = require('express');
const app = express();
const port = 3000;

const path = require('path');

const basePath = path.join(__dirname, 'templates');

const checkAuth = function(req, res, next) {
  
  // simulando um middleware em uma autenticação
  req.authStatus = true;

  if(req.authStatus) {
    console.log('Está logado, pode continuar.');
    // nesse caso ele seria redirecionado para a de uma pessoa logada, o next é obrigatorio
    next();
  } else {
    console.log('Não está logado, faça o login para continuar.');
    // nesse caso ele deve ser redirecionado para fazer login, o next é obrigatorio
    next();
  }

}

app.use(checkAuth);

app.get('/', (req, res) => {

  res.sendFile(`${basePath}/index.html`);




});

app.listen(port, () => { 
  console.log(`App rodando na porta ${port}...`);
});

 








