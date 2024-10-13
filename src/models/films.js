const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

/**
 * @swagger
 * components:
 *   schemas:
 *     Film:
 *       type: object
 *       description: objeto de la base de datos
 *       required:
 *         - titulo
 *         - episodio_id
 *         - director
 *         - productor
 *         - fecha_lanzamiento
 *       properties:
 *         titulo:
 *           type: string
 *           description: El título de la película
 *         episodio_id:
 *           type: string
 *           description: El ID del episodio
 *         sinopsis:
 *           type: string
 *           description: La sinopsis de la película
 *         director:
 *           type: string
 *           description: El director de la película
 *         productor:
 *           type: string
 *           description: El productor de la película
 *         fecha_lanzamiento:
 *           type: string
 *           format: date
 *           description: La fecha de lanzamiento de la película
 *         especies:
 *           type: array
 *           items:
 *             type: object
 *           description: Las especies que aparecen en la película
 *         naves_estelares:
 *           type: array
 *           items:
 *             type: object
 *           description: Las naves estelares que aparecen en la película
 *         vehiculos:
 *           type: array
 *           items:
 *             type: object
 *           description: Los vehículos que aparecen en la película
 *         personajes:
 *           type: array
 *           items:
 *             type: object
 *           description: Los personajes que aparecen en la película
 *         planetas:
 *           type: array
 *           items:
 *             type: object
 *           description: Los planetas que aparecen en la película
 *         url:
 *           type: string
 *           description: La URL de la película
 *         creado:
 *           type: string
 *           format: date
 *           description: La fecha de creación del registro
 *         editado:
 *           type: string
 *           format: date
 *           description: La fecha de la última edición del registro
 */

const Films = sequelize.define(
  "films",
  {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    episodio_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sinopsis: {
      type: DataTypes.TEXT,
    },
    director: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_lanzamiento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    especies: {
      type: DataTypes.JSON,
    },
    naves_estelares: {
      type: DataTypes.JSON,
    },
    vehiculos: {
      type: DataTypes.JSON,
    },
    personajes: {
      type: DataTypes.JSON,
    },
    planetas: {
      type: DataTypes.JSON,
    },
    url: {
      type: DataTypes.STRING,
    },
    creado: {
      type: DataTypes.DATE,
    },
    editado: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "films",
    timestamps: false,
  }
);

module.exports = Films;
