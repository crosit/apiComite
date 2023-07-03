const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const initializePassport = require('./src/config/passport.config');
const jwt = require('jsonwebtoken');
const config = require('./src/config/config');
const cors = require('cors');



const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(cors());

// Configurar el middleware Passport
initializePassport(passport);


//rutas
require('./src/components/auth/auth.routes')(app);
require('./src/components/usuarios/usuarios.routes')(app);
require('./src/components/carreras/carreras.routes')(app);
require('./src/components/tipos/tipos.routes')(app);
require('./src/components/status/estatus.routes')(app);
require('./src/components/lotes/lotes.routes')(app);
require('./src/components/solicitudes/solicitudes.routes')(app);
require('./src/components/documentos/documentos.routes')(app);
require('./src/components/usuariosHasSolicitudes/usuariosHasSolicitudes.routes')(app);
require('./src/components/descargarDocumentos/descargarDocumentos.routes')(app);
require('./src/components/sedEmail/sendEmail')(app);









// Iniciar el servidor
const port = config.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
