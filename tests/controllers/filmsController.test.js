const axios = require("axios");
const Films = require("../../src/models/films");
const FilmSchema = require("../../src/models/FilmSchema");
const { getFilmsData, addFilmData } = require("../../src/controllers/filmsController");

jest.mock("axios");
jest.mock("../../src/models/films");
jest.mock("../../src/models/FilmSchema");

describe("getFilmsData", () => {
    let req, res;

    beforeEach(() => {
        req = {};
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
    });

    it("should return combined films data from API and DB", async () => {
        const apiFilms = [
            { title: "Film 1", episode_id: 1 },
            { title: "Film 2", episode_id: 2 },
        ];
        const dbFilms = [
            {
                titulo: "Film 3",
                episodio_id: 3,
                sinopsis: "Synopsis 3",
                director: "Director 3",
                productor: "Producer 3",
                fecha_lanzamiento: "2023-01-01",
                especies: [],
                naves_estelares: [],
                vehiculos: [],
                personajes: [],
                planetas: [],
                url: "url3",
                creado: "2023-01-01",
                editado: "2023-01-01",
            },
        ];

        axios.get.mockResolvedValue({ data: { results: apiFilms } });
        Films.findAll.mockResolvedValue(dbFilms);

        await getFilmsData(req, res);

        expect(axios.get).toHaveBeenCalledWith("https://swapi.py4e.com/api/films/");
        expect(Films.findAll).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith([
            ...apiFilms.map((data) => new FilmSchema(data)),
            ...dbFilms,
        ]);
    });

    it("should handle errors and return 500 status", async () => {
        axios.get.mockRejectedValue(new Error("API Error"));

        await getFilmsData(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith("Error al obtener los datos");
    });


   
});

 describe("addFilmData", () => {
   let req, res;

   beforeEach(() => {
     req = {
       body: {
         titulo: "Film 4",
         episodio_id: 4,
         sinopsis: "Synopsis 4",
         director: "Director 4",
         productor: "Producer 4",
         fecha_lanzamiento: "2023-02-01",
         especies: [],
         naves_estelares: [],
         vehiculos: [],
         personajes: [],
         planetas: [],
         url: "url4",
         creado: "2023-02-01",
         editado: "2023-02-01",
       },
     };
     res = {
       json: jest.fn(),
       status: jest.fn().mockReturnThis(),
       send: jest.fn(),
     };
   });

   it("should add a new film and return 201 status", async () => {
     Films.create.mockResolvedValue(req.body);

     await addFilmData(req, res);

     expect(Films.create).toHaveBeenCalledWith(req.body);
     expect(res.status).toHaveBeenCalledWith(201);
     expect(res.json).toHaveBeenCalledWith({
       message: "Se agregó una nueva película",
       data: req.body,
     });
   });

   it("should return 400 status if required fields are missing", async () => {
     req.body = {
       titulo: "Film 4",
       episodio_id: 4,
       director: "Director 4",
       productor: "Producer 4",
     };

     await addFilmData(req, res);

     expect(res.status).toHaveBeenCalledWith(400);
     expect(res.json).toHaveBeenCalledWith({
       message: "Faltan campos requeridos",
     });
   });

   it("should handle errors and return 500 status", async () => {
     Films.create.mockRejectedValue(new Error("DB Error"));

     await addFilmData(req, res);

     expect(res.status).toHaveBeenCalledWith(500);
     expect(res.json).toHaveBeenCalledWith({
       message: "Error al agregar una nueva película",
       error: "DB Error",
     });
   });
 });