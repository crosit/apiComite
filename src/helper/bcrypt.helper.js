const bcrypt = require('bcrypt');

// Función para generar el hash de una contraseña
async function hashPassword(password) {
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// Función para comparar una contraseña con su hash
async function comparePassword(password, hashedPassword) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}

module.exports = {
  hashPassword,
  comparePassword,
};
