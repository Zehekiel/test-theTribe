const express = require('express');
const router = express.Router();
const characterModel = require('../models/character')


/* GET opponetList. */
router.post('/getopponentlist', async function(req, res, next) {
  const lastOneHour = (new Date().getTime()- 3600000) // millisecond
  const limit = 50;
  const currentCharacter = req.body.currentCharacter

  await characterModel.find({
    _id: { $nin: req.body.currentList } , // not one of current user
    lastFight: { $lt: lastOneHour}, // available
    level: { $lt: currentCharacter.level+5, $gte: currentCharacter.level-5} //near of charcter level
  })
  .limit(limit)
  .then((answer)=>{
    const randomIndex= Math.floor(Math.random()*answer.length)
    res.json({success: true, message: JSON.stringify(answer[randomIndex])})
  })
  .catch((e)=> {
    console.error('error getopponentlist', e)
    res.json({success: false, message: "Problème lors de la création d'un personnage"})
  })
});

module.exports = router;
