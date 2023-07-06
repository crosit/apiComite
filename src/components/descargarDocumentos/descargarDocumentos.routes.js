const express = require('express');
const upload = require('../../middleware/multer.middleware');
const passport = require('passport');

const router = express.Router();
const URL = '/servidorDocumentos'


router.post('/',
    passport.authenticate('jwt', { session: false }),
    upload.single('documento'),
    async (req, res) => {
        try {
            // console.log(req.file, 'file');
            res.status(200), res.send({
                status:200,
                data:{
                    nombre:req.file.originalname,
                    url:req.file.filename,
                },
                message:'ok'
            });
        } catch (error) {
            console.log(error);
            res.status(500), res.send({
                status:500,
                data:{},
                message:'Error al subir el archivo'
            });
        }
  });



router.get('/:filename',
passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
        
        const filename = req.params.filename;
        const filePath = 'public/documentos/' + filename;
      
        // Envía el archivo como respuesta
        res.download(filePath, (error) => {
          if (error) {
            // Manejo de errores en caso de que el archivo no se pueda descargar
            console.error('Error al descargar el archivo:', error);
            res.status(500).send('Error al descargar el archivo');
          }
        });
    } catch (error) {
        console.log(error);
        res.status(500), res.send({
            status:500,
            data:{},
            message:'Error al subir el archivo'
        }); 
    }
  })
  

  
  
  module.exports = (app) => {
    app.use(URL, router);

  };