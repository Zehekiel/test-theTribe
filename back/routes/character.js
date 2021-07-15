const express = require('express');
const router = express.Router();
const characterModel = require('../models/character')
const userModel = require('../models/users')
const ObjectID = require('mongodb').ObjectID;


/* POST character. */
router.post('/addcharacter', async function(req, res, next) {
  const initialDate = new Date('July 21, 90 23:45:00 GMT+01:00').getTime()

  await characterModel.findOne({name: req.body.name })
  .then(async(response)=>{
    if(await response !== null ){
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
        lastFight:    initialDate,
        userToken:    req.body.token
      })

      newCharacter.save()
      .then((savedCharacter)=> {
        userModel.updateOne(
          {token: req.body.token},
          {
            $push: {
              characterId: ObjectID(savedCharacter._id)
            }
          }
        )
        .then(()=> (
          res.json({success: true, message: JSON.stringify(savedCharacter)})
        ))
      })
    }
  })
  .catch((e)=> {
    console.error('error addcharacter', e)
    res.json({success: false, message: "Problème lors de la création d'un personnage"})
  })
});

/* DELETE character. */
router.delete('/deletecharacter', async function(req, res) {
  await characterModel.deleteOne({_id: ObjectID(req.body.id)})
  
  .then(()=>{
    userModel.updateOne(
      {token: req.body.token},
      {
        $pull: {
          characterId: req.body.id
        }
      }
    )
    .then(()=> (
      res.json({success: true, message: 'Personnage effacé'})
    ))
  })
  .catch((e)=> {
    console.error('error addcharacter', e)
    res.json({success: false, message: "Problème lors de la suppression du personnage"})
  })
});

/* PATCH character. */
router.patch('/setcharacter', async function(req, res) {
  await characterModel.updateOne(
    {_id: ObjectID(req.body.id)},
    
    {
      $set: req.body.skills
    }
  )
  .then(()=>{
    res.json({success: true, message: 'Personnage modifié'})
  })
  .catch((e)=> {
    console.error('error setcharacter', e)
    res.json({success: false, message: "Problème lors de la modification du personnage"})
  })
});

module.exports = router;
