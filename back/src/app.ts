
import express from 'express';
const  userRoutes = require('userRoutes')
const characterRouter = require('./route/character')
require('../models/connection')

const usersRouter = require('./routes/users');
class App {
  public server;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(userRoutes);
    this.server.use(characterRouter);
  }
}

export default new App().server;