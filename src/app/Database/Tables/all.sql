CREATE DATABASE Shoefy;
GO

CREATE TABLE users(
    id VARCHAR(200) PRIMARY KEY,
    username VARCHAR(200) UNIQUE NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL
)

CREATE TABLE categories(
    id VARCHAR(200) PRIMARY KEY,
    name VARCHAR(200) UNIQUE NOT NULL,
)

CREATE TABLE product(
    id VARCHAR(200) PRIMARY KEY,
    name VARCHAR(200) UNIQUE NOT NULL,
    description VARCHAR(MAX) UNIQUE NOT NULL,
    price FLOAT NOT NULL,
    user_id VARCHAR(200) NOT NULL,
    created_at DATE DEFAULT TIMECURRENT(),
    FOREIGN KEY (user_id) REFERENCES users(id)

)
