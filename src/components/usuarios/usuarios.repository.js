const { hashPassword } = require('../../helper/bcrypt.helper');
const getToday = require('../../helper/date.helper');
const connection = require('../../helper/db.helper');
const service = require('../auth/auth.service');

const TABLE = 'usuarios';

getAllRepository = async (filters) => {
  let FILTERS = '';
  // console.log(filters, 'filters');
  let arryKeys = Object.keys(filters);
  // console.log(arryKeys, 'arryKeys');
  if (arryKeys.length != 0) {

    for (let i = 0; i < arryKeys.length; i++) {
      if (i == 0) {
        if (arryKeys[i] === 'like') {
          FILTERS += `CONCAT (u.nombre, ' ', u.apellido_p, ' ', u.apellido_m) LIKE '%${filters[arryKeys[i]]}%'`
        } else {

          FILTERS += `u.${arryKeys[i]} = ${filters[arryKeys[i]]}`
        }
      } else {
        if (arryKeys[i] === 'like') {
          FILTERS += ` AND CONCAT (u.nombre, ' ', u.apellido_p, ' ', u.apellido_m) LIKE '%${filters[arryKeys[i]]}%'`
        } else {
          FILTERS += ` AND u.${arryKeys[i]} = ${filters[arryKeys[i]]}`
        }
      }
    }
    FILTERS += ' and'
  }
  // console.log(FILTERS, 'FILTERS');
  let query = `
  SELECT u.*, 
    t.descripcion as tipo_descripcion,
    c.descripcion as carrera_descripcion
  FROM ${TABLE} as u 
  INNER JOIN tipos as t
  ON u.tipos_id = t.id
  INNER JOIN carreras as c
  ON u.carreras_id = c.id
  WHERE 
  ${FILTERS}
  u.deletedAt IS NULL
  `
  // console.log(query, 'query');
  let data = await connection().then(async (conn) => {
    const usuarios = await conn.execute(query);
    return usuarios[0];
  });
  return data;
}

getByIdRepository = async (id) => {
  console.log(id, 'id');
  let data = await connection().then(async (conn) => {
    const usuarios = await conn.execute(`SELECT nombre,
    apellido_p,
    apellido_m,
    carreras_id,
    telefono,
    correo_escolar,
    correo_personal,
    tipos_id,
    gefe_carrera FROM ${TABLE} WHERE deletedAt IS NULL AND id = ?`, [id]);
    // console.log( usuarios[0]);
    return usuarios[0];
  });
  return data;
}


postRepository = async (data) => {
  let response = service.getService(data);
  // let response = await connection().then(async (conn) => {
  //   let query = `INSERT INTO ${TABLE} (nombre, apellido_p, apellido_m,telefono, correo_escolar, correo_personal, contrasena, tipos_id,carreras_id) VALUES (?,?,?,?,?,?,?,?,?)`

  //   let values = [data.nombre, data.apellido_p, data.apellido_m, data.telefono, data.correo_escolar, data.correo_personal, 'asdewr', data.tipos_id, data.carreras_id];

  //   const usuarios = await conn.execute(query, values);
  //   return usuarios[0];
  // });
  // console.log(response, 'response');
  return response;
}

putRepository = async (data,id) => {
  try {
    
    // Consulta de actualización
    // console.log(id, 'data');
    if ('contrasena' in data) {

      let encryptPass = await hashPassword(data.contrasena);


      const query = `UPDATE ${TABLE} SET contrasena = ? WHERE id = ${id}`;
      const values = [encryptPass];
      let response = await connection().then(async (conn) => {
        const usuarios = await conn.execute(query, values);
        return usuarios[0];
      });

      delete data.contrasena
    }
      
    
    const query = `
      UPDATE ${TABLE}
      SET nombre = ?,
        apellido_p = ?,
        apellido_m = ?,
        telefono = ?,
        correo_escolar = ?,
        correo_personal = ?,
        
        tipos_id = ?,
        carreras_id = ?
      WHERE id = ${id}
      `;
  
    const values = [data.nombre, data.apellido_p, data.apellido_m, data.telefono, data.correo_escolar, data.correo_personal, data.tipos_id, data.carreras_id];
  
  
    let response = await connection().then(async (conn) => {
      const usuarios = await conn.execute(query, values);
      return usuarios[0];
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
   SET deletedAt = '${date}'
   WHERE id = ${data}
   `;

  let response = await connection().then(async (conn) => {
    const usuarios = await conn.execute(query);
    return usuarios[0];
  });
  //  console.log(response, 'response');
  return response;
}

module.exports = { getAllRepository, getByIdRepository, postRepository, putRepository, deletedRepository };