require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const ENV = process.env.ENV || "development";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'))
// })

app.post('/api/login', (req, res) => {
  console.log('making login request')
  if (req.body.email === 'test@gmail.com' && req.body.password === 'test') {
    res.json('true')
  } else {
    res.json('false')
  }
})

const port = process.env.PORT || 3005;
app.listen(port);

console.log('App is listening on port ' + port);