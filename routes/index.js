var ObjectID = require('mongodb').ObjectID;

module.exports=function(app,db){
  app.get('/:keyName', function (req, res) {
    const userKey = req.params.keyName;
    db.findOne({key: userKey} , function (err, item) {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        console.log(item);
        console.log(userKey);
        res.send(item);
      } 
    });
  });
  app.post('/', function (req, res) {
    const item = {key: req.body.key, body: req.body.body };
    db.insertOne(item, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
       }  
    });
  });
  app.put ('/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(req.params.id) };
    console.log(details);

    const item = {key: req.body.key, body: req.body.body };
    db.update(details, item, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(item);
      } 
    });
  });
}