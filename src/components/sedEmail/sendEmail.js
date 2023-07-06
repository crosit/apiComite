const express = require('express');
const passport = require('passport');
const router = express.Router();
const URL = '/sendCorreo'
const nodemailer = require('nodemailer');
const config = require('../../config/config');
const { actualizarEstatus } = require('../solicitudes/solicitudes.repository');

// Configura las opciones de transporte SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail', // Ejemplo: 'gmail'
  auth: {
    user: config.MAIL_USER,
    pass: config.MAIL_PASSWORD,
  }
});




router.post('/',
    passport.authenticate('jwt', { session: false }),

    async (req, res) => {
        try {
            let data = req.body;
            const mailOptions = {
                from: config.MAIL_USER,
                to: data.correo_escolar,
                subject: data.correo.subject,
                text: data.correo.text,
            };


            transporter.sendMail(mailOptions, async function (error, info) {
                if (error) {
                    console.log('Error al enviar el correo electrónico: ', error);
                    res.status(200), res.send({
                        status: 400,
                        data: null,
                        message: 'Esrror al enviar el correo'
                    });
                } else {
                    console.log('Correo electrónico enviado con éxito: ', info.response);
                    if (data.estado == 0) {
                        await actualizarEstatus(5, data.id)
                        await connection().then(async (conn) => {
                            console.log(data);
                            // const usuarios = await conn.execute(`UPDATE ${TABLE} SET estatus_id = 2 WHERE id = ?`, [id]);
                            let query = `UPDATE solicitudes SET veredicto = '${data.veredicto}' WHERE id = ${data.id}`
                            const usuarios = await conn.execute(query);
                            closeConnection(conn);
                          });
                    }
                    res.status(200), res.send({
                        status: 200,
                        data: null,
                        message: 'Se envio el correo correctamente'
                    });
                }
            });
            
        } catch (error) {
            console.log(error);
            res.status(500), res.send({
                status: 500,
                data: {},
                message: 'Error al enviar correo'
            });
        }
    });

    
  
  module.exports = (app) => {
    app.use(URL, router);

  };