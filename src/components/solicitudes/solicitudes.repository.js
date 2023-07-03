const getToday = require('../../helper/date.helper');
const { connection, closeConnection } = require('../../helper/db.helper');
const { postRepositoryUS } = require('../usuariosHasSolicitudes/usuariosHasSolicitudes.repository');
const { postRepositoryDocument, getBySolicitudesIdRepository } = require('../documentos/documentos.repository');
const { getAllRepository } = require('../lotes/lotes.repository');
const { validacionGefeCarrera, validacionComite, validacionAdministracion } = require('../usuarios/usuarios.repository');
const TABLE = 'solicitudes';
const nodemailer = require('nodemailer');
const config = require('../../config/config');

// Configura las opciones de transporte SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail', // Ejemplo: 'gmail'
  auth: {
    user: config.MAIL_USER,
    pass: config.MAIL_PASSWORD,
  }
});


getAllRepository2 = async (id) => {
  let query = `SELECT
  CONCAT(u.nombre,
          ' ',
          u.apellido_p,
          ' ',
          u.apellido_m) AS nombre_full,
  u.telefono,
  u.correo_escolar,
  u.correo_personal,
  u.gefe_carrera,
  c.descripcion AS descripcion_carreras,
  s.id AS id,
  s.descripcion AS solicitud_descripcion,
  s.createdAt AS solicitudes_createdAt,
  s.usuarios_id AS solicitudes_usuarios_id,
  s.comentario AS solicitudes_comentario,
  e.id AS estatus_id,
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
AND s.deletedAt IS NULL AND u.id = ${id}
; `;
  // console.log(query, 'query');
  let data = await connection().then(async (conn) => {
    const usuarios = await conn.execute(query);
    closeConnection(conn);
    return usuarios[0];
  });
  return data;
}

getByIdRepository = async (usuario, usuariosSolicitudId) => {
  // console.log(usuario, 'usuario');
  let usuarioId = usuario.id
  let idSolicitante = usuariosSolicitudId;
  let data = await seleccionarSolicitudesPorUsuario(usuarioId, idSolicitante);
  // console.log(id, 'id');
  // let data = await connection().then( async(conn) => {
  //     const usuarios = await conn.execute(`SELECT * FROM ${TABLE} WHERE deletedAt IS NULL AND id = ?`, [id]);
  //     // console.log( usuarios[0]);
  //     closeConnection(conn);
  //     return usuarios[0];
  //   });
  return data;
}

aceptadoComite = async (data) => {
  // console.log(data, 'data');
  let id = data.id;
  // console.log(id, 'id');
  let usuarios = await validacionComite()
  // = console.log(usuarios, 'usuarios');
  for (let i = 0; i < usuarios.length; i++) {
    let userSolicitud = {
      usuarios_id: usuarios[i].id,
      solicitudes_id: id
    }
    // console.log(userSolicitud, 'userSolicitud');
    await postRepositoryUS(userSolicitud);
  }
  console.log(data, 'data');
  let response = await connection().then(async (conn) => {
    let query = `UPDATE ${TABLE} SET comentario = '${data.comentario_comite}' WHERE id = ${id}`
    // console.log(query, 'query');
    await conn.execute(query);
    const usuarios = await actualizarEstatus(2, data.id)
    closeConnection(conn);
    return usuarios[0];
  });
  return response;
}
aceptadoAdministracion = async (data) => {
  // console.log(data, 'data');
  let id = data.id;
  // console.log(id, 'id');
  let usuarios = await validacionAdministracion()
  //  console.log(usuarios, 'usuarios');
  await connection().then(async (conn) => {
    // const usuarios = await conn.execute(`UPDATE ${TABLE} SET estatus_id = 2 WHERE id = ?`, [id]);
    const usuarios = actualizarEstatus(4, data.id)
    closeConnection(conn);
    return usuarios[0];
  });

  for (let i = 0; i < usuarios.length; i++) {
    let userSolicitud = {
      usuarios_id: usuarios[i].id,
      solicitudes_id: id
    }
    // console.log(userSolicitud, 'userSolicitud');
    postRepositoryUS(userSolicitud);
  }
  let response = await connection().then(async (conn) => {
    // const usuarios = await conn.execute(`UPDATE ${TABLE} SET estatus_id = 2 WHERE id = ?`, [id]);
    const usuarios = actualizarEstatus(3, data.id)
    closeConnection(conn);
    return usuarios[0];
  });

  return response;
}
aceptadoFinalizar = async (data) => {
  // console.log(data, 'data');
  let id = data.id;
  actualizarEstatus(5, id);

  const mailOptions = {
    from: config.MAIL_USER,
    to: data.correo_escolar,
    subject: data.correo.subject,
    text: data.correo.text,
  };


  transporter.sendMail(mailOptions, async function (error, info) {
    if (error) {
      console.log('Error al enviar el correo electrónico: ', error);
    } else {
      console.log('Correo electrónico enviado con éxito: ', info.response);
      if (data.estado == 0) {
        await actualizarEstatus(6, data.id)
      }
      
    }
  });

}

