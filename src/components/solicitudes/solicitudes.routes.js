const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require('./solicitudes.controller');
const URL = '/solicitudes'


router.get('/',
passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const response = await controller.getAllController(req.user[0].id,req.query);
    res.status(response.status), res.send(response);
  }
);
  
router.get('/:id',
passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const response = await controller.getOneController(req.user[0], req.params.id);
    res.status(response.status), res.send(response);
  }
);

router.post('/aceptadoComite',
passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const response = await controller.aceptadoComiteController(req.body);
    res.status(response.status), res.send(response);
  }
);
router.post('/aceptadoAdministracion',
passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const response = await controller.aceptadoAdministracionController(req.body);
    res.status(response.status), res.send(response);
  }
);
router.post('/aceptadoFinalizar',
passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const response = await controller.aceptadoFinalizarController(req.body);
    res.status(response.status), res.send(response);
  }
);
  
router.post('/',
passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    // console.log(req.user[0].id);
    const response = await controller.postController(req.body,req.user);
    // console.log(response);
    res.status(response.status), res.send(response);
  }
);

router.put('/',
passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const response = await controller.putController(req.body);
    // console.log(response);
    res.status(response.status), res.send(response);
  }
);

router.delete('/:id',
passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const response = await controller.deletedController(req.params.id);
    // console.log(response);
    res.status(response.status), res.send(response);
  }
);

  
  module.exports = (app) => {
    app.use(URL, router);

  };