require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const ENV = process.env.ENV || "development";

const key = process.env.JWT_key;
const mongoUser = process.env.MONGO_USER;
const mongoPw = process.env.MONGO_PW
const MongoClient = require('mongodb').MongoClient;
const url = `mongodb+srv://${mongoUser}:${mongoPw}@cluster0-btgde.mongodb.net/test?retryWrites=true`;
const dbName = 'tiny-app';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function hashPassword(password) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds)
  return hash;
}
const registerUser = async function(email, password, first_name, last_name) {
const client = new MongoClient(url, { useNewUrlParser: true });
  try{
    await client
      .connect()
      .catch(err => console.log(`Couldn't connect`, err));
    console.log('connected to database');
    const db = client.db(dbName);
    const password_digest = await hashPassword(password);
    console.log(password_digest);
    await db.collection('users')
      .insertOne({
        first_name,
        last_name,
        password_digest,
        email,
      })
      .catch(err => console.log(`Error adding user`, err));
  } catch(err) {
    console.log(err.stack);
  }
}

const verifyUserLogin = async function(email, password) {
const client = new MongoClient(url, { useNewUrlParser: true });
  try {
    // Connecting to Mongo
    await client
      .connect()
      .catch(err => console.log(`Couldn't connect`, err));
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    // Accessing users collection
    const col = db.collection('users');
    // Searching for user by email
    const user = await col
      .findOne({email: email})
      .catch(err => console.log(`Error finding user`, err))
    // If user exists in database
    if (user) {
      console.log(user)
      // Checking hashed password
      const passwordisValid = await bcrypt
        .compare(password, user.password_digest)
        .catch(err => console.log(`Password didn't match`, err))

      if (passwordisValid) {
        return {
          id: user._id,
          auth: true
        }
      } else {
        console.log(`Password doesn't match`)
        return {
          auth: false
        }
      }
      // If user doesn't exist in database
    } else {
      console.log(`Couldn't find user`)
      return {
        auth: false
      }
    }
  } catch(err) {
    console.log(err.stack);
  }
}


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

  verifyUserLogin(req.body.email, req.body.password)
    .then((result) => {
      console.log('verification result', result)
      if (result.auth === true) {
        const token = jwt.sign({ id: result.id }, key, {
          expiresIn: 86400 // expires in 24 hours
        });
        console.log('Token:', token)
        res.json({auth:true, token:token})
      } else {
        console.log('No token given, auth false')
        res.json({auth:false})
      }
    })
  .catch(err => console.log(err));
});

app.post('/api/register', (req, res) => {
  console.log('registering user');
  const { email, password, first_name, last_name } = req.body;
  registerUser(email, password, first_name, last_name);

})


const port = process.env.PORT || 3005;
app.listen(port);

console.log('App is listening on port ' + port);