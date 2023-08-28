// import { createProduct } from './projectsController'; 
// import {v4} from 'uuid'

// import { createProduct } from "./projectsController";


// jest.mock('../Config/config.js');

// describe('createProduct function', () => {
//   let req, res;

//   beforeEach(() => {
//     req = {
//       body: {
//         name: 'Product Name',
//         image: 'product.jpg',
//         description: 'Product description',
//         price: 10.99,
//         category_id: 1,
//       },
//       info: {
//         id: 'user_id_here',
//       },
//     };
//     res = {
//       status: jest.fn(() => res),
//       json: jest.fn(),
//     };
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('creates a product successfully', async () => {
//     const mockPool = {
//       connected: true,
//       request: jest.fn(() => ({
//         input: jest.fn().mockReturnThis(),
//         execute: jest.fn(() => ({ rowsAffected: [1] })),
//       })),
//     };

//     pool.mockResolvedValue(mockPool);

//     await createProduct(req, res);

//     expect(pool).toHaveBeenCalled();
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith({ message: 'Product created successfully' });
//   });

//   it('handles database connection error', async () => {
//     const mockPool = {
//       connected: false,
//     };

//     pool.mockResolvedValue(mockPool);

//     await createProduct(req, res);

//     expect(pool).toHaveBeenCalled();
//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({ message: 'error connecting to db' });
//   });

//   it('handles product creation error', async () => {
//     const mockPool = {
//       connected: true,
//       request: jest.fn(() => ({
//         input: jest.fn().mockReturnThis(),
//         execute: jest.fn(() => ({ rowsAffected: [0] })),
//       })),
//     };

//     pool.mockResolvedValue(mockPool);

//     await createProduct(req, res);

//     expect(pool).toHaveBeenCalled();
//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({ Error: 'products not created' });
//   });

//   it('handles unexpected error', async () => {
//     const mockError = new Error('Unexpected error');
//     pool.mockRejectedValue(mockError);

//     await createProduct(req, res);

//     expect(pool).toHaveBeenCalled();
//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({ Error: 'Unexpected error' });
//   });
// });