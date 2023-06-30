const getToday = require('../../helper/date.helper');
const connection = require('../../helper/db.helper');
const { postRepositoryDocument } = require('../documentos/documentos.repository');
const {getAllRepository} = require('../lotes/lotes.repository')
const TABLE = 'solicitudes';

getAllRepository2 = async() => {
    let data = await connection().then( async(conn) => {
        const usuarios = await conn.execute(`SELECT 
        CONCAT(u.nombre,
                ' ',
                u.apellido_p,
                ' ',
                u.apellido_m) AS nombre_full,
        u.telefono,
        u.correo_escolar,
        u.correo_personal,
        c.descripcion AS descripcion_carreras,
        s.id AS id,
        s.descripcion AS solicitud_descripcion,
        s.createdAt AS solicitudes_createdAt,
        e.descripcion AS descripcion_estatus,
        l.id AS lotes_id,
        l.descripcion AS lotes_descripcion,
        l.fecha_inicio AS lotes_fecha_inicio,
        l.fecha_fin AS lotes_fecha_fin,
        l.folio AS lotes_folio
    FROM
        usuarios_has_solicitudes AS cu
            INNER JOIN
        usuarios AS u ON u.id = cu.usuarios_id
            INNER JOIN
        carreras AS c ON u.carreras_id = c.id
            INNER JOIN
        solicitudes AS s ON cu.solicitudes_id = s.id
            INNER JOIN
        estatus AS e ON e.id = s.estatus_id
            INNER JOIN
        lotes AS l ON l.id = s.lotes_id
    WHERE
        u.deletedAt IS NULL
      AND s.deletedAt IS NULL
    ; `);
        
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

postRepository = async(data, user) => {
    let lote = await getAllRepository(data);
    if(lote.length == 0){
      return {
        status: 400,
        data: null,
        message: 'No existe el lote comunique al administrador'
      }
    }

    let response = await connection().then( async(conn) => {
      let query = `INSERT INTO ${TABLE} (descripcion,estatus_id,lotes_id) VALUES (?,?,?)`

      let values = [data.descripcion,1,lote[lote.length -1].id];

      const usuarios = await conn.execute(query,values);
        return usuarios[0];
      });
    data.solicitudes_id = response.insertId;
    let userSolicitud = {
      usuarios_id: user,
      solicitudes_id: response.insertId
    }
    // console.log(userSolicitud, 'userSolicitud');
    postRepositoryUS(userSolicitud);
    postRepositoryDocument(data);
      // console.log(response, 'response');
        return response;
}

putRepository = async(data) => {
   // Consulta de actualización
   const query = `
   UPDATE ${TABLE}
   SET 
    descripcion = ?,
    estatus_id = ?,
    lotes_id = ?
   WHERE id = ${data.id}
   `;
 
   const values = [data.descripcion,data.estatus_id,data.lotes_id];
 
 
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
  //  console.log(date, 'date');
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

module.exports = {getAllRepository2, getByIdRepository, postRepository, putRepository, deletedRepository};