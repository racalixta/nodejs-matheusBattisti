const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home');
});


app.post('/books/insertbook', (req, res) => {

  const title = req.body.title;
  const pageqty = req.body.pageqty;

  const sqlQuery = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`;

  conn.query(sqlQuery, function(err) {
    if(err) {
      console.log(err);
      return
    }

    res.redirect('/');
  })

});

app.get('/books', (req, res) => {

  const sqlQuery = "SELECT * FROM books";

  conn.query(sqlQuery, function (err, data) {
    if(err) {
      console.log(err);
      return
    }

    const books = data;

    res.render('books', { books });
  });

});

app.get('/books/:id', (req, res) => {

  const id = req.params.id;

  const sqlQuery = `SELECT * FROM books WHERE id = ${id}`

  conn.query(sqlQuery, function(err, data) {
    if(err) {
      console.log(err);
      return
    }

    const book = data[0];

    res.render('book', { book });
  });

});


const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemysql2',
});

app.get('/books/edit/:id', (req, res) => {

  const id = req.params.id;

  const sqlQuery = `SELECT * FROM books WHERE id = ${id}`

  conn.query(sqlQuery, function(err, data) {
    if(err) {
      console.log(err);
      return
    }

    const book = data[0];

    res.render('editbook', { book });
  });

});


conn.connect(function(err) {

  if(err) {
    console.log(err);
  }

  console.log('Conectou ao MySQL...');

  app.listen(3000);

})
