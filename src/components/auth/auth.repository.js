const connection = require('../../helper/db.helper');

getByEmailUser = async(correo) => {
    // console.log(correo, 'correo');
    let data = await connection().then( async(conn) => {
        const usuarios = await conn.execute('SELECT * FROM usuarios WHERE deletedAt IS NULL AND correo_escolar = ?', [correo]);
        
        return usuarios[0];
      });
        return data;
}

getByIdUser = async(id) => {
    // console.log(id, 'id');
    let data = await connection().then( async(conn) => {
        const usuarios = await conn.execute('SELECT * FROM usuarios WHERE deletedAt IS NULL AND id = ?', [id]);
        // console.log( usuarios[0]);
        return usuarios[0];
      });
        return data;
}

postUsuarios = async(data, encryptPass) => {
    let response = await connection().then( async(conn) => {
        const usuarios = await conn.execute('INSERT INTO usuarios (nombre, apellido_p, apellido_m,telefono, correo_escolar, correo_personal, contrasena, tipos_id,carreras_id) VALUES (?,?,?,?,?,?,?,?,?)', [data.nombre, data.apellido_p, data.apellido_m, data.telefono, data.correo_escolar,data.correo_personal, encryptPass, 1,data.carreras_id]);
        return usuarios;
      });
      // console.log(response, 'response');
        return response;
}

module.exports = {getByEmailUser,postUsuarios,getByIdUser};