actualizarEstatus = async (estatus, id) => {
  // console.log(data, 'data');
  // console.log(id, 'id');
  let response = await connection().then(async (conn) => {
    const usuarios = await conn.execute(`UPDATE ${TABLE} SET estatus_id = ${estatus} WHERE id = ?`, [id]);
    closeConnection(conn);
    return usuarios[0];
  });

  return response;
}

seleccionarSolicitudesPorUsuario = async (usuarioId, alumnoId) => {
  let query = `SELECT
  CONCAT(u.nombre,
          ' ',
          u.apellido_p,
          ' ',
          u.apellido_m) AS nombre_full,
  u.telefono,
  u.correo_escolar,
  u.correo_personal,
  u.gefe_carrera,
  c.descripcion AS descripcion_carreras,
  s.id AS id,
  s.descripcion AS solicitud_descripcion,
  s.createdAt AS solicitudes_createdAt,
  s.usuarios_id AS solicitudes_usuarios_id,
  s.comentario AS solicitudes_comentario,
  e.id AS estatus_id,
  e.descripcion AS descripcion_estatus,
  l.id AS lotes_id,
  l.descripcion AS lotes_descripcion,
  l.fecha_inicio AS lotes_fecha_inicio,
  l.fecha_fin AS lotes_fecha_fin,
  l.folio AS lotes_folio
FROM
 usuarios_has_solicitudes AS cu
  INNER JOIN
  solicitudes AS s ON cu.solicitudes_id = s.id
  INNER JOIN
  usuarios AS u ON s.usuarios_id = u.id
      INNER JOIN
  carreras AS c ON u.carreras_id = c.id
      INNER JOIN
  estatus AS e ON e.id = s.estatus_id
      INNER JOIN
  lotes AS l ON l.id = s.lotes_id
	INNER JOIN
  usuarios AS uSolicitud ON s.usuarios_id = uSolicitud.id
WHERE
  u.deletedAt IS NULL
AND s.deletedAt IS NULL AND s.usuarios_id = ${alumnoId}  AND cu.usuarios_id = ${usuarioId}
;`
  // console.log(query, 'query');

  let data = await connection().then(async (conn) => {
    const solicitudes = await conn.execute(query);
    closeConnection(conn);
    return solicitudes[0];
  });

  for (let i = 0; i < data.length; i++) {

    let documentos = await getBySolicitudesIdRepository(data[i].id);
    // console.log(documentos, 'documentos');
    data[i].documentos = documentos;
  }




  return data;
}

postRepository = async (data, user) => {
  let lote = await getAllRepository(data);
  if (lote.length == 0) {
    return {
      status: 400,
      data: null,
      message: 'No existe el lote comunique al administrador'
    }
  }
  // console.log(lote, 'lote');
  let response = await insertSolicitud(data, lote, user);
  // console.log(response, 'response');
  data.solicitudes_id = response.insertId;
  let userSolicitud = {
    usuarios_id: user[0].id,
    solicitudes_id: response.insertId
  }
  // console.log(userSolicitud, 'userSolicitud');
  postRepositoryUS(userSolicitud);
  postRepositoryDocument(data);
  let usuario = await validacionGefeCarrera(response.insertId, user[0].carreras_id);
  // console.log(usuario, 'usuario');
  let gefeSolicitud = {
    usuarios_id: usuario[0].id,
    solicitudes_id: response.insertId
  }
  postRepositoryUS(gefeSolicitud);
  // console.log(response, 'response');
  return response;
}
insertSolicitud = async (data, lote, user) => {
  let response = await connection().then(async (conn) => {
    let query = `INSERT INTO ${TABLE} (descripcion,estatus_id,lotes_id,usuarios_id) VALUES (?,?,?,?)`

    let values = [data.descripcion, 1, lote[lote.length - 1].id, user[0].id];

    const usuarios = await conn.execute(query, values);
    closeConnection(conn);
    return usuarios[0];
  });
  return response;
}


putRepository = async (data) => {
  // Consulta de actualización
  const query = `
   UPDATE ${TABLE}
   SET
    descripcion = ?,
    estatus_id = ?,
    lotes_id = ?
   WHERE id = ${data.id}
   `;

  const values = [data.descripcion, data.estatus_id, data.lotes_id];


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

module.exports = { actualizarEstatus,aceptadoFinalizar, aceptadoAdministracion, getAllRepository2, aceptadoComite, getByIdRepository, postRepository, putRepository, deletedRepository };