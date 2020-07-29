require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const port  = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});