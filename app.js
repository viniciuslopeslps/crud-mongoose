var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./Book.model');

var port = 8080;
var db = 'mongodb://localhost/example'

//configuração do moongose
mongoose.connect(db);

//configuração do body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.send('happy to be here');
});

app.get('/books', function(req, res) {
  console.log('getting all books');
  Book.find({})
    .exec(function(err, books) {
      if(err) {
        res.send('error occured');
      } else {
        console.log(books);
        res.json(books);
      }
    });
});

app.get('/books/:id', function(req, res) {
  console.log('getting all books');
  Book.findOne({
    _id: req.params.id
    })
    .exec(function(err, books) {
      if(err) {
        res.send('error occured');
      } else {
        console.log(books);
        res.json(books);
      }
    });
});

//cria um registro de livro
app.post('/book', function(req, res) {
  var newBook = new Book();

  newBook.title = req.body.title;
  newBook.author = req.body.author;
  newBook.category = req.body.category;

  newBook.save(function(err, book) {
    if(err) {
      res.send('error saving book');
    } else {
      console.log(book);
      res.send(book);
    }
  });
});

//cria um registro de livro
app.post('/book2', function(req, res) {
  Book.create(req.body, function(err, book) {
    if(err) {
      res.send('error saving book');
    } else {
      console.log(book);
      res.send(book);
    }
  });
});


app.get("/book/:id", function(req, res){
  console.log("Getting one book");
  Book.findOne({
    _id: req.params.id
  }).exec(function(err, book){
    if(err) {
      res.send('error getting book');
    } else {
      console.log(book);
      res.send(book);
    }
  });
});

app.listen(port, function() {
  console.log('app listening on port ' + port);
});