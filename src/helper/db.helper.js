const mysql = require('mysql2/promise');
const config = require('../config/config');


// Configuración de la base de datos
const dbConfig = {
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_DATA_BASE,
    port: config.DB_PORT,
};

    connection = async () => {
        try {
            const connection = await mysql.createConnection(dbConfig);
            console.log('Conexión exitosa a la base de datos');
            return connection;
          } catch (error) {
            console.error('Error al conectar a la base de datos:', error);
            throw error;
          }
    }

    closeConnection = async (connection) => {
        try {
            await connection.end();
            console.log('Conexión cerrada exitosamente');
          } catch (error) {
            console.error('Error al cerrar la conexión:', error);
            throw error;
          }
    }

    // Verificar la conexión a la base de datos
module.exports = {connection, closeConnection};
