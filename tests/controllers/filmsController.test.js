const { getFilmsData, addFilmData } = require('../../src/controllers/filmsController');
const axios = require('axios');
const films = require('../../src/models/films');
const FilmSchema = require('../../src/models/FilmSchema');

jest.mock('axios');
jest.mock('../../src/models/films');



describe('filmsController', () => {
  describe('getFilmsData', () => {
     it("should return combined films data from API and database", async () => {
       // Datos simulados de la API
       const apiFilms = [
         { title: "Film 1", episode_id: 1 },
         { title: "Film 2", episode_id: 2 },
       ];

       // Datos simulados de la base de datos
       const dbFilms = [
         { titulo: "Film 3", episodio_id: 3 },
         { titulo: "Film 4", episodio_id: 4 },
       ];

       // Mock de Axios para la llamada a la API
       axios.get.mockResolvedValue({ data: { results: apiFilms } });

       // Mock para la función findAll de la base de datos
       films.findAll.mockResolvedValue(dbFilms);

       // Simulamos el objeto res con sus métodos
       const res = {
         statusCode: null,
         body: null,
         status: function (code) {
           this.statusCode = code;
           return this;
         },
         json: function (data) {
           this.body = JSON.stringify(data);
         },
       };

       // Ejecutamos la función con el objeto res simulado
       const result = await getFilmsData({}, res);

       // Verificamos que se haya retornado un código de estado 200
       expect(result.statusCode).toBe(200);

       // Parseamos el cuerpo de la respuesta
       const combinedFilms = JSON.parse(result.body);

       // Verificamos que la longitud de los datos combinados sea correcta
       expect(combinedFilms.length).toBe(4);

       // Verificamos que los datos de la API estén presentes en el resultado
       expect(combinedFilms[0]).toHaveProperty("title", "Film 1");

       // Verificamos que los datos de la base de datos estén presentes en el resultado
       expect(combinedFilms[2]).toHaveProperty("titulo", "Film 3");
     });

    it('should return 500 if there is an error', async () => {
      axios.get.mockRejectedValue(new Error('API Error'));

      const result = await getFilmsData();

      expect(result.statusCode).toBe(500);
      const responseBody = JSON.parse(result.body);
      expect(responseBody).toHaveProperty('message', 'Error al obtener los datos');
    });
  });

  describe('addFilmData', () => {
    it('should add a new film and return 201', async () => {
      const newFilm = {
        titulo: 'New Film',
        episodio_id: 5,
        director: 'Director',
        productor: 'Producer',
        fecha_lanzamiento: '2023-01-01',
      };

      films.create.mockResolvedValue(newFilm);

      const event = {
        body: JSON.stringify(newFilm),
      };

      const result = await addFilmData(event);

      expect(result.statusCode).toBe(201);
      const responseBody = JSON.parse(result.body);
      expect(responseBody).toHaveProperty('message', 'Se agregó una nueva película');
      expect(responseBody.data).toEqual(newFilm);
    });

    it('should return 400 if required fields are missing', async () => {
      const incompleteFilm = {
        titulo: 'Incomplete Film',
      };

      const event = {
        body: JSON.stringify(incompleteFilm),
      };

      const result = await addFilmData(event);

      expect(result.statusCode).toBe(400);
      const responseBody = JSON.parse(result.body);
      expect(responseBody).toHaveProperty('message', 'Faltan campos requeridos');
    });

    it('should return 500 if there is an error', async () => {
      films.create.mockRejectedValue(new Error('DB Error'));

      const newFilm = {
        titulo: 'New Film',
        episodio_id: 5,
        director: 'Director',
        productor: 'Producer',
        fecha_lanzamiento: '2023-01-01',
      };

      const event = {
        body: JSON.stringify(newFilm),
      };

      const result = await addFilmData(event);

      expect(result.statusCode).toBe(500);
      const responseBody = JSON.parse(result.body);
      expect(responseBody).toHaveProperty('message', 'Error al agregar una nueva película');
    });
  });
});