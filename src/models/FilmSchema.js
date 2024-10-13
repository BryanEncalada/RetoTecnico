

/**
 * @swagger
 * components:
 *   schemas:
 *     FilmSchema:
 *       type: object
 *       description: Esto permite traducir los datos de la API de SWAPI de inglés a español.
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
 *             type: string
 *           description: Las especies que aparecen en la película
 *         naves_estelares:
 *           type: array
 *           items:
 *             type: string
 *           description: Las naves estelares que aparecen en la película
 *         vehiculos:
 *           type: array
 *           items:
 *             type: string
 *           description: Los vehículos que aparecen en la película
 *         personajes:
 *           type: array
 *           items:
 *             type: string
 *           description: Los personajes que aparecen en la película
 *         planetas:
 *           type: array
 *           items:
 *             type: string
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

class FilmSchema {
    constructor(data) {
        this.titulo = String(data.title);
        this.episodio_id = String(data.episode_id);
        this.sinopsis = String(data.opening_crawl);
        this.director = String(data.director);
        this.productor = String(data.producer);
        this.fecha_lanzamiento = String(data.release_date);
        this.especies = data.species.map(String);
        this.naves_estelares = data.starships.map(String);
        this.vehiculos = data.vehicles.map(String);
        this.personajes = data.characters.map(String);
        this.planetas = data.planets.map(String);
        this.url = String(data.url);
        this.creado = String(data.created);
        this.editado = String(data.edited);
    }
}

module.exports = FilmSchema;