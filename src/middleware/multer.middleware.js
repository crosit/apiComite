const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Especifica la carpeta de destino donde se guardarán los archivos
      cb(null, 'public/documentos');
    },
    filename: (req, file, cb) => {
      console.log(file, 'file');
      // Genera un nombre único para el archivo
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      // Utiliza el nombre original del archivo, pero agrega un sufijo único
      cb(null, uniqueSuffix + '-' + file.originalname);
    }
  });
  

  const upload = multer({ storage: storage });

  module.exports = upload;