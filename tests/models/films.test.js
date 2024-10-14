const { sequelize } = require("../../src/config/database");
const Films = require("../../src/models/films");
const { DataTypes } = require("sequelize");

describe("Films Model", () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });


    afterAll(async () => {
        await sequelize.close();
    });

    it("Debería crear una película con los campos requeridos", async () => {
      const filmData = {
        titulo: "A New Hope",
        episodio_id: "IV",
        director: "George Lucas",
        productor: "Gary Kurtz",
        fecha_lanzamiento: new Date("1977-05-25"),
      };

      const film = await Films.create(filmData);

      expect(film.titulo).toBe(filmData.titulo);
      expect(film.episodio_id).toBe(filmData.episodio_id);
      expect(film.director).toBe(filmData.director);
      expect(film.productor).toBe(filmData.productor);
      expect(film.fecha_lanzamiento).toEqual(filmData.fecha_lanzamiento);
    });

    it("No debería crear una película sin los campos requeridos", async () => {
      const filmData = {
        titulo: "The Empire Strikes Back",
      };

      await expect(Films.create(filmData)).rejects.toThrow();
    });

    it("Debería crear una película con los campos opcionales", async () => {
      const filmData = {
        titulo: "Return of the Jedi",
        episodio_id: "VI",
        director: "Richard Marquand",
        productor: "Howard G. Kazanjian",
        fecha_lanzamiento: new Date("1983-05-25"),
        sinopsis:
          "The Empire prepares to crush the Rebellion with a more powerful Death Star.",
        especies: JSON.stringify([{ name: "Ewok" }]),
        naves_estelares: JSON.stringify([{ name: "Millennium Falcon" }]),
        vehiculos: JSON.stringify([{ name: "Speeder Bike" }]),
        personajes: JSON.stringify([{ name: "Luke Skywalker" }]),
        planetas: JSON.stringify([{ name: "Endor" }]),
        url: "https://swapi.dev/api/films/3/",
        creado: new Date(),
        editado: new Date(),
      };

      const film = await Films.create(filmData);

      expect(film.sinopsis).toBe(filmData.sinopsis);
      expect(film.especies).toEqual(filmData.especies);
      expect(film.naves_estelares).toEqual(filmData.naves_estelares);
      expect(film.vehiculos).toEqual(filmData.vehiculos);
      expect(film.personajes).toEqual(filmData.personajes);
      expect(film.planetas).toEqual(filmData.planetas);
      expect(film.url).toBe(filmData.url);
      expect(film.creado).toEqual(filmData.creado);
      expect(film.editado).toEqual(filmData.editado);
    });

    // en modo en prueba
it("Debería actualizar el director de una película:", async () => {
  const filmData = {
    titulo: "The Phantom Menace",
    episodio_id: "I",
    director: "George Lucas",
    productor: "Rick McCallum",
    fecha_lanzamiento: new Date("1999-05-19"),
  };

  const film = await Films.create(filmData);

  const updatedDirector = "New Director";
  film.director = updatedDirector;
  await film.save();

  const updatedFilm = await Films.findByPk(film.id);
  expect(updatedFilm.director).toBe(updatedDirector);
});

it("Debería eliminar una película", async () => {
  const filmData = {
    titulo: "Attack of the Clones",
    episodio_id: "II",
    director: "George Lucas",
    productor: "Rick McCallum",
    fecha_lanzamiento: new Date("2002-05-16"),
  };

  const film = await Films.create(filmData);

  await film.destroy();

  const deletedFilm = await Films.findByPk(film.id);
  expect(deletedFilm).toBeNull();
});

});

