const getToday = require('../../helper/date.helper');
const connection = require('../../helper/db.helper');

const TABLE = 'documentos';

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
      let query = `INSERT INTO ${TABLE} (nombre,url,solicitudes_id) VALUES (?,?,?)`

      let values = [data.nombre,data.url,data.solicitudes_id];

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
   SET 
    nombre = ?,
    url = ?,
    solicitudes_id = ?
   WHERE id = ${data.id}
   `;
 
   const values = [data.nombre,data.url,data.solicitudes_id];
 
 
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
   SET 
   deletedAt = '${date}'
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