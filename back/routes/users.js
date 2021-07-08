const express = require('express');
const router = express.Router();
const userModel = require('../models/users')
const  uid2 = require('uid2')
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('user');
});

/* GET users listing. */
router.post('/adduser', function(req, res) {
  console.log("router.post ~ req", req.body);

  // const pseudoExists = userModel.findOne({nickname: req.body.nickname })
  // console.log('pseudoExists', pseudoExists)

  // if(pseudoExists !== null ){
  //   res.json({success: false, message: 'pseudo déjà existant'});
  // } else {
    const salt = uid2(32)
    const newUser = new userModel({
      nickname:       req.body.name,
      password :    SHA256(req.body.password+salt).toString(encBase64),
      salt :        salt,
      token:        uid2(32),
      characterId:  []
    })

    newUser.save()
    .then((savedUser)=> {
      console.log('saveUser', savedUser)
      res.json({success: true, message: savedUser.token});
    })
    .catch((e)=> {
      console.error('error saveUser', e)
      res.json({success: false, message: e});
    })
  // }
});

module.exports = router;
