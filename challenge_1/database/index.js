const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mini_app_1', {useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to mongo database');
});

// const eventSchema = new mongoose.Schema({
//   date: {type: Date},

// });

//only necessary for nightmare mode, so come back to this later