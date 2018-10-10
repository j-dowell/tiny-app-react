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

const port = process.env.PORT || 3005;
app.listen(port);

console.log('App is listening on port ' + port);