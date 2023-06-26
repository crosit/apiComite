// miMiddleware.js
const {getByIdRepository} = require('../components/usuarios/usuarios.repository');

const validacionAdmin = async(req, res, next) => {
    // Realizar operaciones antes de pasar la solicitud al siguiente middleware
    let id = req.user[0].id;
    let usuario = await getByIdRepository(id);
    console.log(usuario[0], 'usuario');
    // Por ejemplo, imprimir el método y la URL de la solicitud
    if(usuario[0].tipos_id <= 2 ){
        next();
    }else{
        return res.status(401).json({ message: 'Error de autenticación' });
    }
    // Continuar con el siguiente middleware
  };
  
  module.exports = validacionAdmin;
  