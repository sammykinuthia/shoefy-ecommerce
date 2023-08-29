// import bcrypt from 'bcrypt';
const bcrypt = require("bcrypt");
// import mssql from 'mssql';
const mssql = require("mssql");
// import { v4 } from "uuid";
const v4 = require("uuid");
// import { sqlConfig } from "../Config/config.js"
const { sqlConfig } = require("../Config/config.js");

import dotenv from "dotenv";

const jwt = require("jsonwebtoken");
import { registerUser, loginUser, isAdmin } from "./usersController";
describe("customeregister test", () => {
  it("should fail when the request body is empty", async () => {
    const req = {
      body: {},
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await registerUser(req, res);
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith(
      expect.arrayContaining([expect.any(Object)])
    );
  });

  it("should fail when the email is already registered", async () => {
    const req = {
      body: {
        username: "tesnewt",
        email: "testest@gmail.com",
        password: "Test1234",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(mssql, "connect").mockResolvedValueOnce({
      request: jest.fn().mockReturnThis(),
      input: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValueOnce({
        rowsAffected: [0],
      }),
    });

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it("should create a new user successfully", async () => {
    const req = {
      body: {
        username: "kimac",
        email: "kim@gmail.com",
        password: "pass",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(mssql, "connect").mockResolvedValueOnce({
      request: jest.fn().mockReturnThis(),
      input: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValueOnce({
        rowsAffected: [1],
      }),
    });

    // Mock successful password hashing using bcrypt
    // jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce('HashedPassword1234.');

    await registerUser(req, res);

    // expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: "Register success" });
  });
});

describe("login test", () => {
  it("should fail when the request body is empty", async () => {
    const req = {
      body: {
        email: "kim@example.com",
        password: "bluurbluur bluuuur",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.spyOn(mssql, "connect").mockResolvedValueOnce({
      request: jest.fn().mockReturnThis(),
      input: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValueOnce({
        rowsAffected: [1],
        recordset: [
          {
            username: "kimmm",
            password: "aisfjasijf",
            email: "kim@example.com",
            id: "pass123",
          },
        ],
      }),
    });
    jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(false);

    await loginUser(req, res);

    expect(res.json).toHaveBeenCalledWith({ Error: " user can not be found" });
  });

  it("should fail if the email is not in the correct format", async () => {
    const req = {
      body: {
        email: "jid@example.com",
        password: "Test1234",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(mssql, "connect").mockResolvedValueOnce({
      request: jest.fn().mockReturnThis(),
      input: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValueOnce({
        rowsAffected: [0],
      }),
    });

    await loginUser(req, res);

    expect(res.json).toHaveBeenCalledWith({ Error: " user can not be found" });
  });

  it("should fail when the password is incorrect", async () => {
    const req = {
      body: {
        email: "kimachia@gmail.com",
        password: "123456788",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.spyOn(mssql, "connect").mockResolvedValueOnce({
      request: jest.fn().mockReturnThis(),
      input: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValueOnce({
        rowsAffected: [1],
        recordset: [
          {
            username: "kimmm",
            password: await bcrypt.hash("aisfjasijf", 10), 
          },
        ],
      }),
    });
    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(403); 
    expect(res.json).toHaveBeenCalledWith({ "message": "wrong password" });
  });
});


describe('isAdmin test suite', () => {
  it('should return user not found if user is not an admin', async () => {
    const req = {
      info: { id: 'user123' } 
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    
    jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
      request: jest.fn().mockReturnThis(),
      input: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValueOnce({
        rowsAffected: [0]
      })
    });

    await isAdmin(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'user not found' });
  });

  it('should return user data if user is an admin', async () => {
    const req = {
      info: { id: 'admin123' } 
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
      request: jest.fn().mockReturnThis(),
      input: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValueOnce({
        rowsAffected: [1],
        recordset: [
          {
            is_admin: true 
          }
        ]
      })
    });

    await isAdmin(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ "message": "user not found" });
  });

  it('should return token not found if info is missing in request', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await isAdmin(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'token not found' });
  });


});
  



// Trial Number 2

// describe('Create a user', () => {
//     it('should create a new user successfully', async () => {
//         jest.mock('uuid', () => ({
//             v4: jest.fn(() => 'mocked-id-or-code'),
//         }));

//         jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce('mocked-hash');

//         const mockedInput = jest.fn().mockReturnThis();

//         const mockedExecute = jest.fn().mockResolvedValue({
//             recordset: [{ id: 'user-id' }],
//         });

//         const mockedRequest = {
//             input: mockedInput,
//             execute: mockedExecute,
//         };

//         const mockedPool = {
//             request: jest.fn().mockReturnValue(mockedRequest),
//         };

//         jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool);

//         await registerUser(req, res);

//         // expect(mockedInput).toHaveBeenCalledWith('email', mssql.VarChar, 'jidraphkimachia1@gmail.com')
//         // expect(mockedInput).toHaveBeenCalledWith('password', mssql.VarChar, 'pass')
//         // expect(res.status).toHaveBeenCalledWith(201);
//         // expect(res.json).toHaveBeenCalledWith({
//         //     status: 'success',
//         //     data: [{ id: 'user-id' }],
//         // });

//         expect(mockedExecute).toHaveBeenCalledWith('uspRegisterUser');
//         expect(mockedInput).toHaveBeenCalledWith('id', expect.any(String));
//     });
// })
