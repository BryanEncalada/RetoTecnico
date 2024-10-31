/**
 * @swagger
 * components:
 *   schemas:
 *     DatabaseConnection:
 *       type: object
 *       properties:
 *         DB_NAME:
 *           type: string
 *           description: Nombre de la base de datos
 *           example: SWAPI
 *         DB_USER:
 *           type: string
 *           description: Usuario para conectarse a la base de datos
 *           example: root
 *         DB_PASSWORD:
 *           type: string
 *           description: Contraseña del usuario de la base de datos
 *           example: mysql
 *         DB_HOST:
 *           type: string
 *           description: Host donde está alojada la base de datos
 *           example: localhost
 *         DB_PORT:
 *           type: integer
 *           description: Puerto de conexión a la base de datos
 *           example: 3306
 *         DB_DIALECT:
 *           type: string
 *           description: Motor de la base de datos (MySQL, Postgres, etc.)
 *           example: mysql
 *
 * @swagger
 * /database/connect:
 *   get:
 *     summary: Prueba la conexión a la base de datos
 *     tags: [Database]
 *     responses:
 *       200:
 *         description: Conexión exitosa a la base de datos
 *       500:
 *         description: Fallo en la conexión a la base de datos
 */

require("dotenv").config();
const { Sequelize } = require("sequelize");

/**
 * Crea una instancia de Sequelize usando variables de entorno para la configuración de la base de datos.
 */

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
   // port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  }
);


// const sequelize = new Sequelize(
//   "pettimep_pettimeBD",
//   "pettimep_pettimeBD",
//   "Pettime@123",
//   {
//     host: "201.148.107.87",
//     dialect: "mysql",
//   }
// );


/**
 * @function dbConnection
 * @description Autentica la conexión a la base de datos.
 * Si la conexión es exitosa, se imprime "Se conecto". Si falla, se imprime "No se conecto".
 * 
 * @returns {void}
 */

const dbConnection = async () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Se conecto");
    })
    .catch(() => {
      console.log("No se conecto");
    });
};

module.exports = { dbConnection, sequelize };
