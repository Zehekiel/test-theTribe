const express = require('express');
const router = express.Router();
const characterModel = require('../models/character')
const userModel = require('../models/users')

/* GET character. */
router.post('/addcharacter', async function(req, res, next) {
  const nameExists = await characterModel.findOne({name: req.body.name })
  const initialDate = new Date('July 21, 90 23:45:00 GMT+01:00').getTime()

  if(nameExists !== null ){
    res.json({success: false, message: "Nom déjà existant"})
  } else {
    const newCharacter = new characterModel({
      name:         req.body.name,
      skillPoint :  0,
      health :      req.body.health,
      attack :      req.body.attack,
      defense :     req.body.defense,
      magik :       req.body.magik,
      level :       1,
      historic:     [],
      lastFight:    initialDate
    })

    newCharacter.save()
    .then((savedCharacter)=> {
      const user = userModel.updateOne(
        {token: req.body.token},
        {
          $push: {
            characterId: savedCharacter.id
          }
        })
        .exec()
      res.json({success: true, message: JSON.stringify(savedCharacter)})
    })
    .catch((e)=> {
      console.error('error saveUser', e)
      res.json({success: false, message: "Problème lors de la création d'un personnage"})
    })
  }
});

module.exports = router;
