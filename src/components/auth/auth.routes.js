const controller = require('./auth.controller');
const express = require('express');
const passport = require('passport');
const jwtUtils = require('../../middleware/auth.middleware');

const router = express.Router();
const URL = '/auth'


router.post('/register', async (req, res) => {
        const response = await controller.getController(req.body);
        res.status(response.status,res), res.send(response);
  });

  router.post('/login', async (req, res,next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      try {
        if (err || !user) {
          return res.status(401).json({ message: info });
        }
        const token = jwtUtils.generateToken(user);
        let user2 = {
          id: user[0].id,
          nombre: user[0].nombre,
          apellido_p: user[0].apellido_p,
          apellido_m: user[0].apellido_m,
          correo_escolar: user[0].correo_escolar,
          gefe_carrera: user[0].gefe_carrera,
          tipos_id: user[0].tipos_id,
          
        }        
        console.log(user2, 'user');
  
        return res.json({ token, user: user2 });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  });
  

  
  
  module.exports = (app) => {
    app.use(URL, router);

  };