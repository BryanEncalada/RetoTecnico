const request = require('supertest');
const express = require('express');
const filmRoutes = require('../../src/routes/filmRoutes');
const { getFilmsData } = require('../../src/controllers/filmsController');


jest.mock("../../src/controllers/filmsController");

const app = express();
app.use('/films', filmRoutes);

describe('GET /films', () => {
    it('should respond with data from getFilmsData', async () => {
        const mockData = [{ id: 1, title: 'Inception' }];
        getFilmsData.mockImplementation((req, res) => res.json(mockData));

        const response = await request(app).get('/films');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockData);
    });

    it('should respond with a 500 status code on error', async () => {
        getFilmsData.mockImplementation((req, res) => res.status(500).send('Internal Server Error'));

        const response = await request(app).get('/films');
        expect(response.status).toBe(500);
        expect(response.text).toBe('Internal Server Error');
    });

jest.mock("../../src/controllers/filmsController");

    const app = express();
    app.use('/films', filmRoutes);

    describe('GET /films', () => {
        it('should respond with data from getFilmsData', async () => {
            const mockData = [{ id: 1, title: 'Inception' }];
            getFilmsData.mockImplementation((req, res) => res.json(mockData));

            const response = await request(app).get('/films');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockData);
        });

        it('should respond with a 500 status code on error', async () => {
            getFilmsData.mockImplementation((req, res) => res.status(500).send('Internal Server Error'));

            const response = await request(app).get('/films');
            expect(response.status).toBe(500);
            expect(response.text).toBe('Internal Server Error');
        });

describe("GET /films", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpia todos los mocks antes de cada prueba
  });

  it("should call getFilmsData once", async () => {
    getFilmsData.mockImplementation((req, res) => res.json([]));

    await request(app).get("/films");
    expect(getFilmsData).toHaveBeenCalledTimes(1); // Verifica que solo se llame una vez
  });
});

        it('should respond with an empty array if no data is returned', async () => {
            getFilmsData.mockImplementation((req, res) => res.json([]));

            const response = await request(app).get('/films');
            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        });
    });
});