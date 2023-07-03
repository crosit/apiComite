const getToday = require('../../helper/date.helper');
const {connection,closeConnection} = require('../../helper/db.helper');

const TABLE = 'usuarios_has_solicitudes';

getAllRepository = async() => {
    let data = await connection().then( async(conn) => {
        const usuarios = await conn.execute(`SELECT * FROM ${TABLE} WHERE deletedAt IS NULL `);
        closeConnection(conn);
        
        return usuarios[0];
      });
        return data;
}

getByIdRepository = async(id) => {
    // console.log(id, 'id');
    let data = await connection().then( async(conn) => {
        const usuarios = await conn.execute(`SELECT * FROM ${TABLE} WHERE deletedAt IS NULL AND id = ?`, [id]);
        closeConnection(conn);
        // console.log( usuarios[0]);
        return usuarios[0];
      });
        return data;
}

postRepositoryUS = async(data) => {
  try {
    
    let response = await connection().then( async(conn) => {
      let query = `INSERT INTO ${TABLE} (usuarios_id,solicitudes_id) VALUES (?,?)`

      let values = [data.usuarios_id,data.solicitudes_id];

      const usuarios = await conn.execute(query,values);
      closeConnection(conn);
        return usuarios[0];
      });
      // console.log(response, 'response');
        return response;
  } catch (error) {
    console.log(error, 'error');
  }
}


putRepository = async(data) => {
   // Consulta de actualización
   const query = `
   UPDATE ${TABLE}
   SET 
    usuarios_id = ?,
    solicitudes_id = ?
   WHERE id = ${data.id}
   `;
 
   const values = [data.usuarios_id,data.solicitudes_id];
 
 
   let response = await connection().then( async(conn) => {
     const usuarios = await conn.execute(query,values);
     closeConnection(conn);
     return usuarios[0];
   });
  //  console.log(response, 'response');
   return response;
}

deletedRepository = async(data) => {
   // Consulta de actualización
   let date = getToday()
  //  console.log(date, 'date');
   const query = `
   DELETE FROM ${TABLE}
   WHERE usuarios_id = ${data.usuarios_id} AND solicitudes_id = ${data.solicitudes_id}
   `;
 
   let response = await connection().then( async(conn) => {
     const usuarios = await conn.execute(query);
     closeConnection(conn);
     return usuarios[0];
   });
  //  console.log(response, 'response');
   return response;
}

module.exports = {getAllRepository, getByIdRepository,postRepositoryUS, putRepository, deletedRepository};