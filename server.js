require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
// const ENV = process.env.ENV || "development";
const key = process.env.JWT_key;
const mongoUser = process.env.MONGO_USER;
const mongoPw = process.env.MONGO_PW
var MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const uri = `mongodb+srv://${mongoUser}:${mongoPw}@cluster0-btgde.mongodb.net/test?retryWrites=true`;

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
  const user = {
    id: 1,
    email: 'test@gmail.com',
    password: 'test'
  }
  if (req.body.email === user.email && req.body.password === user.password) {
    var token = jwt.sign({ id: user.id }, key, {
      expiresIn: 86400 // expires in 24 hours
    });
    console.log(token)
    res.json({auth:true, token:token})
  } else {
    res.json({auth:false})
  }
});


(async function() {
  try {
    const client = await MongoClient.connect(uri,{ useNewUrlParser: true });
    const collection = client.db('tiny-app').collection('users')
    collection.find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    client.close();
  });
  } catch(e) {
    console.error(e)
  }
})();


const port = process.env.PORT || 3005;
app.listen(port);

console.log('App is listening on port ' + port);