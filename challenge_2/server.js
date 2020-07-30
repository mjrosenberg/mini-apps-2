const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/price/between/:startDate/:endDate', (req,res) => {
  const url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${req.params.startDate}&end=${req.params.endDate}`
  fetch(url)
    .then(response => response.json())
    .then((data)=>{
      res.send(data);
    })
    .catch((err)=>{
      res.send(err);
    });
});

app.listen(port, ()=>{
  console.log(`listening on port ${port}`);
});
