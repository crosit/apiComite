const express = require('express');
const upload = require('../../middleware/multer.middleware');

const router = express.Router();
const URL = '/servidorDocumentos'


router.post('/', 
    upload.single('documento'),
    async (req, res) => {
        res.status(200), res.send({message:req.file});
  });

//   router.post('/login', async (req, res,next) => {
//     passport.authenticate('local', { session: false }, (err, user, info) => {
//       try {
//         if (err || !user) {
//           return res.status(401).json({ message: info });
//         }
//         const token = jwtUtils.generateToken(user);
  
//         return res.json({ token });
//       } catch (error) {
//         return next(error);
//       }
//     })(req, res, next);
//   });
  

  
  
  module.exports = (app) => {
    app.use(URL, router);

  };