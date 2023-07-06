const {connection,closeConnection} = require('../../helper/db.helper');
const {hashPassword, comparePassword} = require('../../helper/bcrypt.helper');
const {getByEmailUser,postUsuarios} = require('./auth.repository');
const service = {
    getService: async(data) => {
        try {
            // Example database query
            let usuarios = await getByEmailUser(data.correo_escolar);
            if (usuarios.length > 0) {
                return {
                    status: 400,
                    data: null,
                    message: 'Usuario ya existe'
                }
            }
            let encryptPass = await hashPassword(data.contrasena);

            let newUser = await postUsuarios(data, encryptPass);
            return {
                status: 200,
                data: newUser,
                message: 'Se creo el usuario'
            }



            // res.send(1);
          } catch (error) {
            console.error('Error retrieving usuarios:', error);
            return {
                status: 500,
                data: null,
                message: 'error en el servidor register'
            }
            // res.status(500).json({ error: 'Error retrieving usuarios' });
          }
        return 'readiness';
    },
    getService2: async(data) => {
        try {
            // Example database query
            let usuarios = await getByEmailUser(data.correo_escolar);
            if (usuarios.length > 0) {
                return {
                    status: 400,
                    data: null,
                    message: 'Usuario ya existe'
                }
            }
            let encryptPass = await hashPassword(data.contrasena);
            data.gefe_carrera = 0;
            data.tipos_id = 3;
            let newUser = await postUsuarios(data, encryptPass);
            return {
                status: 200,
                data: newUser,
                message: 'Se creo el usuario'
            }

            // res.send(1);
          } catch (error) {
            console.error('Error retrieving usuarios:', error);
            return {
                status: 500,
                data: null,
                message: 'error en el servidor register'
            }
            // res.status(500).json({ error: 'Error retrieving usuarios' });
          }
        return 'readiness';
    },
    
};



module.exports = service;