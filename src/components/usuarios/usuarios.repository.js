const getToday = require('../../helper/date.helper');
const connection = require('../../helper/db.helper');

const TABLE = 'usuarios';

getAllRepository = async() => {
    let data = await connection().then( async(conn) => {
        const usuarios = await conn.execute(`SELECT * FROM ${TABLE} WHERE deletedAt IS NULL `);
        
        return usuarios[0];
      });
        return data;
}

getByIdRepository = async(id) => {
    // console.log(id, 'id');
    let data = await connection().then( async(conn) => {
        const usuarios = await conn.execute(`SELECT * FROM ${TABLE} WHERE deletedAt IS NULL AND id = ?`, [id]);
        // console.log( usuarios[0]);
        return usuarios[0];
      });
        return data;
}

postRepository = async(data) => {
    let response = await connection().then( async(conn) => {
      let query = `INSERT INTO ${TABLE} (nombre, apellido_p, apellido_m,telefono, correo_escolar, correo_personal, contrasena, tipos_id,carreras_id) VALUES (?,?,?,?,?,?,?,?,?)`

      let values = [data.nombre, data.apellido_p, data.apellido_m, data.telefono, data.correo_escolar,data.correo_personal, 'asdewr', 1,data.carreras_id];

      const usuarios = await conn.execute(query,values);
        return usuarios[0];
      });
      // console.log(response, 'response');
        return response;
}

putRepository = async(data) => {
   // Consulta de actualización
   const query = `
   UPDATE ${TABLE}
   SET nombre = ?,
     apellido_p = ?,
     apellido_m = ?,
     telefono = ?,
     correo_escolar = ?,
     correo_personal = ?,
     contrasena = ?,
     tipos_id = ?,
     carreras_id = ?
   WHERE id = ${data.id}
   `;
 
   const values = [data.nombre, data.apellido_p, data.apellido_m, data.telefono, data.correo_escolar,data.correo_personal, data.contrasena, data.tipo_id,data.carreras_id];
 
 
   let response = await connection().then( async(conn) => {
     const usuarios = await conn.execute(query,values);
     return usuarios[0];
   });
  //  console.log(response, 'response');
   return response;
}

deletedRepository = async(data) => {
   // Consulta de actualización
   let date = getToday()
   console.log(date, 'date');
   const query = `
   UPDATE ${TABLE}
   SET deletedAt = '${date}'
   WHERE id = ${data}
   `;
 
   let response = await connection().then( async(conn) => {
     const usuarios = await conn.execute(query);
     return usuarios[0];
   });
  //  console.log(response, 'response');
   return response;
}

module.exports = {getAllRepository, getByIdRepository, postRepository, putRepository, deletedRepository};