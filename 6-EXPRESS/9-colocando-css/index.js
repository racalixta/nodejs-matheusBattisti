const express = require('express');
const app = express();
const port = 3000;

const path = require('path');

const basePath = path.join(__dirname, 'templates');


const users = require('./users')


// ler body

app.use(
  express.urlencoded({
    extend: true,
  }),
)

app.use(express.json())

// body ^^ 

// arquivos estaticos
app.use(express.static('public'));

app.use('/users', users);


app.get('/', (req, res) => {

  res.sendFile(`${basePath}/index.html`);

});






app.listen(port, () => { 
  console.log(`App rodando na porta ${port}...`);
});
