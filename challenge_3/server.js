const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port  = 3001;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

