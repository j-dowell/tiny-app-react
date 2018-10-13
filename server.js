require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const assert = require('assert');
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const hashPassword = require('./helpers/bcrypt');

// Helper functions
const randomIdGenerator = require('./helpers/randomIdGenerator')

// JWT key
const key = process.env.JWT_key;

// Mongo setup
const mongoUser = process.env.MONGO_USER;
const mongoPw = process.env.MONGO_PW
const url = `mongodb+srv://${mongoUser}:${mongoPw}@cluster0-btgde.mongodb.net/test?retryWrites=true`;
const dbName = 'tiny-app';

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


async function doesUserExist(email) {
  const client = new MongoClient(url, { useNewUrlParser: true });
  try {
    await client
      .connect()
      .catch(err => console.log(`Couldn't connect`, err));
    const db = client.db(dbName);
    const user = await db.collection('users')
      .findOne({ email: email })
      .catch(err => console.log('Error retrieving user', err));
    if (user) {
      return true;
    } else {
      return false;
    }
  }
  catch(err) {
    console.log(err.stack);
  }
}

const verifyToken = (token) => {
  const decoded = jwt.verify(token, key);
  console.log(decoded);
  return {
    userID: decoded.id
  }
}

const registerUser = async function(email, password, first_name, last_name) {
  const client = new MongoClient(url, { useNewUrlParser: true });
  try {
    await client
      .connect()
      .catch(err => console.log(`Couldn't connect`, err));
    console.log('Connected to database');
    const db = client.db(dbName);
    const password_digest = await hashPassword(password);
    const userExists = await doesUserExist(email);
    if (userExists) {
      console.log('Email already exists!');
      return { auth:false };
    } else {
      const newUserObject = await db.collection('users')
        .insertOne({
          first_name,
          last_name,
          password_digest,
          email,
          urls: []
        })
        .then(response => {
          console.log(response.ops[0])
          return response.ops[0] // return user object after registering
        })
        .catch(err => console.log(`Error adding user`, err));
      return {...newUserObject, auth:true};
    }
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
      .findOne({ email: email })
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

const findUserUrlList = async function(id) {
  const client = new MongoClient(url, { useNewUrlParser: true });
  const userID = new mongodb.ObjectID(id);
  try {
    await client
      .connect()
      .catch(err => console.log(`Couldn't connect`, err));
    const db = client.db(dbName);
    const user = await db.collection('users')
      .findOne({_id: userID})
      .catch(err => console.log('error retrieving user', err));
    if (user) {
      console.log(user);
      return user;
    }
  }
  catch(err) {
    console.log(err.stack);
  }
}

app.get('/api/urlList/:userToken', (req, res) => {
  console.log('Trying to find urls');
  jwt.verify(req.params.userToken, key, function(err, decoded) {
    if (err) {
      console.log('Tried to verify token and failed', err)
      let response = {
        auth: false,
        message: 'Failed to authenticate token.'
      }
      res.json(response)
    } else {
      console.log('Verified Token', decoded.id)
      findUserUrlList(decoded.id)
        .then(response => {
          console.log(response);
          res.json(response)
          })
        .catch(err => console.log(err));
    }
  })
});

app.post('/api/login', (req, res) => {
  console.log('making login request')
  verifyUserLogin(req.body.email, req.body.password)
    .then((result) => {
      if (result.auth === true) {
        const token = jwt.sign({ id: result.id }, key, {
          expiresIn: 86400 // expires in 24 hours
        });
        console.log('Token given:', token)
        res.json({ 
          auth:true,
          token:token
        })
      } else {
        console.log('No token given, auth false')
        res.json({ auth: false })
      }
    })
  .catch(err => console.log(err));
});

app.post('/api/register', (req, res) => {
  console.log('Registering user');
  
  const { email, password, first_name, last_name } = req.body;

  registerUser(email, password, first_name, last_name)
    .then(result => {
      if (result.auth) {
        const token = jwt.sign({ id: result._id }, key, {
          expiresIn: 86400 // expires in 24 hours
        });
        console.log('Token given:', token)
        res.json({
          user_added: true,
          token: token
        })
    } else {
      res.json({ user_added: false })
    }
    })
    .catch(err => console.log(err))
});

async function addUrl(newUrl, name, token) {
  const client = new MongoClient(url, { useNewUrlParser: true });
  const {userID} = verifyToken(token);
  const userObjectID = new mongodb.ObjectID(userID);

  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    const col = db.collection('users');
    const result = await col
      .updateOne({_id:userObjectID}, {$push: {
        urls: {
          url:newUrl,
          name:name,
          date_added: new Date(),
          shortURL: randomIdGenerator()
        }
      }});
    console.log('Add URL result', result);
    assert.equal(1, result.matchedCount);
    assert.equal(1, result.modifiedCount);
    return { urlAdded: true };
  } catch (err) {
    console.log(err.stack);
  }
}

app.post('/api/addUrl', (req, res) => {
  console.log('Attempting to add url');
  addUrl(req.body.newUrl, req.body.name, req.body.token).then(result => {
    res.json(result);
  })
});

const port = process.env.PORT || 3005;
app.listen(port);

console.log('App is listening on port ' + port);