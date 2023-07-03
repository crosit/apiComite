const getToday = require('../../helper/date.helper');
const {connection,closeConnection} = require('../../helper/db.helper');

const TABLE = 'lotes';

getAllRepository = async (filtros) => {
  if('fecha_inicio' in filtros && 'fecha_fin' in filtros){
    let array = [filtros.fecha_inicio,filtros.fecha_fin]
    let validacion = await validacionEntrada(array);
    return validacion;
  }

  let data = await connection().then(async (conn) => {
    const lotes = await conn.execute(`SELECT * FROM ${TABLE} WHERE deletedAt IS NULL `);
    closeConnection(conn);
    return lotes[0];
  });
  return data;
}

getByIdRepository = async (id) => {
  // console.log(id, 'id');
  let data = await connection().then(async (conn) => {
    const lotes = await conn.execute(`SELECT * FROM ${TABLE} WHERE deletedAt IS NULL AND id = ?`, [id]);
    // console.log( lotes[0]);
    closeConnection(conn);
    return lotes[0];
  });
  return data;
}

postRepository = async (data) => {
  let response = await connection().then(async (conn) => {
    let query = `INSERT INTO ${TABLE} (descripcion,fecha_inicio,fecha_fin,folio) VALUES (?,?,?,?)`

    let values = [data.descripcion, data.fecha_inicio, data.fecha_fin, data.folio];

    const lotes = await conn.execute(query, values);
    closeConnection(conn);
    return lotes[0];
  });
  // console.log(response, 'response');
  return response;
}

validacionEntrada = async (data) => {
  let response = await connection().then(async (conn) => {
    let query = `SELECT *
    FROM ${TABLE}
    WHERE deletedAt is null AND ((
    '${data[0]}' BETWEEN fecha_inicio AND fecha_fin
       AND
    '${data[1]}' BETWEEN fecha_inicio AND fecha_fin)
    OR ( '${data[0]}' <= fecha_inicio AND '${data[1]}' >= fecha_inicio AND '${data[1]}' <= fecha_fin)
     OR ('${data[0]}' >= fecha_inicio AND '${data[0]}' <= fecha_fin AND '${data[1]}' >= fecha_fin)
     OR ('${data[0]}' < fecha_inicio AND '${data[1]}' > fecha_fin));`

      // console.log(query, 'query');
    const lotes = await conn.execute(query);
    closeConnection(conn);
    return lotes[0];
  });
  // console.log(response, 'response');
  return response;
}

putRepository = async (data,id) => {
  try {
    // Consulta de actualización
    const query = `
     UPDATE ${TABLE}
     SET 
      descripcion = ?,
      fecha_inicio = ?,
      fecha_fin = ?,
      folio = ?
     WHERE id = ${id}
     `;
  
    const values = [data.descripcion, data.fecha_inicio, data.fecha_fin, data.folio];
  
    
    let response = await connection().then(async (conn) => {
      const lotes = await conn.execute(query, values);
      closeConnection(conn);
      return lotes[0];
    });
    //  console.log(response, 'response');
    return response;
    
  } catch (error) {
    console.log(error, 'error');
  }
}

deletedRepository = async (data) => {
  // Consulta de actualización
  let date = getToday()
  // console.log(date, 'date');
  const query = `
   UPDATE ${TABLE}
   SET 
   deletedAt = '${date}'
   WHERE id = ${data}
   `;

  let response = await connection().then(async (conn) => {
    const lotes = await conn.execute(query);
    closeConnection(conn);
    return lotes[0];
  });
  //  console.log(response, 'response');
  return response;
}

module.exports = { getAllRepository, getByIdRepository, postRepository, putRepository, deletedRepository };