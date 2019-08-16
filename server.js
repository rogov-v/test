var express = require('express');
var app = express();
const bodyParser     = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://qwerty:w7PYCiOTGRrXqC68@cluster0-fguly.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

client.connect(err => {
  const collection = client.db("test").collection("test");
  // perform actions on the collection object

  require('./routes/index')(app, collection);
  //client.close();
});
app.use(express.static('public'));
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

