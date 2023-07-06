const getToday = require('../../helper/date.helper');
const { connection, closeConnection } = require('../../helper/db.helper');
const { array } = require('../../middleware/multer.middleware');

const TABLE = 'documentos';

getAllRepository = async () => {
  let data = await connection().then(async (conn) => {
    const usuarios = await conn.execute(`SELECT * FROM ${TABLE} WHERE deletedAt IS NULL `);
    closeConnection(conn);

    return usuarios[0];
  });
  return data;
}

getByIdRepository = async (id) => {
  // console.log(id, 'id');
  let data = await connection().then(async (conn) => {
    const usuarios = await conn.execute(`SELECT * FROM ${TABLE} WHERE deletedAt IS NULL AND id = ?`, [id]);
    closeConnection(conn);
    // console.log( usuarios[0]);
    return usuarios[0];
  });
  return data;
}
getBySolicitudesIdRepository = async (id) => {
  // console.log(id, 'id');
  let data = await connection().then(async (conn) => {
    const usuarios = await conn.execute(`SELECT * FROM ${TABLE} WHERE deletedAt IS NULL AND solicitudes_id = ?`, [id]);
    closeConnection(conn);
    // console.log( usuarios[0]);
    return usuarios[0];
  });
  return data;
}

postRepositoryDocument = async (data) => {
  console.log(data, 'data');
  arrayDocumentos = data.arrayDocumentos

  await connection().then(async (conn) => {
    // console.log(data, 'data');
    console.log(arrayDocumentos, 'arrayDocumentos');
    arrayDocumentos.forEach(async (element) => {

      let query = `INSERT INTO ${TABLE} (nombre,url,solicitudes_id) VALUES (?,?,?)`

      let values = [element.nombre, element.url, data.solicitudes_id];

      await conn.execute(query, values);
    });
    closeConnection(conn);

  });
}

putRepository = async (data) => {
  // Consulta de actualización
  const query = `
   UPDATE ${TABLE}
   SET 
    nombre = ?,
    url = ?,
    solicitudes_id = ?
   WHERE id = ${data.id}
   `;

  const values = [data.nombre, data.url, data.solicitudes_id];


  let response = await connection().then(async (conn) => {
    const usuarios = await conn.execute(query, values);
    closeConnection(conn);
    return usuarios[0];
  });
  //  console.log(response, 'response');
  return response;
}

deletedRepository = async (data) => {
  // Consulta de actualización
  let date = getToday()
  //  console.log(date, 'date');
  const query = `
   UPDATE ${TABLE}
   SET 
   deletedAt = '${date}'
   WHERE id = ${data}
   `;

  let response = await connection().then(async (conn) => {
    const usuarios = await conn.execute(query);
    closeConnection(conn);
    return usuarios[0];
  });
  //  console.log(response, 'response');
  return response;
}

module.exports = { getAllRepository, getByIdRepository, postRepositoryDocument, getBySolicitudesIdRepository, putRepository, deletedRepository };