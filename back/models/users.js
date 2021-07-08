const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  nickname:       String,
  password :      String,
  salt:           String,
  token :         String,
  characterId :   [{type: mongoose.Schema.Types.ObjectId, ref: "characters"}]
  });

const userModel = mongoose.model('users', userSchema)

module.exports= userModel
