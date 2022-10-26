const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.get('/', function (req, res) {

  const user = {
    name: "Matheus",
    surname: "Silkva",
    age: 30,
  }

  const palavra = "Teste";

                      // poderia ser apenas {user} para simplificar
  res.render('home', {user: user, palavra});
})



app.listen(3000, () => {
  console.log('Rodando...');
})

