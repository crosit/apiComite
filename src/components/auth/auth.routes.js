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
  
        return res.json({ token });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  });
  

  
  
  module.exports = (app) => {
    app.use(URL, router);

  };