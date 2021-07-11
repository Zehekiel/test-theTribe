const mongoose = require('mongoose')

const characterSchema = mongoose.Schema({
  name:         String,
  skillPoint :  Number,
  health :      Number,
  attack :      Number,
  defense :     Number,
  magik :       Number,
  level :       Number,
  historic:     Array,
  lastFight:    Number,
  userToken:    String,
  });

  const CharacterModel = mongoose.model('characters', characterSchema);

  module.exports= CharacterModel;