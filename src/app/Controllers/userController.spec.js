// import bcrypt from 'bcrypt';
const bcrypt = require("bcrypt");
// import mssql from 'mssql';
const mssql = require("mssql");
// import { v4 } from "uuid";
const v4 = require("uuid");
// import { sqlConfig } from "../Config/config.js"
const { sqlConfig } = require("../Config/config.js");

import dotenv from "dotenv";
// const {dotenv} = require('dotenv');
const jwt = require("jsonwebtoken");
import { registerUser } from "./usersController";
// const { registerUser } = require('./usersControllers');

dotenv.config();

const req = {
  body: {
    username: "kim",
    email: "kimachia1@gmail.com",
    password: "pass12345",
  },
};

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};

describe("Register a User", () => {
  let req;
  let res;
  let originalConnect;

  beforeAll(() => {
    // Mock the connect function to return a mocked pool
    originalConnect = mssql.connect;
    mssql.connect = jest.fn().mockResolvedValue({
      request: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValue({ rowsAffected: [1] }),
    });
  });

  afterAll(() => {
    // Restore the original connect function
    mssql.connect = originalConnect;
  });

  beforeEach(() => {
    req = {
      body: {
        username: "kim",
        email: "kimachia1@gmail.com",
        password: "pass12345",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.spyOn(bcrypt, "hash").mockResolvedValue("hashedPassword");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should register a new user successfully", async () => {
    await registerUser(req, res);

    expect(mssql.connect).toHaveBeenCalled();
    expect(mssql.connect).toHaveBeenCalledTimes(1); // Check that the function was called only once
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Register success",
      token: expect.any(String),
    });
  });

  it("should return an error if required fields are missing", async () => {
    const request = {
      body: {
        username: "kim",
        email: "kimachia1@gmail.com",
      },
    };

    await registerUser(request, res);
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith(expect.any(Array));
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
