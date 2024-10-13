const request = require('supertest');
const express = require('express');
const Server = require('../../src/routes/server');

describe('Server routes', () => {
    let server;

    beforeAll(() => {
        server = new Server();
        server.app.use('/api/Films', (req, res) => res.status(200).send('Films route'));
    });


it("should return a list of films", async () => {
  const response = await request(server.app).get("/api/Films");
  expect(response.status).toBe(200);
  expect(response.body).toBeInstanceOf(Array); 
  expect(response.body[0]).toHaveProperty("titulo"); 
});

});