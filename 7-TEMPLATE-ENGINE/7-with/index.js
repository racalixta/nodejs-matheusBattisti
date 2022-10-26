const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.get('/dashboard', (req, res) => {

  const items = ["Item a", "Item b", "Item c"];

  res.render('dashboard', {items})
});

app.get('/post', (req, res) => {

  const post = {
    title: "Aprender Node.js",
    category: "JavaScript",
    body: "Este arquivo irá te ajudar a aprender node.js",
    comments: 4,
  }

  res.render('blogpost', {post})
});

app.get('/', function (req, res) {

  const user = {
    name: "Matheus",
    surname: "Silkva",
    age: 30,
  }

  const palavra = "Teste";

  const auth = true;
  const approved = false;

                      // poderia ser apenas {user} para simplificar
  res.render('home', {user: user, palavra, auth, approved});
})



app.listen(3000, () => {
  console.log('Rodando...');
})

