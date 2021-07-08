import { Router } from 'express';

const characterRouter = Router();

const characterModel = require("../../models/character");

/* GET users listing. */
characterRouter.get('/character/', function(_req: any, res: { send: (arg0: string) => void; }, next: any) {
  res.send('respond with a resource');
});


module.exports =  characterModel;
