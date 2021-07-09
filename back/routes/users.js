const express = require('express');
const router = express.Router();
const userModel = require('../models/users')
const  uid2 = require('uid2')
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");


router.post('/adduser', async function(req, res) {
  const pseudoExists = await userModel.findOne({nickname: req.body.nickname })

  if(pseudoExists !== null ){
    res.json({success: false, message: "pseudo déjà existant"})
  } else {
    const salt = uid2(32)
    const newUser = new userModel({
      nickname:     req.body.nickname,
      password :    SHA256(req.body.password+salt).toString(encBase64),
      salt :        salt,
      token:        uid2(32),
      characterId:  []
    })

    newUser.save()
    .then((savedUser)=> {
      res.json({success: true, message: savedUser.token})
    })
    .catch((e)=> {
      console.error('error saveUser', e)
      res.json({success: false, message: "Problème lors de la création de l'utilisateur"})
    })
  }
})

router.post('/login', async function(req, res) {
  const pseudoExists = await userModel.findOne({ nickname: req.body.nickname}).populate('characterId')
  .catch((e)=> res.json({success: false, message: JSON.stringify(e)}))
  if(pseudoExists){
    const passwordEncryptFromPseudo = SHA256(req.body.password + pseudoExists.salt).toString(encBase64)
    if(passwordEncryptFromPseudo == pseudoExists.password){
      res.json({success: true, message: JSON.stringify(pseudoExists)})
    } else {
      res.json({success: false, message: "Le pseudo ou le mot de passe est invalide"})
    }
  } else {
    res.json({success: false, message: "Êtes-vous sûr d'être inscrit?"})
  }
})

module.exports = router
