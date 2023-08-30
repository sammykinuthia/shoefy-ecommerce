import { getProducts } from "../../Controllers/projectsController.js";
import { pool } from "../../Config/config.js";
import mssql from 'mssql'


jest.mock('mssql', () => {
    return {
      pool: {
        connected: true,
        request: jest.fn(() => ({
          execute: jest.fn(() => ({
            rowsAffected: [1], // Change this value for different scenarios
            recordset: [{ id: 1, name: 'Product 1' }] // Change this value for different scenarios
          }))
        }))
      }
    };
  });

describe("Get Products", () => {
    let req;
    let res;

    beforeEach(() => {
        req = {};
        res = {
            json: jest.fn(),
            status: jest.fn(() => res),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return products when products are found', async () => {
        await getProducts(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ data: [{ id: 1, name: 'Product 1' }] });
    });

    it('should return error message when no products are found', async () => {
        // Mock rowsAffected to indicate no products found
        jest.spyOn(pool, 'connected').mockReturnValue(true);
        jest.spyOn(pool, 'request').mockReturnValue({
            execute: jest.fn(() => ({
                rowsAffected: [0],
            })),
        });

        await getProducts(req, res);

        expect(res.status).toHaveBeenCalledWith(200); // It should still return 200 for no products
        expect(res.json).toHaveBeenCalledWith({ Error: 'No products found' });
    });

    it('should return error message when database connection fails', async () => {
        // Mock the connected property to simulate a failed connection
        jest.spyOn(pool, 'connected').mockReturnValue(false);

        await getProducts(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'error connecting to db' });
    });

    it('should return error message when an error occurs', async () => {
        // Mock the execute function to throw an error
        jest.spyOn(pool, 'request').mockReturnValue({
            execute: jest.fn(() => {
                throw new Error('Test error');
            }),
        });

        await getProducts(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ Error: 'Test error' });
    });
})