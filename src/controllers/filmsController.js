const FilmSchema = require("../models/FilmSchema");
const axios = require("axios");
const films = require("../models/films");

/**
 * @swagger
 * /films Controller:
 *   get:
 *     summary: Obtiene datos de películas desde la API y la base de datos
 *     tags: [Films Controller]
 *     responses:
 *       200:
 *         description: Lista combinada de películas de la API y la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Film'
 *       500:
 *         description: Error al obtener los datos
 */
const getFilmsData = async (req, res) => {
  try {
    const response = await axios.get("https://swapi.py4e.com/api/films/");
    const filmsFromAPI = response.data.results.map(
      (data) => new FilmSchema(data)
    );

    const filmsFromDB = await films.findAll();

    const combinedFilms = [
      ...filmsFromAPI,
      ...filmsFromDB.map((film) => ({
        titulo: film.titulo,
        episodio_id: film.episodio_id,
        sinopsis: film.sinopsis,
        director: film.director,
        productor: film.productor,
        fecha_lanzamiento: film.fecha_lanzamiento,
        especies: film.especies,
        naves_estelares: film.naves_estelares,
        vehiculos: film.vehiculos,
        personajes: film.personajes,
        planetas: film.planetas,
        url: film.url,
        creado: film.creado,
        editado: film.editado,
      })),
    ];

    res.json(combinedFilms);
  } catch (error) {
    res.status(500).send("Error al obtener los datos");
  }
};

/**
 * @swagger
 * /films Controller:
 *   post:
 *     summary: Añade una nueva película a la base de datos
 *     tags: [Films Controller]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Film'
 *     responses:
 *       201:
 *         description: Película añadida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Film'
 *       400:
 *         description: Faltan campos requeridos
 *       500:
 *         description: Error al agregar una nueva película
 */
const addFilmData = async (req, res) => {
  try {
    const {
      titulo,
      episodio_id,
      sinopsis,
      director,
      productor,
      fecha_lanzamiento,
      especies,
      naves_estelares,
      vehiculos,
      personajes,
      planetas,
      url,
      creado,
      editado,
    } = req.body;

    if (!titulo || !episodio_id || !director || !productor || !fecha_lanzamiento) {
      return res.status(400).json({
        message: "Faltan campos requeridos",
      });
    }

    const newFilm = await films.create({
      titulo,
      episodio_id,
      sinopsis,
      director,
      productor,
      fecha_lanzamiento,
      especies,
      naves_estelares,
      vehiculos,
      personajes,
      planetas,
      url,
      creado,
      editado,
    });

    return res.status(201).json({
      message: "Se agregó una nueva película",
      data: newFilm,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al agregar una nueva película",
      error: error.message,
    });
  }
};

module.exports = {
  getFilmsData,
  addFilmData,
};
