const mongoose = require('mongoose')
require('dotenv').config()

const user = process.env.MONGO_USER
const password = process.env.MONGO_PASSWORD
const bddName = process.env.MONGO_BDD

const options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.hqyym.mongodb.net/${bddName}?retryWrites=true&w=majority`,
options,
function(err) {
  if (err) {
    console.log(`Connection Database error : ${err}`);
  } else {
    console.info('-_-_-_-_-_-_-_-_ MONGODB CONNECTED -_-_-_-_-_-_-_-_');
  }
}
);
  
module.exports= mongoose
