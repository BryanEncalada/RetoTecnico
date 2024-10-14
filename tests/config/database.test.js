const { dbConnection, sequelize } = require('../../src/config/database');
const { Sequelize } = require('sequelize');

jest.mock('sequelize'); 

describe("dbConnection", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("debería conectarse exitosamente a la base de datos", async () => {
    sequelize.authenticate.mockResolvedValueOnce();
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    await dbConnection();

    // Verifica que la autenticación se llamó y se conectó correctamente
    expect(sequelize.authenticate).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith("Se conecto");

    consoleSpy.mockRestore();
  });


});