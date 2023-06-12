const jwt = require('jsonwebtoken');
const config = require('../config/config');

function generateToken(user) {
  let apellido_m = user[0].apellido_m == null ? '' : ' ' + user[0].apellido_m
  let fullName = user[0].nombre + ' ' + user[0].apellido_p + apellido_m;

  const payload = {
    id: user[0].id,
    nombre_completo: fullName,
    correo: user[0].correo_escolar,
    telefono: user[0].telefono,
    tipo: user[0].tipos_id,
  
  };

  return jwt.sign(payload, config.SECRET_KEY, { expiresIn: '7d' });
}

function verifyToken(token) {
  return jwt.verify(token, config.jwtSecret);
}

module.exports = {
  generateToken,
  verifyToken
};
