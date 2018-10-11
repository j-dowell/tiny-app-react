require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
// const ENV = process.env.ENV || "development";
const key = process.env.JWT_key;
const mongoUser = process.env.MONGO_USER;
const mongoPw = process.env.MONGO_PW
var MongoClient = require('mongodb').MongoClient,
  co = require('co'),
  assert = require('assert');
  const uri = `mongodb+srv://${mongoUser}:${mongoPw}@cluster0-btgde.mongodb.net/test?retryWrites=true`;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// co.wrap(function*() {
//   // Connection URL
//   var db = yield MongoClient.connect(uri, { useNewUrlParser: true });
//   console.log("Connected correctly to server");

//   // Get the collection
//   var col = db.db('tiny-app').collection('users');
//   var docs = yield col.find().toArray();
//   console.log(docs);

// }).catch(function(err) {
//   console.log(err.stack);
// });


app.get(`/token/:id`, (req, res) => {
  console.log('api token')
  jwt.verify(req.params.id, key, function(err, decoded) {
    if (err) {
      console.log('Tried to verify token and failed')
      let response = {
        auth: false,
        message: 'Failed to authenticate token.'
      }
      res.json(response)
    } else {
      console.log('Verified Token', decoded.id)
      res.json({auth:true})
    }
  })
});

app.post('/api/login', (req, res) => {
  console.log('making login request')
  console.log('req body', req.body)
  co(function*() {
    // Connection URL
    let db = yield MongoClient.connect(uri, { useNewUrlParser: true });
    console.log("Connected correctly to server");
  
    // Get the collection
    let col = db.db('tiny-app').collection('users');
    // Search for user by email
    let docs = yield col.find({email: req.body.email}).toArray();
    const user = docs[0];
    // Checking password
    if (user.password_digest === req.body.password) {
      const token = jwt.sign({ id: user._id }, key, {
        expiresIn: 86400 // expires in 24 hours
      });
      console.log('Token:', token)
      res.json({auth:true, token:token})
    } else {
      console.log('No token given, auth false')
      res.json({auth:false})
    }
  }).catch(function(err) {
    console.log(err.stack);
  });
});

// (async function() {
//   try {
//     const client = await MongoClient.connect(uri,{ useNewUrlParser: true });
//     const collection = client.db('tiny-app').collection('users')
//     collection.find({}).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     client.close();
//   });
//   } catch(e) {
//     console.error(e)
//   }
// })();


const port = process.env.PORT || 3005;
app.listen(port);

console.log('App is listening on port ' + port);