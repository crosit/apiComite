const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require('./lotes.controller');
const validacionAdmin = require('../../middleware/validacionAdmin.middleware');
const URL = '/lotes'


router.get('/',
  passport.authenticate('jwt', { session: false }),
  validacionAdmin,
  async (req, res) => {
    const response = await controller.getAllController(req.query);
    res.status(response.status), res.send(response);
  }
);

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  validacionAdmin,
  async (req, res) => {
    const response = await controller.getOneController(req.params.id);
    res.status(response.status), res.send(response);
  }
);

router.post('/',
  passport.authenticate('jwt', { session: false }),
  validacionAdmin,
  async (req, res) => {
    const response = await controller.postController(req.body);
    console.log(response);
    res.status(response.status), res.send(response);
  }
);

router.put('/:id',
  passport.authenticate('jwt', { session: false }),
  validacionAdmin,
  async (req, res) => {
    const response = await controller.putController(req.body, req.params.id);
    console.log(response);
    res.status(response.status), res.send(response);
  }
);

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  validacionAdmin,
  async (req, res) => {
    const response = await controller.deletedController(req.params.id);
    console.log(response);
    res.status(response.status), res.send(response);
  }
);

module.exports = (app) => {
  app.use(URL, router);

};