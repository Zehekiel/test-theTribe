
import { Router } from 'express';

const userRoutes = Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

userRoutes.get('/user/', (req, res) => {
  return res.json({ message: 'Hello World' });
});

module.exports =  userRoutes;
