const {connection,closeConnection} = require('../../helper/db.helper');

getByEmailUser = async(correo) => {
    // console.log(correo, 'correo');
    let data = await connection().then( async(conn) => {
        const usuarios = await conn.execute(`SELECT u.*,c.descripcion as carrera_descripcion FROM usuarios as u
        INNER JOIN carreras as c
        ON  u.carreras_id = c.id
        WHERE u.deletedAt IS NULL AND u.correo_escolar = ?`, [correo]);
        closeConnection(conn);
        return usuarios[0];
      });
        return data;
}

getByIdUser = async(id) => {
    // console.log(id, 'id');
    let data = await connection().then( async(conn) => {
        const usuarios = await conn.execute('SELECT * FROM usuarios WHERE deletedAt IS NULL AND id = ?', [id]);
        // console.log( usuarios[0]);
        closeConnection(conn);
        return usuarios[0];
      });
        return data;
}

postUsuarios = async(data, encryptPass) => {
    let response = await connection().then( async(conn) => {
        const usuarios = await conn.execute('INSERT INTO usuarios (nombre, apellido_p, apellido_m,telefono, correo_escolar, correo_personal, contrasena, tipos_id,carreras_id,gefe_carrera) VALUES (?,?,?,?,?,?,?,?,?,?)', [data.nombre, data.apellido_p, data.apellido_m, data.telefono, data.correo_escolar,data.correo_personal, encryptPass, data.tipos_id,data.carreras_id,data.gefe_carrera]);
        closeConnection(conn);
        return usuarios;
      });
      // console.log(response, 'response');
        return response;
}

module.exports = {getByEmailUser,postUsuarios,getByIdUser};